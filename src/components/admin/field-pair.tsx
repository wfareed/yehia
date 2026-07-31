"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function FieldPair({
  labelEn,
  labelAr,
  valueEn,
  valueAr,
  onChangeEn,
  onChangeAr,
  multiline = false,
}: {
  labelEn: string
  labelAr: string
  valueEn: string
  valueAr: string
  onChangeEn: (v: string) => void
  onChangeAr: (v: string) => void
  multiline?: boolean
}) {
  const Field = multiline ? Textarea : Input
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-xs text-slate-400 uppercase tracking-wide">{labelEn}</label>
        <Field value={valueEn} onChange={(e) => onChangeEn(e.target.value)} className="bg-slate-900 border-slate-600 text-white" />
      </div>
      <div dir="rtl">
        <label className="text-xs text-slate-400 uppercase tracking-wide">{labelAr}</label>
        <Field value={valueAr} onChange={(e) => onChangeAr(e.target.value)} className="bg-slate-900 border-slate-600 text-white text-right" />
      </div>
    </div>
  )
}
