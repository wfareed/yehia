"use client"

import React from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Newspaper } from 'lucide-react'

export default function BlogPage() {
  const { language } = useLanguage()

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center py-20"
          >
            <Newspaper className="h-12 w-12 text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">
              {language === 'ar' ? 'لا توجد أخبار أو مقالات متاحة' : 'No News or articles available'}
            </p>
          </motion.div>
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
