import { NextRequest, NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/data-store"
import { faqSeed, navSeed, aboutSeed, homeSeed, contactSeed, blogSeed, partnersSeed, promotionsSeed, countriesPageSeed, discoverEgyptSeed } from "@/lib/content-types"

// Whitelist of editable content sections and their default seed.
// Add an entry here whenever a new admin-editable section is introduced.
const CONTENT_SEEDS: Record<string, unknown> = {
  faq: faqSeed,
  nav: navSeed,
  about: aboutSeed,
  home: homeSeed,
  contact: contactSeed,
  blog: blogSeed,
  partners: partnersSeed,
  promotions: promotionsSeed,
  countriesPage: countriesPageSeed,
  discoverEgypt: discoverEgyptSeed,
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params
  const seed = CONTENT_SEEDS[key]
  if (!seed) {
    return NextResponse.json({ error: "Unknown content section." }, { status: 404 })
  }
  return NextResponse.json(readJson(key, seed))
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params
  if (!CONTENT_SEEDS[key]) {
    return NextResponse.json({ error: "Unknown content section." }, { status: 404 })
  }
  const body = await req.json().catch(() => null)
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }
  writeJson(key, body)
  return NextResponse.json({ ok: true })
}
