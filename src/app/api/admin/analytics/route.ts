import { NextResponse } from "next/server"
import { readAnalytics } from "@/lib/analytics-store"

function dayKey(offset: number): string {
  const d = new Date()
  d.setDate(d.getDate() - offset)
  return d.toISOString().slice(0, 10)
}

export async function GET() {
  const { days } = readAnalytics()

  const sumPeriod = (keys: string[]) => {
    let views = 0
    const visitors = new Set<string>()
    for (const key of keys) {
      const day = days[key]
      if (!day) continue
      views += day.views
      for (const vid of Object.keys(day.visitors)) visitors.add(vid)
    }
    return { views, visitors: visitors.size }
  }

  const last30Keys: string[] = []
  const last7Keys: string[] = []
  for (let i = 0; i < 30; i++) {
    const key = dayKey(i)
    last30Keys.push(key)
    if (i < 7) last7Keys.push(key)
  }

  const todayKey = dayKey(0)
  const today = days[todayKey] ?? { views: 0, visitors: {}, pages: {}, countries: {} }

  const series = [...last30Keys].reverse().map((key) => ({
    date: key,
    views: days[key]?.views ?? 0,
    visitors: Object.keys(days[key]?.visitors ?? {}).length,
  }))

  const pages: Record<string, number> = {}
  const countries: Record<string, number> = {}
  for (const key of last30Keys) {
    const day = days[key]
    if (!day) continue
    for (const [path, count] of Object.entries(day.pages)) {
      pages[path] = (pages[path] ?? 0) + count
    }
    for (const [code, count] of Object.entries(day.countries)) {
      countries[code] = (countries[code] ?? 0) + count
    }
  }

  const topPages = Object.entries(pages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([path, views]) => ({ path, views }))

  const topCountries = Object.entries(countries)
    .sort((a, b) => b[1] - a[1])
    .map(([code, views]) => ({ code, views }))

  const totalViews = Object.values(days).reduce((acc, day) => acc + day.views, 0)

  return NextResponse.json({
    today: { views: today.views, visitors: Object.keys(today.visitors).length },
    week: sumPeriod(last7Keys),
    month: sumPeriod(last30Keys),
    total: { views: totalViews },
    series,
    topPages,
    topCountries,
  })
}
