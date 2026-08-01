"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Trash2, Save } from "lucide-react"
import { countriesPageSeed, CountriesPageContent, CountryDetail } from "@/lib/content-types"
import { MediaUpload } from "@/components/admin/media-upload"

function newCountry(): CountryDetail {
  return {
    id: `country-${Date.now()}`,
    name: "",
    code: "",
    flag: "",
    universities: [],
    tuition: "",
    visa: "",
    lifestyle: "",
    advantages: [],
  }
}

function linesToList(value: string): string[] {
  return value.split("\n").map((v) => v.trim()).filter(Boolean)
}

export default function AdminCountriesPage() {
  const [content, setContent] = useState<CountriesPageContent>(countriesPageSeed)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/content/countriesPage")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .finally(() => setLoading(false))
  }, [])

  const updateCountry = (id: string, patch: Partial<CountryDetail>) => {
    setContent({ ...content, countries: content.countries.map((c) => (c.id === id ? { ...c, ...patch } : c)) })
  }

  const removeCountry = (id: string) => {
    setContent({ ...content, countries: content.countries.filter((c) => c.id !== id) })
  }

  const addCountry = () => {
    setContent({ ...content, countries: [...content.countries, newCountry()] })
  }

  const save = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/content/countriesPage", {
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
          <h1 className="text-2xl font-bold text-white mb-1">Countries</h1>
          <p className="text-slate-400">Add, edit, or remove the study destination countries shown on the Countries page.</p>
        </div>
        <Button variant="gradient" onClick={save} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className="text-sm text-emerald-400 mb-4">{message}</p>}

      <div className="space-y-4">
        {content.countries.map((country, index) => (
          <Card key={country.id} className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-base">
                Country {index + 1}
                {country.name ? ` — ${country.name}` : ""}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => removeCountry(country.id)}>
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wide">Country Name</label>
                  <Input
                    value={country.name}
                    onChange={(e) => updateCountry(country.id, { name: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white"
                    placeholder="e.g. United States"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wide">
                    Country Code (used for flag fallback, e.g. &quot;us&quot;, &quot;gb&quot;)
                  </label>
                  <Input
                    value={country.code}
                    onChange={(e) => updateCountry(country.id, { code: e.target.value.toLowerCase() })}
                    className="bg-slate-900 border-slate-600 text-white"
                    placeholder="e.g. us"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wide">
                  Flag Image (optional — leave empty to auto-use the flag for the country code above)
                </label>
                <MediaUpload
                  value={country.flag}
                  onChange={(url) => updateCountry(country.id, { flag: url })}
                  accept="image"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wide">Tuition Overview</label>
                  <Input
                    value={country.tuition}
                    onChange={(e) => updateCountry(country.id, { tuition: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white"
                    placeholder="e.g. $20,000 - $60,000 / year"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wide">Visa Info</label>
                  <Input
                    value={country.visa}
                    onChange={(e) => updateCountry(country.id, { visa: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white"
                    placeholder="e.g. F-1 Student Visa"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wide">Lifestyle Description</label>
                <Textarea
                  value={country.lifestyle}
                  onChange={(e) => updateCountry(country.id, { lifestyle: e.target.value })}
                  className="bg-slate-900 border-slate-600 text-white"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wide">Popular Universities (one per line)</label>
                  <Textarea
                    value={country.universities.join("\n")}
                    onChange={(e) => updateCountry(country.id, { universities: linesToList(e.target.value) })}
                    className="bg-slate-900 border-slate-600 text-white"
                    rows={4}
                    placeholder={"Harvard University\nMIT\nStanford University"}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wide">Study Advantages (one per line)</label>
                  <Textarea
                    value={country.advantages.join("\n")}
                    onChange={(e) => updateCountry(country.id, { advantages: linesToList(e.target.value) })}
                    className="bg-slate-900 border-slate-600 text-white"
                    rows={4}
                    placeholder={"World-renowned universities\nDiverse culture"}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addCountry} className="mt-4 border-slate-600 text-slate-200">
        <Plus className="h-4 w-4 mr-2" />
        Add Country
      </Button>
    </div>
  )
}
