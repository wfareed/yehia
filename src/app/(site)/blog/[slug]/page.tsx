"use client"

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { blogSeed, BlogContent, BlogPost } from '@/lib/content-types'
import { getEmbedUrl, isDirectVideoFile } from '@/lib/video-embed'

export default function BlogPostPage() {
  const { language } = useLanguage()
  const ar = language === 'ar'
  const params = useParams<{ slug: string }>()
  const [content, setContent] = useState<BlogContent>(blogSeed)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/content/blog')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setContent(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const post: BlogPost | undefined = content.posts.find((p) => p.slug === params.slug && p.published)

  if (loading) {
    return <div className="dark min-h-screen bg-slate-900" />
  }

  if (!post) {
    return (
      <div className="dark min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-white mb-4">{ar ? 'المقال غير موجود' : 'Article Not Found'}</h1>
          <p className="text-slate-300 mb-8">
            {ar ? 'هذا المقال غير متاح أو تمت إزالته.' : 'This article is unavailable or has been removed.'}
          </p>
          <Button variant="gradient" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {ar ? 'العودة إلى المدونة' : 'Back to Blog'}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const title = ar ? post.title_ar : post.title_en
  const category = ar ? post.category_ar : post.category_en
  const readTime = ar ? post.read_time_ar : post.read_time_en

  return (
    <div className="dark">
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="relative container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm mb-6">
              <ArrowLeft className="h-4 w-4" />
              {ar ? 'العودة إلى المدونة' : 'Back to Blog'}
            </Link>
            {post.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.coverImage} alt={title} className="w-full max-h-96 object-cover rounded-2xl mb-6" />
            ) : (
              <div className="text-6xl mb-6">{post.emoji}</div>
            )}
            <span className="text-xs text-emerald-400 font-medium bg-emerald-900/30 px-3 py-1 rounded">{category}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4">{title}</h1>
            <div className="flex items-center justify-center gap-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {post.blocks.map((block) => {
              if (block.type === 'paragraph') {
                const text = ar ? block.text_ar : block.text_en
                if (!text.trim()) return null
                return (
                  <p key={block.id} className="text-slate-300 leading-relaxed">
                    {text}
                  </p>
                )
              }

              if (block.type === 'image') {
                if (!block.url) return null
                const caption = ar ? block.caption_ar : block.caption_en
                return (
                  <figure key={block.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={block.url} alt={caption || title} className="w-full rounded-xl" />
                    {caption && <figcaption className="text-slate-400 text-sm text-center mt-2">{caption}</figcaption>}
                  </figure>
                )
              }

              if (block.type === 'video') {
                if (!block.url) return null
                const caption = ar ? block.caption_ar : block.caption_en
                const embedUrl = getEmbedUrl(block.url)
                return (
                  <figure key={block.id}>
                    <div className="aspect-video rounded-xl overflow-hidden bg-black">
                      {embedUrl ? (
                        <iframe
                          src={embedUrl}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : isDirectVideoFile(block.url) ? (
                        <video src={block.url} controls className="w-full h-full" />
                      ) : (
                        <a href={block.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-full text-emerald-400 underline">
                          {ar ? 'مشاهدة الفيديو' : 'Watch video'}
                        </a>
                      )}
                    </div>
                    {caption && <figcaption className="text-slate-400 text-sm text-center mt-2">{caption}</figcaption>}
                  </figure>
                )
              }

              return null
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
