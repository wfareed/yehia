"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Eye, Users, Globe, TrendingUp, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

interface AnalyticsSummary {
  today: { views: number; visitors: number }
  week: { views: number; visitors: number }
  month: { views: number; visitors: number }
  total: { views: number }
  series: { date: string; views: number; visitors: number }[]
  topPages: { path: string; views: number }[]
  topCountries: { code: string; views: number }[]
}

const CHART_COLORS = ["#10b981", "#14b8a6", "#f59e0b", "#38bdf8", "#a78bfa", "#f472b6", "#fb7185", "#34d399"]

function flagEmoji(code: string): string {
  if (!/^[A-Z]{2}$/.test(code) || code === "ZZ") return "\u{1F3F3}\u{FE0F}"
  return [...code]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("")
}

function countryName(code: string): string {
  if (code === "ZZ") return "Unknown"
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code
  } catch {
    return code
  }
}

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: 8,
    color: "#e2e8f0",
    fontSize: 12,
  },
  labelStyle: { color: "#94a3b8" },
} as const

function StatCard({
  title,
  views,
  visitors,
  icon,
}: {
  title: string
  views: number
  visitors?: number
  icon: React.ReactNode
}) {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        <div className="text-emerald-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{views.toLocaleString()}</div>
        {visitors !== undefined && (
          <p className="text-xs text-slate-400 mt-1">{visitors.toLocaleString()} unique visitors</p>
        )}
      </CardContent>
    </Card>
  )
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const load = () => {
    setLoading(true)
    fetch("/api/admin/analytics")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError("Failed to load analytics."))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const countryChartData =
    data?.topCountries.slice(0, 8).map((c) => ({
      name: c.code === "ZZ" ? "Unknown" : countryName(c.code),
      views: c.views,
      code: c.code,
    })) ?? []

  const maxCountryViews = data?.topCountries[0]?.views ?? 1

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Traffic Analytics</h1>
          <p className="text-slate-400">Website traffic, visitors, countries, and top pages.</p>
        </div>
        <Button variant="outline" className="border-slate-600 text-slate-200" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
      {!data && loading && <p className="text-slate-400">Loading...</p>}

      {data && (
        <div className="space-y-6 pb-16">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard title="Today" views={data.today.views} visitors={data.today.visitors} icon={<Eye className="h-4 w-4" />} />
            <StatCard title="Last 7 Days" views={data.week.views} visitors={data.week.visitors} icon={<Users className="h-4 w-4" />} />
            <StatCard title="Last 30 Days" views={data.month.views} visitors={data.month.visitors} icon={<TrendingUp className="h-4 w-4" />} />
            <StatCard title="All Time" views={data.total.views} icon={<Globe className="h-4 w-4" />} />
          </div>

          {/* Daily trend */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Visitors per Day (last 30 days)</CardTitle>
              <CardDescription>Page views and unique visitors over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.series} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      tickFormatter={(d: string) => d.slice(5)}
                      stroke="#334155"
                    />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} stroke="#334155" allowDecimals={false} />
                    <Tooltip {...tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area type="monotone" dataKey="views" name="Page views" stroke="#10b981" fill="url(#colorViews)" strokeWidth={2} />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      name="Unique visitors"
                      stroke="#38bdf8"
                      fill="url(#colorVisitors)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Top pages */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Most Visited Pages</CardTitle>
                <CardDescription>Top pages by views in the last 30 days.</CardDescription>
              </CardHeader>
              <CardContent>
                {data.topPages.length === 0 ? (
                  <p className="text-slate-500 text-sm">No traffic recorded yet.</p>
                ) : (
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.topPages.slice(0, 8)} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                        <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} stroke="#334155" allowDecimals={false} />
                        <YAxis
                          type="category"
                          dataKey="path"
                          width={130}
                          tick={{ fill: "#cbd5e1", fontSize: 11 }}
                          stroke="#334155"
                        />
                        <Tooltip {...tooltipStyle} />
                        <Bar dataKey="views" name="Views" fill="#10b981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Countries */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Visitors by Country</CardTitle>
                <CardDescription>Detected from the visitor's request headers (last 30 days).</CardDescription>
              </CardHeader>
              <CardContent>
                {data.topCountries.length === 0 ? (
                  <p className="text-slate-500 text-sm">No country data yet. Country detection depends on hosting/CDN geo headers.</p>
                ) : (
                  <div className="space-y-5">
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={countryChartData} dataKey="views" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                            {countryChartData.map((entry, index) => (
                              <Cell key={entry.code} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip {...tooltipStyle} />
                          <Legend wrapperStyle={{ fontSize: 12 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <ul className="space-y-2">
                      {data.topCountries.slice(0, 10).map((c) => (
                        <li key={c.code} className="flex items-center gap-3">
                          <span className="text-lg leading-none">{flagEmoji(c.code)}</span>
                          <span className="text-sm text-slate-200 w-32 truncate">{countryName(c.code)}</span>
                          <div className="flex-1 h-2 rounded-full bg-slate-700 overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${Math.max(3, (c.views / maxCountryViews) * 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400 w-10 text-right">{c.views}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
