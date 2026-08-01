import { readJson } from "@/lib/data-store"
import { partnersSeed, PartnersContent } from "@/lib/content-types"
import PartnersClient from "./partners-client"

export const dynamic = 'force-dynamic'

export default function PartnersPage() {
  const content = readJson<PartnersContent>("partners", partnersSeed)
  return <PartnersClient initialContent={content} />
}
