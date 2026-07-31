"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Trash2, Save } from "lucide-react"
import {
  homeSeed,
  HomeContent,
  HomeStat,
  HomeServiceCard,
  HomeCountry,
  HomeTestimonial,
} from "@/lib/content-types"
import { FieldPair } from "@/components/admin/field-pair"
import { IconSelect } from "@/components/admin/icon-select"

export default function AdminHomePage() {
  const [content, setContent] = useState<HomeContent>(homeSeed)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/content/home")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/content/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      if (!res.ok) throw new Error()
      setMessage("Saved! Changes are now live on the homepage.")
    } catch {
      setMessage("Failed to save. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-slate-400">Loading...</p>

  return (
    <div className="pb-16">
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-slate-900 py-2 z-10">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Home Page</h1>
          <p className="text-slate-400">Edit all content shown on the homepage.</p>
        </div>
        <Button variant="gradient" onClick={save} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className="text-sm text-emerald-400 mb-4">{message}</p>}

      <div className="space-y-6">
        {/* Hero */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Hero Section</CardTitle>
            <CardDescription>The main headline and subtitle shown over the hero video.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldPair
              labelEn="Title (English)"
              labelAr="العنوان (عربي)"
              valueEn={content.hero_title_en}
              valueAr={content.hero_title_ar}
              onChangeEn={(v) => setContent({ ...content, hero_title_en: v })}
              onChangeAr={(v) => setContent({ ...content, hero_title_ar: v })}
            />
            <FieldPair
              labelEn="Subtitle (English)"
              labelAr="النص الفرعي (عربي)"
              valueEn={content.hero_subtitle_en}
              valueAr={content.hero_subtitle_ar}
              onChangeEn={(v) => setContent({ ...content, hero_subtitle_en: v })}
              onChangeAr={(v) => setContent({ ...content, hero_subtitle_ar: v })}
              multiline
            />
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Stats Bar</CardTitle>
            <CardDescription>The 4 highlighted numbers under the hero.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.stats.map((stat) => (
              <div key={stat.id} className="border border-slate-700 rounded-md p-4 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <label className="text-xs text-slate-400 uppercase tracking-wide">Value</label>
                    <Input
                      value={stat.value}
                      onChange={(e) => setContent({ ...content, stats: content.stats.map((s) => (s.id === stat.id ? { ...s, value: e.target.value } : s)) })}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={() => setContent({ ...content, stats: content.stats.filter((s) => s.id !== stat.id) })}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
                <FieldPair
                  labelEn="Label (English)"
                  labelAr="النص (عربي)"
                  valueEn={stat.label_en}
                  valueAr={stat.label_ar}
                  onChangeEn={(v) => setContent({ ...content, stats: content.stats.map((s) => (s.id === stat.id ? { ...s, label_en: v } : s)) })}
                  onChangeAr={(v) => setContent({ ...content, stats: content.stats.map((s) => (s.id === stat.id ? { ...s, label_ar: v } : s)) })}
                />
              </div>
            ))}
            <Button
              variant="outline"
              className="border-slate-600 text-slate-200"
              onClick={() =>
                setContent({ ...content, stats: [...content.stats, { id: `stat-${Date.now()}`, value: "", label_en: "", label_ar: "" } as HomeStat] })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Stat
            </Button>
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Services Section</CardTitle>
            <CardDescription>Section heading and the 4 service cards.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldPair
              labelEn="Section Title (English)"
              labelAr="عنوان القسم (عربي)"
              valueEn={content.services_title_en}
              valueAr={content.services_title_ar}
              onChangeEn={(v) => setContent({ ...content, services_title_en: v })}
              onChangeAr={(v) => setContent({ ...content, services_title_ar: v })}
            />
            <FieldPair
              labelEn="Section Subtitle (English)"
              labelAr="الوصف الفرعي (عربي)"
              valueEn={content.services_subtitle_en}
              valueAr={content.services_subtitle_ar}
              onChangeEn={(v) => setContent({ ...content, services_subtitle_en: v })}
              onChangeAr={(v) => setContent({ ...content, services_subtitle_ar: v })}
            />
            <div className="border-t border-slate-700 pt-4 space-y-4">
              {content.services.map((service) => (
                <div key={service.id} className="border border-slate-700 rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-40">
                      <label className="text-xs text-slate-400 uppercase tracking-wide">Icon</label>
                      <IconSelect
                        value={service.icon}
                        onChange={(v) => setContent({ ...content, services: content.services.map((s) => (s.id === service.id ? { ...s, icon: v } : s)) })}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setContent({ ...content, services: content.services.filter((s) => s.id !== service.id) })}
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                  <FieldPair
                    labelEn="Title (English)"
                    labelAr="العنوان (عربي)"
                    valueEn={service.title_en}
                    valueAr={service.title_ar}
                    onChangeEn={(v) => setContent({ ...content, services: content.services.map((s) => (s.id === service.id ? { ...s, title_en: v } : s)) })}
                    onChangeAr={(v) => setContent({ ...content, services: content.services.map((s) => (s.id === service.id ? { ...s, title_ar: v } : s)) })}
                  />
                  <FieldPair
                    labelEn="Description (English)"
                    labelAr="الوصف (عربي)"
                    valueEn={service.description_en}
                    valueAr={service.description_ar}
                    onChangeEn={(v) =>
                      setContent({ ...content, services: content.services.map((s) => (s.id === service.id ? { ...s, description_en: v } : s)) })
                    }
                    onChangeAr={(v) =>
                      setContent({ ...content, services: content.services.map((s) => (s.id === service.id ? { ...s, description_ar: v } : s)) })
                    }
                    multiline
                  />
                </div>
              ))}
              <Button
                variant="outline"
                className="border-slate-600 text-slate-200"
                onClick={() =>
                  setContent({
                    ...content,
                    services: [
                      ...content.services,
                      { id: `svc-${Date.now()}`, icon: "Star", title_en: "", title_ar: "", description_en: "", description_ar: "" } as HomeServiceCard,
                    ],
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Destinations / Countries */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Study Destinations Section</CardTitle>
            <CardDescription>Section heading and the country cards.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldPair
              labelEn="Section Title (English)"
              labelAr="عنوان القسم (عربي)"
              valueEn={content.destinations_title_en}
              valueAr={content.destinations_title_ar}
              onChangeEn={(v) => setContent({ ...content, destinations_title_en: v })}
              onChangeAr={(v) => setContent({ ...content, destinations_title_ar: v })}
            />
            <FieldPair
              labelEn="Section Subtitle (English)"
              labelAr="الوصف الفرعي (عربي)"
              valueEn={content.destinations_subtitle_en}
              valueAr={content.destinations_subtitle_ar}
              onChangeEn={(v) => setContent({ ...content, destinations_subtitle_en: v })}
              onChangeAr={(v) => setContent({ ...content, destinations_subtitle_ar: v })}
            />
            <div className="border-t border-slate-700 pt-4 space-y-3">
              {content.countries.map((country) => (
                <div key={country.id} className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_auto] gap-2 items-end border border-slate-700 rounded-md p-3">
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide">Country Name</label>
                    <Input
                      value={country.name}
                      onChange={(e) => setContent({ ...content, countries: content.countries.map((c) => (c.id === country.id ? { ...c, name: e.target.value } : c)) })}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide">Flag Code</label>
                    <Input
                      value={country.code}
                      onChange={(e) => setContent({ ...content, countries: content.countries.map((c) => (c.id === country.id ? { ...c, code: e.target.value } : c)) })}
                      placeholder="us"
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide">Universities</label>
                    <Input
                      value={country.universities}
                      onChange={(e) =>
                        setContent({ ...content, countries: content.countries.map((c) => (c.id === country.id ? { ...c, universities: e.target.value } : c)) })
                      }
                      placeholder="100+"
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setContent({ ...content, countries: content.countries.filter((c) => c.id !== country.id) })}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              ))}
              <p className="text-xs text-slate-500">
                Flag Code uses{" "}
                <a href="https://flagcdn.com" target="_blank" rel="noreferrer" className="underline">
                  flagcdn.com
                </a>{" "}
                2-letter country codes (e.g. us, gb, ca).
              </p>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-200"
                onClick={() =>
                  setContent({
                    ...content,
                    countries: [...content.countries, { id: `c-${Date.now()}`, name: "", code: "", universities: "" } as HomeCountry],
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Country
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Testimonials Section</CardTitle>
            <CardDescription>Section heading and the testimonial cards.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldPair
              labelEn="Section Title (English)"
              labelAr="عنوان القسم (عربي)"
              valueEn={content.testimonials_title_en}
              valueAr={content.testimonials_title_ar}
              onChangeEn={(v) => setContent({ ...content, testimonials_title_en: v })}
              onChangeAr={(v) => setContent({ ...content, testimonials_title_ar: v })}
            />
            <FieldPair
              labelEn="Section Subtitle (English)"
              labelAr="الوصف الفرعي (عربي)"
              valueEn={content.testimonials_subtitle_en}
              valueAr={content.testimonials_subtitle_ar}
              onChangeEn={(v) => setContent({ ...content, testimonials_subtitle_en: v })}
              onChangeAr={(v) => setContent({ ...content, testimonials_subtitle_ar: v })}
            />
            <div className="border-t border-slate-700 pt-4 space-y-4">
              {content.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border border-slate-700 rounded-md p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 uppercase tracking-wide">Name</label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) =>
                          setContent({ ...content, testimonials: content.testimonials.map((tItem) => (tItem.id === testimonial.id ? { ...tItem, name: e.target.value } : tItem)) })
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 uppercase tracking-wide">Country / Subtitle</label>
                      <Input
                        value={testimonial.country}
                        onChange={(e) =>
                          setContent({ ...content, testimonials: content.testimonials.map((tItem) => (tItem.id === testimonial.id ? { ...tItem, country: e.target.value } : tItem)) })
                        }
                        placeholder="Studying in UK"
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="text-xs text-slate-400 uppercase tracking-wide">Rating (1-5)</label>
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          value={testimonial.rating}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              testimonials: content.testimonials.map((tItem) =>
                                tItem.id === testimonial.id ? { ...tItem, rating: Number(e.target.value) } : tItem
                              ),
                            })
                          }
                          className="bg-slate-900 border-slate-600 text-white"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setContent({ ...content, testimonials: content.testimonials.filter((tItem) => tItem.id !== testimonial.id) })}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wide">Testimonial Text</label>
                    <Input
                      value={testimonial.text}
                      onChange={(e) =>
                        setContent({ ...content, testimonials: content.testimonials.map((tItem) => (tItem.id === testimonial.id ? { ...tItem, text: e.target.value } : tItem)) })
                      }
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="border-slate-600 text-slate-200"
                onClick={() =>
                  setContent({
                    ...content,
                    testimonials: [
                      ...content.testimonials,
                      { id: `t-${Date.now()}`, name: "", country: "", rating: 5, text: "" } as HomeTestimonial,
                    ],
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Call To Action Section</CardTitle>
            <CardDescription>The banner shown near the bottom of the homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldPair
              labelEn="Title (English)"
              labelAr="العنوان (عربي)"
              valueEn={content.cta_title_en}
              valueAr={content.cta_title_ar}
              onChangeEn={(v) => setContent({ ...content, cta_title_en: v })}
              onChangeAr={(v) => setContent({ ...content, cta_title_ar: v })}
            />
            <FieldPair
              labelEn="Description (English)"
              labelAr="الوصف (عربي)"
              valueEn={content.cta_description_en}
              valueAr={content.cta_description_ar}
              onChangeEn={(v) => setContent({ ...content, cta_description_en: v })}
              onChangeAr={(v) => setContent({ ...content, cta_description_ar: v })}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
