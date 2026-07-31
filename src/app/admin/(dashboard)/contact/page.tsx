"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save } from "lucide-react"
import { contactSeed, ContactContent } from "@/lib/content-types"
import { FieldPair } from "@/components/admin/field-pair"

export default function AdminContactPage() {
  const [content, setContent] = useState<ContactContent>(contactSeed)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/content/contact")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/content/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      if (!res.ok) throw new Error()
      setMessage("Saved! Changes are now live on the Contact page and footer.")
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
          <h1 className="text-2xl font-bold text-white mb-1">Contact Page</h1>
          <p className="text-slate-400">Edit the contact info shown on the Contact page and site footer.</p>
        </div>
        <Button variant="gradient" onClick={save} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className="text-sm text-emerald-400 mb-4">{message}</p>}

      <div className="space-y-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Contact Info</CardTitle>
            <CardDescription>
              Shown on the Contact page, the site footer, and used as the recipient address for the "Send us a
              Message" form.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldPair
              labelEn="Address (English)"
              labelAr="العنوان (عربي)"
              valueEn={content.address_en}
              valueAr={content.address_ar}
              onChangeEn={(v) => setContent({ ...content, address_en: v })}
              onChangeAr={(v) => setContent({ ...content, address_ar: v })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide">Phone</label>
                <Input
                  value={content.phone}
                  onChange={(e) => setContent({ ...content, phone: e.target.value })}
                  placeholder="+201092020733"
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide">
                  Contact Email (also receives form submissions)
                </label>
                <Input
                  type="email"
                  value={content.email}
                  onChange={(e) => setContent({ ...content, email: e.target.value })}
                  placeholder="info@visionedge-eg.com"
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wide">WhatsApp Number (digits only, with country code)</label>
              <Input
                value={content.whatsapp_number}
                onChange={(e) => setContent({ ...content, whatsapp_number: e.target.value })}
                placeholder="201092020733"
                className="bg-slate-900 border-slate-600 text-white max-w-xs"
              />
            </div>
            <FieldPair
              labelEn="Working Hours (English)"
              labelAr="ساعات العمل (عربي)"
              valueEn={content.working_hours_en}
              valueAr={content.working_hours_ar}
              onChangeEn={(v) => setContent({ ...content, working_hours_en: v })}
              onChangeAr={(v) => setContent({ ...content, working_hours_ar: v })}
            />
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Social Media Links</CardTitle>
            <CardDescription>Shown on the Contact page and footer. Leave as "#" to hide a working link.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wide">Facebook URL</label>
              <Input
                value={content.social.facebook}
                onChange={(e) => setContent({ ...content, social: { ...content.social, facebook: e.target.value } })}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wide">Twitter / X URL</label>
              <Input
                value={content.social.twitter}
                onChange={(e) => setContent({ ...content, social: { ...content.social, twitter: e.target.value } })}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wide">Instagram URL</label>
              <Input
                value={content.social.instagram}
                onChange={(e) => setContent({ ...content, social: { ...content.social, instagram: e.target.value } })}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wide">LinkedIn URL</label>
              <Input
                value={content.social.linkedin}
                onChange={(e) => setContent({ ...content, social: { ...content.social, linkedin: e.target.value } })}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
