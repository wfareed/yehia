"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Save } from "lucide-react"
import { FaqItem } from "@/lib/content-types"

function newItem(): FaqItem {
  return {
    id: `faq-${Date.now()}`,
    question_en: "",
    answer_en: "",
    question_ar: "",
    answer_ar: "",
  }
}

export default function AdminFaqPage() {
  const [items, setItems] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/content/faq")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .finally(() => setLoading(false))
  }, [])

  const updateItem = (id: string, field: keyof FaqItem, value: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const addItem = () => {
    setItems((prev) => [...prev, newItem()])
  }

  const save = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/content/faq", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      })
      if (!res.ok) throw new Error()
      setMessage("Saved! Changes are now live on the site.")
    } catch {
      setMessage("Failed to save. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-slate-400">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">FAQ</h1>
          <p className="text-slate-400">Manage the questions shown in the homepage FAQ section.</p>
        </div>
        <Button variant="gradient" onClick={save} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className="text-sm text-emerald-400 mb-4">{message}</p>}

      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={item.id} className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-base">Question {index + 1}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wide">Question (English)</label>
                <Input
                  value={item.question_en}
                  onChange={(e) => updateItem(item.id, "question_en", e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white"
                />
                <label className="text-xs text-slate-400 uppercase tracking-wide">Answer (English)</label>
                <Textarea
                  value={item.answer_en}
                  onChange={(e) => updateItem(item.id, "answer_en", e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white"
                  rows={3}
                />
              </div>
              <div className="space-y-2" dir="rtl">
                <label className="text-xs text-slate-400 uppercase tracking-wide">السؤال (عربي)</label>
                <Input
                  value={item.question_ar}
                  onChange={(e) => updateItem(item.id, "question_ar", e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white text-right"
                />
                <label className="text-xs text-slate-400 uppercase tracking-wide">الإجابة (عربي)</label>
                <Textarea
                  value={item.answer_ar}
                  onChange={(e) => updateItem(item.id, "answer_ar", e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white text-right"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addItem} className="mt-4 border-slate-600 text-slate-200">
        <Plus className="h-4 w-4 mr-2" />
        Add Question
      </Button>
    </div>
  )
}
