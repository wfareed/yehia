"use client"

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Handshake } from 'lucide-react'
import { PartnersContent } from '@/lib/content-types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function PartnersClient({ initialContent }: { initialContent: PartnersContent }) {
  const { language } = useLanguage()
  const ar = language === 'ar'
  const [content, setContent] = useState<PartnersContent>(initialContent)

  useEffect(() => {
    fetch('/api/content/partners')
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
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">PARTNERS</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">{subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          {content.partners.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <Handshake className="h-12 w-12 text-slate-600 mb-4" />
              <p className="text-slate-400 text-lg">
                {ar ? 'لا يوجد شركاء متاحون حالياً' : 'No partners available yet'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {content.partners.map((partner) => {
                const card = (
                  <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all group">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4 h-full">
                      <div className="w-full h-24 flex items-center justify-center">
                        {partner.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-h-24 max-w-full object-contain"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
                            <Handshake className="h-8 w-8 text-emerald-400" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-white font-medium text-sm group-hover:text-emerald-400 transition-colors">
                        {partner.name}
                      </h3>
                    </CardContent>
                  </Card>
                )
                return (
                  <motion.div key={partner.id} variants={itemVariants}>
                    {partner.website ? (
                      <a href={partner.website} target="_blank" rel="noopener noreferrer">
                        {card}
                      </a>
                    ) : (
                      card
                    )}
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
