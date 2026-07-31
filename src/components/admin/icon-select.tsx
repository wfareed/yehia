"use client"

import { iconNames, IconName } from "@/lib/icon-map"

export function IconSelect({ value, onChange }: { value: IconName; onChange: (v: IconName) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as IconName)}
      className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      {iconNames.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  )
}
