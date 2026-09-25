import { NextRequest, NextResponse } from "next/server"
import { trackPageview } from "@/lib/analytics-store"

// Common headers set by hosting/CDN layers for country-level geolocation.
const GEO_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-country-code",
  "x-appengine-country",
  "x-geoip-country",
  "x-geo-country",
  "x-litespeed-country",
  "geoip-country-code",
]

const UNKNOWN_COUNTRY = "ZZ"

// In-memory IP -> country cache so we don't hit the geolocation service on
// every page view from the same visitor.
const ipCountryCache = new Map<string, string>()
const MAX_CACHE_ENTRIES = 5000

function countryFromHeaders(req: NextRequest): string {
  for (const header of GEO_HEADERS) {
    const value = req.headers.get(header)
    if (value && /^[A-Za-z]{2}$/.test(value)) return value.toUpperCase()
  }
  return ""
}

function clientIp(req: NextRequest): string {
  const direct = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-real-ip")
  if (direct) return direct.trim()
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return ""
}

function isPrivateIp(ip: string): boolean {
  return (
    !ip ||
    /^127\./.test(ip) ||
    /^10\./.test(ip) ||
    /^192\.168\./.test(ip) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    /^169\.254\./.test(ip) ||
    /^0\./.test(ip) ||
    ip === "::1" ||
    ip === "localhost" ||
    ip.toLowerCase().startsWith("fc") ||
    ip.toLowerCase().startsWith("fd") ||
    ip.toLowerCase().startsWith("fe80")
  )
}

async function resolveCountry(ip: string): Promise<string> {
  if (isPrivateIp(ip)) return ""
  const cached = ipCountryCache.get(ip)
  if (cached) return cached

  let country = ""
  try {
    // ipwho.is — free HTTPS geolocation, no API key required.
    const res = await fetch(`https://ipwho.is/${ip}`, { signal: AbortSignal.timeout(3000) })
    const data = await res.json()
    if (data?.success && typeof data.country_code === "string") {
      country = data.country_code.toUpperCase()
    }
  } catch {
    // fall through to the secondary provider
  }

  if (!country) {
    try {
      const res = await fetch(`https://api.country.is/${ip}`, { signal: AbortSignal.timeout(3000) })
      const data = await res.json()
      if (typeof data?.country === "string") {
        country = data.country.toUpperCase()
      }
    } catch {
      // give up; analytics must never break the request
    }
  }

  if (country && /^[A-Z]{2}$/.test(country)) {
    if (ipCountryCache.size >= MAX_CACHE_ENTRIES) ipCountryCache.clear()
    ipCountryCache.set(ip, country)
    return country
  }
  return ""
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const pathname = typeof body?.path === "string" ? body.path : ""
  const vid = typeof body?.vid === "string" ? body.vid : ""

  if (
    !pathname.startsWith("/") ||
    pathname.length > 300 ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  if (!vid || vid.length > 100) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  let country = countryFromHeaders(req)
  if (!country) {
    country = (await resolveCountry(clientIp(req))) || UNKNOWN_COUNTRY
  }

  try {
    trackPageview(pathname, country, vid)
  } catch {
    // Analytics must never break the site.
  }
  return NextResponse.json({ ok: true })
}
