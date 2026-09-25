import "server-only"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { DATA_DIR } from "./data-store"

// Daily-aggregated traffic analytics. Stored in DATA_DIR (which lives outside
// the Git-deployed folder on production) so analytics survive redeploys.
const FILE = path.join(DATA_DIR, "analytics.json")
const MAX_DAYS = 400
const MAX_VISITORS_PER_DAY = 5000

export interface DayStats {
  views: number
  visitors: Record<string, true>
  pages: Record<string, number>
  countries: Record<string, number>
}

export interface AnalyticsData {
  days: Record<string, DayStats>
}

export function readAnalytics(): AnalyticsData {
  try {
    if (!fs.existsSync(FILE)) return { days: {} }
    return JSON.parse(fs.readFileSync(FILE, "utf-8")) as AnalyticsData
  } catch {
    return { days: {} }
  }
}

export function trackPageview(pathname: string, country: string, visitorId: string) {
  const data = readAnalytics()
  const today = new Date().toISOString().slice(0, 10)
  const day = (data.days[today] ??= { views: 0, visitors: {}, pages: {}, countries: {} })

  day.views += 1
  day.pages[pathname] = (day.pages[pathname] ?? 0) + 1
  if (country) day.countries[country] = (day.countries[country] ?? 0) + 1

  if (Object.keys(day.visitors).length < MAX_VISITORS_PER_DAY) {
    const vidHash = crypto.createHash("sha256").update(visitorId).digest("hex")
    day.visitors[vidHash] = true
  }

  // Drop days older than MAX_DAYS to keep the file bounded.
  const cutoff = new Date(Date.now() - MAX_DAYS * 86400000).toISOString().slice(0, 10)
  for (const key of Object.keys(data.days)) {
    if (key < cutoff) delete data.days[key]
  }

  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(FILE, JSON.stringify(data), "utf-8")
}
