import { readJson } from "@/lib/data-store"
import { promotionsSeed, PromotionsContent } from "@/lib/content-types"
import PromotionsClient from "./promotions-client"

export const dynamic = 'force-dynamic'

export default function PromotionsPage() {
  const content = readJson<PromotionsContent>("promotions", promotionsSeed)
  return <PromotionsClient initialContent={content} />
}
