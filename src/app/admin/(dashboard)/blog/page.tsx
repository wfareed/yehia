"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Trash2, Save, Eye, EyeOff, ChevronUp, ChevronDown, ImageIcon, Video, Type } from "lucide-react"
import { blogSeed, BlogContent, BlogPost, BlogContentBlock } from "@/lib/content-types"
import { FieldPair } from "@/components/admin/field-pair"
import { MediaUpload } from "@/components/admin/media-upload"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function newPost(): BlogPost {
  return {
    id: `post-${Date.now()}`,
    slug: `new-post-${Date.now()}`,
    emoji: "📰",
    coverImage: "",
    category_en: "",
    category_ar: "",
    title_en: "",
    title_ar: "",
    excerpt_en: "",
    excerpt_ar: "",
    blocks: [],
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    read_time_en: "5 min read",
    read_time_ar: "5 دقائق قراءة",
    published: true,
  }
}

function newBlock(type: BlogContentBlock["type"]): BlogContentBlock {
  const id = `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  if (type === "paragraph") return { id, type, text_en: "", text_ar: "" }
  if (type === "image") return { id, type, url: "", caption_en: "", caption_ar: "" }
  return { id, type: "video", url: "", caption_en: "", caption_ar: "" }
}

export default function AdminBlogPage() {
  const [content, setContent] = useState<BlogContent>(blogSeed)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/content/blog")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .finally(() => setLoading(false))
  }, [])

  const updatePost = (id: string, patch: Partial<BlogPost>) => {
    setContent({ ...content, posts: content.posts.map((p) => (p.id === id ? { ...p, ...patch } : p)) })
  }

  const updateBlock = (postId: string, blockId: string, patch: Partial<BlogContentBlock>) => {
    setContent({
      ...content,
      posts: content.posts.map((p) =>
        p.id === postId
          ? { ...p, blocks: p.blocks.map((b) => (b.id === blockId ? ({ ...b, ...patch } as BlogContentBlock) : b)) }
          : p
      ),
    })
  }

  const addBlock = (postId: string, type: BlogContentBlock["type"]) => {
    setContent({
      ...content,
      posts: content.posts.map((p) => (p.id === postId ? { ...p, blocks: [...p.blocks, newBlock(type)] } : p)),
    })
  }

  const removeBlock = (postId: string, blockId: string) => {
    setContent({
      ...content,
      posts: content.posts.map((p) => (p.id === postId ? { ...p, blocks: p.blocks.filter((b) => b.id !== blockId) } : p)),
    })
  }

  const moveBlock = (postId: string, blockId: string, direction: -1 | 1) => {
    setContent({
      ...content,
      posts: content.posts.map((p) => {
        if (p.id !== postId) return p
        const index = p.blocks.findIndex((b) => b.id === blockId)
        const newIndex = index + direction
        if (index === -1 || newIndex < 0 || newIndex >= p.blocks.length) return p
        const blocks = [...p.blocks]
        ;[blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]]
        return { ...p, blocks }
      }),
    })
  }

  const removePost = (id: string) => {
    setContent({ ...content, posts: content.posts.filter((p) => p.id !== id) })
  }

  const addPost = () => {
    setContent({ ...content, posts: [newPost(), ...content.posts] })
  }

  const save = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/content/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      if (!res.ok) throw new Error()
      setMessage("Saved! Changes are now live on the Blog page.")
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
          <h1 className="text-2xl font-bold text-white mb-1">Blog / News & Articles</h1>
          <p className="text-slate-400">Add, edit, or remove blog posts shown on the Blog page.</p>
        </div>
        <Button variant="gradient" onClick={save} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className="text-sm text-emerald-400 mb-4">{message}</p>}

      <Button variant="outline" onClick={addPost} className="mb-6 border-slate-600 text-slate-200">
        <Plus className="h-4 w-4 mr-2" />
        Add New Post
      </Button>

      {content.posts.length === 0 && <p className="text-slate-400">No posts yet. Click "Add New Post" to create one.</p>}

      <div className="space-y-6">
        {content.posts.map((post) => (
          <Card key={post.id} className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-white text-base">{post.title_en || "Untitled Post"}</CardTitle>
                <CardDescription>/blog/{post.slug}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updatePost(post.id, { published: !post.published })}
                  className="text-slate-300"
                >
                  {post.published ? (
                    <>
                      <Eye className="h-4 w-4 mr-1 text-emerald-400" /> Published
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4 mr-1 text-slate-500" /> Draft
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removePost(post.id)}>
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_140px] gap-4">
                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wide">Emoji (fallback)</label>
                  <Input
                    value={post.emoji}
                    onChange={(e) => updatePost(post.id, { emoji: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white text-center text-xl"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wide">
                    URL Slug (used in link: /blog/...)
                  </label>
                  <Input
                    value={post.slug}
                    onChange={(e) => updatePost(post.id, { slug: slugify(e.target.value) })}
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wide">Date</label>
                  <Input
                    value={post.date}
                    onChange={(e) => updatePost(post.id, { date: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide">
                  Cover Image (shown on card &amp; article header — falls back to emoji if empty)
                </label>
                <MediaUpload value={post.coverImage} onChange={(url) => updatePost(post.id, { coverImage: url })} accept="image" />
              </div>

              <FieldPair
                labelEn="Title (English)"
                labelAr="العنوان (عربي)"
                valueEn={post.title_en}
                valueAr={post.title_ar}
                onChangeEn={(v) => updatePost(post.id, { title_en: v, slug: post.slug.startsWith("new-post-") ? slugify(v) : post.slug })}
                onChangeAr={(v) => updatePost(post.id, { title_ar: v })}
              />
              <FieldPair
                labelEn="Category (English)"
                labelAr="التصنيف (عربي)"
                valueEn={post.category_en}
                valueAr={post.category_ar}
                onChangeEn={(v) => updatePost(post.id, { category_en: v })}
                onChangeAr={(v) => updatePost(post.id, { category_ar: v })}
              />
              <FieldPair
                labelEn="Read Time (English)"
                labelAr="مدة القراءة (عربي)"
                valueEn={post.read_time_en}
                valueAr={post.read_time_ar}
                onChangeEn={(v) => updatePost(post.id, { read_time_en: v })}
                onChangeAr={(v) => updatePost(post.id, { read_time_ar: v })}
              />
              <FieldPair
                labelEn="Excerpt (English)"
                labelAr="المقتطف (عربي)"
                valueEn={post.excerpt_en}
                valueAr={post.excerpt_ar}
                onChangeEn={(v) => updatePost(post.id, { excerpt_en: v })}
                onChangeAr={(v) => updatePost(post.id, { excerpt_ar: v })}
                multiline
              />
              <div className="border-t border-slate-700 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs text-slate-400 uppercase tracking-wide">Article Content</label>
                  <div className="flex gap-2">
                    <Button type="button" size="sm" variant="outline" className="border-slate-600 text-slate-200" onClick={() => addBlock(post.id, "paragraph")}>
                      <Type className="h-3.5 w-3.5 mr-1" /> Paragraph
                    </Button>
                    <Button type="button" size="sm" variant="outline" className="border-slate-600 text-slate-200" onClick={() => addBlock(post.id, "image")}>
                      <ImageIcon className="h-3.5 w-3.5 mr-1" /> Image
                    </Button>
                    <Button type="button" size="sm" variant="outline" className="border-slate-600 text-slate-200" onClick={() => addBlock(post.id, "video")}>
                      <Video className="h-3.5 w-3.5 mr-1" /> Video
                    </Button>
                  </div>
                </div>

                {post.blocks.length === 0 && (
                  <p className="text-slate-500 text-sm">No content blocks yet. Add a paragraph, image, or video above.</p>
                )}

                <div className="space-y-3">
                  {post.blocks.map((block, index) => (
                    <div key={block.id} className="border border-slate-700 rounded-md p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wide text-slate-500 flex items-center gap-1">
                          {block.type === "paragraph" && <Type className="h-3.5 w-3.5" />}
                          {block.type === "image" && <ImageIcon className="h-3.5 w-3.5" />}
                          {block.type === "video" && <Video className="h-3.5 w-3.5" />}
                          {block.type}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button type="button" variant="ghost" size="icon" disabled={index === 0} onClick={() => moveBlock(post.id, block.id, -1)}>
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={index === post.blocks.length - 1}
                            onClick={() => moveBlock(post.id, block.id, 1)}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeBlock(post.id, block.id)}>
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                        </div>
                      </div>

                      {block.type === "paragraph" && (
                        <FieldPair
                          labelEn="Text (English)"
                          labelAr="النص (عربي)"
                          valueEn={block.text_en}
                          valueAr={block.text_ar}
                          onChangeEn={(v) => updateBlock(post.id, block.id, { text_en: v })}
                          onChangeAr={(v) => updateBlock(post.id, block.id, { text_ar: v })}
                          multiline
                        />
                      )}

                      {block.type === "image" && (
                        <>
                          <MediaUpload value={block.url} onChange={(url) => updateBlock(post.id, block.id, { url })} accept="image" />
                          <FieldPair
                            labelEn="Caption (English, optional)"
                            labelAr="التعليق (عربي، اختياري)"
                            valueEn={block.caption_en}
                            valueAr={block.caption_ar}
                            onChangeEn={(v) => updateBlock(post.id, block.id, { caption_en: v })}
                            onChangeAr={(v) => updateBlock(post.id, block.id, { caption_ar: v })}
                          />
                        </>
                      )}

                      {block.type === "video" && (
                        <>
                          <MediaUpload
                            value={block.url}
                            onChange={(url) => updateBlock(post.id, block.id, { url })}
                            accept="video"
                            urlPlaceholder="YouTube/Vimeo URL or upload a video file below"
                          />
                          <FieldPair
                            labelEn="Caption (English, optional)"
                            labelAr="التعليق (عربي، اختياري)"
                            valueEn={block.caption_en}
                            valueAr={block.caption_ar}
                            onChangeEn={(v) => updateBlock(post.id, block.id, { caption_en: v })}
                            onChangeAr={(v) => updateBlock(post.id, block.id, { caption_ar: v })}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
