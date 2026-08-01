"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Trash2, Save } from "lucide-react"
import { promotionsSeed, PromotionsContent, PromotionItem } from "@/lib/content-types"
import { FieldPair } from "@/components/admin/field-pair"
import { MediaUpload } from "@/components/admin/media-upload"

function newPromotion(): PromotionItem {
  return {
    id: `promo-${Date.now()}`,
    title_en: "",
    title_ar: "",
    description_en: "",
    description_ar: "",
    image: "",
  }
}

export default function AdminPromotionsPage() {
  const [content, setContent] = useState<PromotionsContent>(promotionsSeed)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/content/promotions")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .finally(() => setLoading(false))
  }, [])

  const updatePromotion = (id: string, patch: Partial<PromotionItem>) => {
    setContent({ ...content, promotions: content.promotions.map((p) => (p.id === id ? { ...p, ...patch } : p)) })
  }

  const removePromotion = (id: string) => {
    setContent({ ...content, promotions: content.promotions.filter((p) => p.id !== id) })
  }

  const addPromotion = () => {
    setContent({ ...content, promotions: [...content.promotions, newPromotion()] })
  }

  const save = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/content/promotions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
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
          <h1 className="text-2xl font-bold text-white mb-1">Promotions</h1>
          <p className="text-slate-400">
            Manage the promotions page: heading text, and the list of promotions (text, an image/flyer, or both).
          </p>
        </div>
        <Button variant="gradient" onClick={save} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className="text-sm text-emerald-400 mb-4">{message}</p>}

      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="text-white text-lg">Page Heading</CardTitle>
          <CardDescription>The title and subtitle shown at the top of the promotions page.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldPair
            labelEn="Title (English)"
            labelAr="العنوان (عربي)"
            valueEn={content.title_en}
            valueAr={content.title_ar}
            onChangeEn={(v) => setContent({ ...content, title_en: v })}
            onChangeAr={(v) => setContent({ ...content, title_ar: v })}
          />
          <div className="mt-4">
            <FieldPair
              labelEn="Subtitle (English)"
              labelAr="النص الفرعي (عربي)"
              valueEn={content.subtitle_en}
              valueAr={content.subtitle_ar}
              onChangeEn={(v) => setContent({ ...content, subtitle_en: v })}
              onChangeAr={(v) => setContent({ ...content, subtitle_ar: v })}
              multiline
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Promotion List</CardTitle>
          <CardDescription>
            Add a promotion as text only, an image/flyer only (e.g. an A4 poster), or both together.
            Leave the title and description empty to show just the image.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.promotions.map((promo, index) => (
            <div key={promo.id} className="border border-slate-700 rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase tracking-wide">Promotion {index + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => removePromotion(promo.id)}>
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wide">Image / Flyer (optional)</label>
                <MediaUpload
                  value={promo.image}
                  onChange={(url) => updatePromotion(promo.id, { image: url })}
                  accept="image"
                />
              </div>
              <FieldPair
                labelEn="Title (English, optional)"
                labelAr="العنوان (عربي، اختياري)"
                valueEn={promo.title_en}
                valueAr={promo.title_ar}
                onChangeEn={(v) => updatePromotion(promo.id, { title_en: v })}
                onChangeAr={(v) => updatePromotion(promo.id, { title_ar: v })}
              />
              <FieldPair
                labelEn="Description (English, optional)"
                labelAr="الوصف (عربي، اختياري)"
                valueEn={promo.description_en}
                valueAr={promo.description_ar}
                onChangeEn={(v) => updatePromotion(promo.id, { description_en: v })}
                onChangeAr={(v) => updatePromotion(promo.id, { description_ar: v })}
                multiline
              />
            </div>
          ))}
          <Button variant="outline" className="border-slate-600 text-slate-200" onClick={addPromotion}>
            <Plus className="h-4 w-4 mr-2" />
            Add Promotion
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
