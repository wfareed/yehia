import { readJson } from "@/lib/data-store"
import { discoverEgyptSeed } from "@/lib/content-types"
import DiscoverEgyptClient from "./discover-egypt-client"

export const dynamic = "force-dynamic"

export default function DiscoverEgyptPage() {
  const initialContent = readJson("discoverEgypt", discoverEgyptSeed)
  return <DiscoverEgyptClient initialContent={initialContent} />
}
