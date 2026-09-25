"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const VID_KEY = "ve_vid"

function getVisitorId(): string {
  try {
    let vid = localStorage.getItem(VID_KEY)
    if (!vid) {
      vid = typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
      localStorage.setItem(VID_KEY, vid)
    }
    return vid
  } catch {
    return "anonymous"
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, vid: getVisitorId() }),
      keepalive: true,
    }).catch(() => {})
  }, [pathname])

  return null
}
