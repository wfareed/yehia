"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Trash2, Save } from "lucide-react"
import { partnersSeed, PartnersContent, PartnerItem } from "@/lib/content-types"
import { FieldPair } from "@/components/admin/field-pair"
import { MediaUpload } from "@/components/admin/media-upload"

function newPartner(): PartnerItem {
  return {
    id: `partner-${Date.now()}`,
    name: "",
    logo: "",
    website: "",
  }
}

export default function AdminPartnersPage() {
  const [content, setContent] = useState<PartnersContent>(partnersSeed)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/content/partners")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .finally(() => setLoading(false))
  }, [])

  const updatePartner = (id: string, patch: Partial<PartnerItem>) => {
    setContent({ ...content, partners: content.partners.map((p) => (p.id === id ? { ...p, ...patch } : p)) })
  }

  const removePartner = (id: string) => {
    setContent({ ...content, partners: content.partners.filter((p) => p.id !== id) })
  }

  const addPartner = () => {
    setContent({ ...content, partners: [...content.partners, newPartner()] })
  }

  const save = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/content/partners", {
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
          <h1 className="text-2xl font-bold text-white mb-1">Partners</h1>
          <p className="text-slate-400">Manage the partners page: heading text, and the list of partner logos.</p>
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
          <CardDescription>The title and subtitle shown at the top of the partners page.</CardDescription>
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
          <CardTitle className="text-white text-lg">Partner List</CardTitle>
          <CardDescription>Add the partners' names and logos to display on the partners page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.partners.map((partner, index) => (
            <div key={partner.id} className="border border-slate-700 rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase tracking-wide">Partner {index + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => removePartner(partner.id)}>
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wide">Name</label>
                <Input
                  value={partner.name}
                  onChange={(e) => updatePartner(partner.id, { name: e.target.value })}
                  className="bg-slate-900 border-slate-600 text-white"
                  placeholder="Partner name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wide">Logo</label>
                <MediaUpload
                  value={partner.logo}
                  onChange={(url) => updatePartner(partner.id, { logo: url })}
                  accept="image"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wide">Website (optional)</label>
                <Input
                  value={partner.website}
                  onChange={(e) => updatePartner(partner.id, { website: e.target.value })}
                  className="bg-slate-900 border-slate-600 text-white"
                  placeholder="https://..."
                />
              </div>
            </div>
          ))}
          <Button variant="outline" className="border-slate-600 text-slate-200" onClick={addPartner}>
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
