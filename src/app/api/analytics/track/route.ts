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
]

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

  let country = ""
  for (const header of GEO_HEADERS) {
    const value = req.headers.get(header)
    if (value && /^[A-Za-z]{2}$/.test(value)) {
      country = value.toUpperCase()
      break
    }
  }
  if (!country) country = "ZZ" // unknown

  try {
    trackPageview(pathname, country, vid)
  } catch {
    // Analytics must never break the site.
  }
  return NextResponse.json({ ok: true })
}
