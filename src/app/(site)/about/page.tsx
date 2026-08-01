import { readJson } from "@/lib/data-store"
import { aboutSeed, AboutContent } from "@/lib/content-types"
import AboutClient from "./about-client"

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  const content = readJson<AboutContent>("about", aboutSeed)
  return <AboutClient initialContent={content} />
}
