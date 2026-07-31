import { NextRequest, NextResponse } from "next/server"
import { readJson } from "@/lib/data-store"
import { faqSeed, navSeed, aboutSeed, homeSeed, contactSeed, blogSeed } from "@/lib/content-types"

// Whitelist of publicly-readable content sections and their default seed.
// Add an entry here whenever a new admin-editable section is introduced.
const CONTENT_SEEDS: Record<string, unknown> = {
  faq: faqSeed,
  nav: navSeed,
  about: aboutSeed,
  home: homeSeed,
  contact: contactSeed,
  blog: blogSeed,
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params
  const seed = CONTENT_SEEDS[key]
  if (!seed) {
    return NextResponse.json({ error: "Unknown content section." }, { status: 404 })
  }
  const data = readJson(key, seed)
  return NextResponse.json(data)
}
