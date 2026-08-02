"use client"

import React, { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"

export function MediaUpload({
  value,
  onChange,
  accept,
  urlPlaceholder,
}: {
  value: string
  onChange: (url: string) => void
  accept: "image" | "video" | "document"
  urlPlaceholder?: string
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const acceptAttr =
    accept === "image"
      ? "image/jpeg,image/png,image/webp,image/gif"
      : accept === "video"
        ? "video/mp4,video/webm,video/ogg"
        : "image/jpeg,image/png,image/webp,image/gif,application/pdf"

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError("")
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Upload failed.")
        return
      }
      onChange(data.url)
    } catch {
      setError("Upload failed. Please try again.")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            urlPlaceholder ||
            (accept === "image"
              ? "https://... or upload below"
              : accept === "video"
                ? "YouTube/Vimeo URL or upload below"
                : "https://... or upload PDF/image below")
          }
          className="bg-slate-900 border-slate-600 text-white flex-1"
        />
        <Button
          type="button"
          variant="outline"
          className="border-slate-600 text-slate-200 shrink-0"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <span className="ml-2">{uploading ? "Uploading..." : "Upload"}</span>
        </Button>
        <input ref={fileInputRef} type="file" accept={acceptAttr} onChange={handleFileChange} className="hidden" />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {value && (accept === "image" || (accept === "document" && /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(value))) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Preview" className="h-24 rounded-md border border-slate-700 object-cover" />
      )}
      {value && accept === "document" && !/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(value) && (
        <p className="text-xs text-slate-400 truncate">{value}</p>
      )}
    </div>
  )
}
