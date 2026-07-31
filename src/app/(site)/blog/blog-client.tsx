"use client"

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Newspaper, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { BlogContent } from '@/lib/content-types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function BlogClient({ initialContent }: { initialContent: BlogContent }) {
  const { language } = useLanguage()
  const ar = language === 'ar'
  const [content, setContent] = useState<BlogContent>(initialContent)

  useEffect(() => {
    fetch('/api/content/blog')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setContent(data))
      .catch(() => {})
  }, [])

  const posts = content.posts.filter((p) => p.published)

  return (
    <div className="dark">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">BLOG</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{language === 'ar' ? 'الأخبار والمقالات' : 'News & Articles'}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              {language === 'ar' ? 'أحدث الرؤى والنصائح والأدلة للطلاب الذين يخططون للدراسة في الخارج.' : 'Latest insights, tips, and guides for students planning to study abroad.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <Newspaper className="h-12 w-12 text-slate-600 mb-4" />
              <p className="text-slate-400 text-lg">
                {ar ? 'لا توجد أخبار أو مقالات متاحة' : 'No News or articles available'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all group cursor-pointer">
                      <CardContent className="p-0">
                        <div className="aspect-video bg-gradient-to-br from-emerald-900/50 to-teal-900/50 flex items-center justify-center rounded-t-lg overflow-hidden">
                          {post.coverImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={post.coverImage} alt={ar ? post.title_ar : post.title_en} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-5xl">{post.emoji}</span>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center space-x-4 mb-3">
                            <span className="text-xs text-emerald-400 font-medium bg-emerald-900/30 px-2 py-1 rounded">
                              {ar ? post.category_ar : post.category_en}
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-slate-400">
                              <Clock className="h-3 w-3" />
                              <span>{ar ? post.read_time_ar : post.read_time_en}</span>
                            </div>
                          </div>
                          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-emerald-400 transition-colors">
                            {ar ? post.title_ar : post.title_en}
                          </h3>
                          <p className="text-slate-300 text-sm mb-4">{ar ? post.excerpt_ar : post.excerpt_en}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-xs text-slate-400">
                              <Calendar className="h-3 w-3" />
                              <span>{post.date}</span>
                            </div>
                            <span className="text-emerald-400 text-sm group-hover:underline">
                              {ar ? 'اقرأ المزيد' : 'Read More'} →
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 to-teal-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">{language === 'ar' ? 'اشترك في نشرتنا الإخبارية' : 'Subscribe to Our Newsletter'}</h2>
            <p className="text-emerald-200 mb-8 max-w-xl mx-auto">
              {language === 'ar' ? 'احصل على أحدث أخبار الدراسة في الخارج وتحديثات المنح ونصائح الخبراء في بريدك الوارد.' : 'Get the latest study abroad news, scholarship updates, and expert tips delivered to your inbox.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-900">
                {language === 'ar' ? 'اشترك' : 'Subscribe'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
