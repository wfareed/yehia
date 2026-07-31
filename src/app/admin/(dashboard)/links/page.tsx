"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Trash2, Save } from "lucide-react"
import { NavLink } from "@/lib/content-types"

function newLink(): NavLink {
  return { id: `link-${Date.now()}`, href: "/", label_en: "", label_ar: "" }
}

function LinkListEditor({
  title,
  description,
  links,
  onChange,
}: {
  title: string
  description: string
  links: NavLink[]
  onChange: (links: NavLink[]) => void
}) {
  const update = (id: string, field: keyof NavLink, value: string) => {
    onChange(links.map((l) => (l.id === id ? { ...l, [field]: value } : l)))
  }
  const remove = (id: string) => onChange(links.filter((l) => l.id !== id))
  const add = () => onChange([...links, newLink()])

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center border border-slate-700 rounded-md p-3"
          >
            <div>
              <label className="text-xs text-slate-400">Link URL</label>
              <Input
                value={link.href}
                onChange={(e) => update(link.id, "href", e.target.value)}
                placeholder="/page"
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Label (English)</label>
              <Input
                value={link.label_en}
                onChange={(e) => update(link.id, "label_en", e.target.value)}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Label (Arabic)</label>
              <Input
                value={link.label_ar}
                onChange={(e) => update(link.id, "label_ar", e.target.value)}
                dir="rtl"
                className="bg-slate-900 border-slate-600 text-white text-right"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => remove(link.id)} className="justify-self-end">
              <Trash2 className="h-4 w-4 text-red-400" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={add} className="border-slate-600 text-slate-200">
          <Plus className="h-4 w-4 mr-2" />
          Add Link
        </Button>
      </CardContent>
    </Card>
  )
}

export default function AdminLinksPage() {
  const [headerLinks, setHeaderLinks] = useState<NavLink[]>([])
  const [footerLinks, setFooterLinks] = useState<NavLink[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/content/nav")
      .then((res) => res.json())
      .then((data) => {
        setHeaderLinks(data.headerLinks || [])
        setFooterLinks(data.footerLinks || [])
      })
      .finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/content/nav", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headerLinks, footerLinks }),
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
          <h1 className="text-2xl font-bold text-white mb-1">Header &amp; Footer Links</h1>
          <p className="text-slate-400">Add or remove navigation links shown in the header menu and footer.</p>
        </div>
        <Button variant="gradient" onClick={save} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className="text-sm text-emerald-400 mb-4">{message}</p>}

      <div className="space-y-6">
        <LinkListEditor
          title="Header Menu"
          description="Links shown in the main site navigation bar."
          links={headerLinks}
          onChange={setHeaderLinks}
        />
        <LinkListEditor
          title="Footer Quick Links"
          description="Links shown in the footer's Quick Links column."
          links={footerLinks}
          onChange={setFooterLinks}
        />
      </div>
    </div>
  )
}
