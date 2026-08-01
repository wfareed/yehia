import { readJson } from "@/lib/data-store"
import { countriesPageSeed, CountriesPageContent } from "@/lib/content-types"
import CountriesClient from "./countries-client"

export const dynamic = 'force-dynamic'

export default function CountriesPage() {
  const content = readJson<CountriesPageContent>("countriesPage", countriesPageSeed)
  return <CountriesClient initialContent={content} />
}
