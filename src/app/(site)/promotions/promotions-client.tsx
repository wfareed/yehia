"use client"

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Tag } from 'lucide-react'
import { PromotionsContent } from '@/lib/content-types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function PromotionsClient({ initialContent }: { initialContent: PromotionsContent }) {
  const { language } = useLanguage()
  const ar = language === 'ar'
  const [content, setContent] = useState<PromotionsContent>(initialContent)

  useEffect(() => {
    fetch('/api/content/promotions')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setContent(data))
      .catch(() => {})
  }, [])

  const title = ar ? content.title_ar : content.title_en
  const subtitle = ar ? content.subtitle_ar : content.subtitle_en

  return (
    <div className="dark">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">PROMOTIONS</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">{subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          {content.promotions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <Tag className="h-12 w-12 text-slate-600 mb-4" />
              <p className="text-slate-400 text-lg">
                {ar ? 'لا توجد عروض متاحة حالياً' : 'No promotions available right now'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-10"
            >
              {content.promotions.map((promo) => {
                const promoTitle = ar ? promo.title_ar : promo.title_en
                const promoDescription = ar ? promo.description_ar : promo.description_en
                return (
                  <motion.div key={promo.id} variants={itemVariants} className="w-full sm:w-[90%] lg:w-[55%] max-w-2xl mx-auto">
                    <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all overflow-hidden">
                      <CardContent className="p-0 flex flex-col items-center text-center">
                        {promo.image && (
                          <div className="w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={promo.image}
                              alt={promoTitle || 'Promotion'}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        )}
                        {(promoTitle || promoDescription) && (
                          <div className="p-6 flex flex-col items-center text-center">
                            {promoTitle && (
                              <h3 className="text-white font-semibold text-lg mb-2">{promoTitle}</h3>
                            )}
                            {promoDescription && (
                              <p className="text-slate-300 text-sm whitespace-pre-wrap">{promoDescription}</p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
