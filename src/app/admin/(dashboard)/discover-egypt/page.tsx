"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Trash2, Save } from "lucide-react"
import { discoverEgyptSeed, DiscoverEgyptContent, DiscoverEgyptBrochure, DiscoverEgyptDestination } from "@/lib/content-types"
import { FieldPair } from "@/components/admin/field-pair"
import { MediaUpload } from "@/components/admin/media-upload"
import { iconNames, IconName } from "@/lib/icon-map"

function newBrochure(): DiscoverEgyptBrochure {
  return {
    id: `brochure-${Date.now()}`,
    title_en: "",
    title_ar: "",
    description_en: "",
    description_ar: "",
    href: "",
  }
}

function newDestination(): DiscoverEgyptDestination {
  return {
    id: `dest-${Date.now()}`,
    image: "",
    icon: "Landmark",
    title_en: "",
    title_ar: "",
    description_en: "",
    description_ar: "",
  }
}

export default function AdminDiscoverEgyptPage() {
  const [content, setContent] = useState<DiscoverEgyptContent>(discoverEgyptSeed)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/content/discoverEgypt")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .finally(() => setLoading(false))
  }, [])

  const updateBrochure = (id: string, patch: Partial<DiscoverEgyptBrochure>) => {
    setContent({ ...content, brochures: content.brochures.map((b) => (b.id === id ? { ...b, ...patch } : b)) })
  }

  const removeBrochure = (id: string) => {
    setContent({ ...content, brochures: content.brochures.filter((b) => b.id !== id) })
  }

  const addBrochure = () => {
    setContent({ ...content, brochures: [...content.brochures, newBrochure()] })
  }

  const updateDestination = (id: string, patch: Partial<DiscoverEgyptDestination>) => {
    setContent({ ...content, destinations: content.destinations.map((d) => (d.id === id ? { ...d, ...patch } : d)) })
  }

  const removeDestination = (id: string) => {
    setContent({ ...content, destinations: content.destinations.filter((d) => d.id !== id) })
  }

  const addDestination = () => {
    setContent({ ...content, destinations: [...content.destinations, newDestination()] })
  }

  const save = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/content/discoverEgypt", {
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
          <h1 className="text-2xl font-bold text-white mb-1">Discover Egypt</h1>
          <p className="text-slate-400">Manage the Discover Egypt page: brochures and iconic Egyptian destination cards.</p>
        </div>
        <Button variant="gradient" onClick={save} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className="text-sm text-emerald-400 mb-4">{message}</p>}

      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="text-white text-lg">Brochures</CardTitle>
          <CardDescription>Add, remove, and edit the downloadable brochures shown on the Discover Egypt page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.brochures.map((brochure, index) => (
            <div key={brochure.id} className="border border-slate-700 rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase tracking-wide">Brochure {index + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => removeBrochure(brochure.id)}>
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
              <FieldPair
                labelEn="Title (English)"
                labelAr="العنوان (عربي)"
                valueEn={brochure.title_en}
                valueAr={brochure.title_ar}
                onChangeEn={(v) => updateBrochure(brochure.id, { title_en: v })}
                onChangeAr={(v) => updateBrochure(brochure.id, { title_ar: v })}
              />
              <FieldPair
                labelEn="Description (English)"
                labelAr="الوصف (عربي)"
                valueEn={brochure.description_en}
                valueAr={brochure.description_ar}
                onChangeEn={(v) => updateBrochure(brochure.id, { description_en: v })}
                onChangeAr={(v) => updateBrochure(brochure.id, { description_ar: v })}
                multiline
              />
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wide">Download Link</label>
                <Input
                  value={brochure.href}
                  onChange={(e) => updateBrochure(brochure.id, { href: e.target.value })}
                  className="bg-slate-900 border-slate-600 text-white"
                  placeholder="/brochures/your-file.pdf"
                />
              </div>
            </div>
          ))}
          <Button variant="outline" className="border-slate-600 text-slate-200" onClick={addBrochure}>
            <Plus className="h-4 w-4 mr-2" />
            Add Brochure
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Iconic Egyptian Destinations</CardTitle>
          <CardDescription>Add, remove, and edit the destination cards shown on the Discover Egypt page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.destinations.map((dest, index) => (
            <div key={dest.id} className="border border-slate-700 rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase tracking-wide">Destination {index + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => removeDestination(dest.id)}>
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wide">Image</label>
                <MediaUpload
                  value={dest.image}
                  onChange={(url) => updateDestination(dest.id, { image: url })}
                  accept="image"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wide">Icon</label>
                <select
                  value={dest.icon}
                  onChange={(e) => updateDestination(dest.id, { icon: e.target.value as IconName })}
                  className="w-full h-10 px-3 rounded-md bg-slate-900 border border-slate-600 text-white text-sm"
                >
                  {iconNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <FieldPair
                labelEn="Title (English)"
                labelAr="العنوان (عربي)"
                valueEn={dest.title_en}
                valueAr={dest.title_ar}
                onChangeEn={(v) => updateDestination(dest.id, { title_en: v })}
                onChangeAr={(v) => updateDestination(dest.id, { title_ar: v })}
              />
              <FieldPair
                labelEn="Description (English)"
                labelAr="الوصف (عربي)"
                valueEn={dest.description_en}
                valueAr={dest.description_ar}
                onChangeEn={(v) => updateDestination(dest.id, { description_en: v })}
                onChangeAr={(v) => updateDestination(dest.id, { description_ar: v })}
                multiline
              />
            </div>
          ))}
          <Button variant="outline" className="border-slate-600 text-slate-200" onClick={addDestination}>
            <Plus className="h-4 w-4 mr-2" />
            Add Destination
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
