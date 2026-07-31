"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Trash2, Save } from "lucide-react"
import {
  aboutSeed,
  AboutContent,
  AboutPoint,
  AboutValueCard,
  AboutStat,
  AboutTimelineItem,
  AboutTeamMember,
} from "@/lib/content-types"
import { FieldPair } from "@/components/admin/field-pair"
import { IconSelect } from "@/components/admin/icon-select"

export default function AdminAboutPage() {
  const [content, setContent] = useState<AboutContent>(aboutSeed)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/content/about")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/content/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      if (!res.ok) throw new Error()
      setMessage("Saved! Changes are now live on the About Us page.")
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
          <h1 className="text-2xl font-bold text-white mb-1">About Us Page</h1>
          <p className="text-slate-400">Edit all content shown on the About Us page.</p>
        </div>
        <Button variant="gradient" onClick={save} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className="text-sm text-emerald-400 mb-4">{message}</p>}

      <div className="space-y-6">
        {/* Hero + Why Choose Us */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Hero &amp; Description</CardTitle>
            <CardDescription>"Who We Are" heading and the main description text.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldPair
              labelEn="Heading (English)"
              labelAr="العنوان (عربي)"
              valueEn={content.whoWeAre_en}
              valueAr={content.whoWeAre_ar}
              onChangeEn={(v) => setContent({ ...content, whoWeAre_en: v })}
              onChangeAr={(v) => setContent({ ...content, whoWeAre_ar: v })}
            />
            <FieldPair
              labelEn="Description (English)"
              labelAr="الوصف (عربي)"
              valueEn={content.description_en}
              valueAr={content.description_ar}
              onChangeEn={(v) => setContent({ ...content, description_en: v })}
              onChangeAr={(v) => setContent({ ...content, description_ar: v })}
              multiline
            />
            <FieldPair
              labelEn="Why Choose Us Title (English)"
              labelAr="عنوان لماذا نحن (عربي)"
              valueEn={content.whyChooseUs_en}
              valueAr={content.whyChooseUs_ar}
              onChangeEn={(v) => setContent({ ...content, whyChooseUs_en: v })}
              onChangeAr={(v) => setContent({ ...content, whyChooseUs_ar: v })}
            />
          </CardContent>
        </Card>

        {/* Points */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Why Choose Us — Points</CardTitle>
            <CardDescription>The checklist shown under "Why Choose Us".</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {content.points.map((point) => (
              <div key={point.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-start border border-slate-700 rounded-md p-3">
                <Input
                  value={point.text_en}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      points: content.points.map((p) => (p.id === point.id ? { ...p, text_en: e.target.value } : p)),
                    })
                  }
                  placeholder="English"
                  className="bg-slate-900 border-slate-600 text-white"
                />
                <Input
                  value={point.text_ar}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      points: content.points.map((p) => (p.id === point.id ? { ...p, text_ar: e.target.value } : p)),
                    })
                  }
                  placeholder="عربي"
                  dir="rtl"
                  className="bg-slate-900 border-slate-600 text-white text-right"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setContent({ ...content, points: content.points.filter((p) => p.id !== point.id) })}
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              className="border-slate-600 text-slate-200"
              onClick={() =>
                setContent({
                  ...content,
                  points: [...content.points, { id: `point-${Date.now()}`, text_en: "", text_ar: "" } as AboutPoint],
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Point
            </Button>
          </CardContent>
        </Card>

        {/* Mission / Vision / Values cards */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Mission, Vision &amp; Values Cards</CardTitle>
            <CardDescription>The 4-card grid shown in the Mission/Vision/Values section.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.valueCards.map((card) => (
              <div key={card.id} className="border border-slate-700 rounded-md p-4 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="w-40">
                    <label className="text-xs text-slate-400 uppercase tracking-wide">Icon</label>
                    <IconSelect
                      value={card.icon}
                      onChange={(v) =>
                        setContent({
                          ...content,
                          valueCards: content.valueCards.map((c) => (c.id === card.id ? { ...c, icon: v } : c)),
                        })
                      }
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setContent({ ...content, valueCards: content.valueCards.filter((c) => c.id !== card.id) })}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
                <FieldPair
                  labelEn="Title (English)"
                  labelAr="العنوان (عربي)"
                  valueEn={card.title_en}
                  valueAr={card.title_ar}
                  onChangeEn={(v) =>
                    setContent({ ...content, valueCards: content.valueCards.map((c) => (c.id === card.id ? { ...c, title_en: v } : c)) })
                  }
                  onChangeAr={(v) =>
                    setContent({ ...content, valueCards: content.valueCards.map((c) => (c.id === card.id ? { ...c, title_ar: v } : c)) })
                  }
                />
                <FieldPair
                  labelEn="Description (English)"
                  labelAr="الوصف (عربي)"
                  valueEn={card.description_en}
                  valueAr={card.description_ar}
                  onChangeEn={(v) =>
                    setContent({ ...content, valueCards: content.valueCards.map((c) => (c.id === card.id ? { ...c, description_en: v } : c)) })
                  }
                  onChangeAr={(v) =>
                    setContent({ ...content, valueCards: content.valueCards.map((c) => (c.id === card.id ? { ...c, description_ar: v } : c)) })
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
                  valueCards: [
                    ...content.valueCards,
                    { id: `value-${Date.now()}`, icon: "Star", title_en: "", title_ar: "", description_en: "", description_ar: "" } as AboutValueCard,
                  ],
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Stats</CardTitle>
            <CardDescription>The stat numbers shown in the highlighted stats bar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.stats.map((stat) => (
              <div key={stat.id} className="border border-slate-700 rounded-md p-4 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-40">
                    <label className="text-xs text-slate-400 uppercase tracking-wide">Icon</label>
                    <IconSelect
                      value={stat.icon}
                      onChange={(v) => setContent({ ...content, stats: content.stats.map((s) => (s.id === stat.id ? { ...s, icon: v } : s)) })}
                    />
                  </div>
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
                setContent({
                  ...content,
                  stats: [...content.stats, { id: `stat-${Date.now()}`, icon: "Star", value: "", label_en: "", label_ar: "" } as AboutStat],
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Stat
            </Button>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Timeline</CardTitle>
            <CardDescription>The "Our Journey" milestones list.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.timeline.map((item) => (
              <div key={item.id} className="border border-slate-700 rounded-md p-4 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="w-32">
                    <label className="text-xs text-slate-400 uppercase tracking-wide">Year</label>
                    <Input
                      value={item.year}
                      onChange={(e) =>
                        setContent({ ...content, timeline: content.timeline.map((t) => (t.id === item.id ? { ...t, year: e.target.value } : t)) })
                      }
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setContent({ ...content, timeline: content.timeline.filter((t) => t.id !== item.id) })}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
                <FieldPair
                  labelEn="Title (English)"
                  labelAr="العنوان (عربي)"
                  valueEn={item.title_en}
                  valueAr={item.title_ar}
                  onChangeEn={(v) => setContent({ ...content, timeline: content.timeline.map((t) => (t.id === item.id ? { ...t, title_en: v } : t)) })}
                  onChangeAr={(v) => setContent({ ...content, timeline: content.timeline.map((t) => (t.id === item.id ? { ...t, title_ar: v } : t)) })}
                />
                <FieldPair
                  labelEn="Description (English)"
                  labelAr="الوصف (عربي)"
                  valueEn={item.description_en}
                  valueAr={item.description_ar}
                  onChangeEn={(v) =>
                    setContent({ ...content, timeline: content.timeline.map((t) => (t.id === item.id ? { ...t, description_en: v } : t)) })
                  }
                  onChangeAr={(v) =>
                    setContent({ ...content, timeline: content.timeline.map((t) => (t.id === item.id ? { ...t, description_ar: v } : t)) })
                  }
                />
              </div>
            ))}
            <Button
              variant="outline"
              className="border-slate-600 text-slate-200"
              onClick={() =>
                setContent({
                  ...content,
                  timeline: [
                    ...content.timeline,
                    { id: `tl-${Date.now()}`, year: "", title_en: "", title_ar: "", description_en: "", description_ar: "" } as AboutTimelineItem,
                  ],
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Team</CardTitle>
            <CardDescription>Team member cards shown in the "Meet Our Experts" section.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.team.map((member) => (
              <div key={member.id} className="border border-slate-700 rounded-md p-4 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-slate-400 uppercase tracking-wide">Name</label>
                    <Input
                      value={member.name}
                      onChange={(e) => setContent({ ...content, team: content.team.map((m) => (m.id === member.id ? { ...m, name: e.target.value } : m)) })}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <div className="w-24">
                    <label className="text-xs text-slate-400 uppercase tracking-wide">Initials</label>
                    <Input
                      value={member.initials}
                      maxLength={3}
                      onChange={(e) =>
                        setContent({ ...content, team: content.team.map((m) => (m.id === member.id ? { ...m, initials: e.target.value } : m)) })
                      }
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-4"
                    onClick={() => setContent({ ...content, team: content.team.filter((m) => m.id !== member.id) })}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
                <FieldPair
                  labelEn="Role (English)"
                  labelAr="المسمى الوظيفي (عربي)"
                  valueEn={member.role_en}
                  valueAr={member.role_ar}
                  onChangeEn={(v) => setContent({ ...content, team: content.team.map((m) => (m.id === member.id ? { ...m, role_en: v } : m)) })}
                  onChangeAr={(v) => setContent({ ...content, team: content.team.map((m) => (m.id === member.id ? { ...m, role_ar: v } : m)) })}
                />
              </div>
            ))}
            <Button
              variant="outline"
              className="border-slate-600 text-slate-200"
              onClick={() =>
                setContent({
                  ...content,
                  team: [
                    ...content.team,
                    { id: `team-${Date.now()}`, name: "", role_en: "", role_ar: "", initials: "" } as AboutTeamMember,
                  ],
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
