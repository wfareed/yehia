"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { DiscoverEgyptContent, discoverEgyptSeed } from '@/lib/content-types'
import { iconMap } from '@/lib/icon-map'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function DiscoverEgyptClient({ initialContent }: { initialContent: DiscoverEgyptContent }) {
  const { language } = useLanguage()
  const ar = language === 'ar'
  const [content, setContent] = useState<DiscoverEgyptContent>(initialContent)

  useEffect(() => {
    fetch('/api/content/discoverEgypt')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setContent(data))
      .catch(() => {})
  }, [])

  const title = (en: string, ar: string) => (language === 'ar' ? ar : en)

  return (
    <div className="dark">
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_25%_20%,#f59e0b,transparent_28%),radial-gradient(circle_at_75%_30%,#14b8a6,transparent_28%)]" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-amber-400 text-sm uppercase tracking-widest mb-4">{ar ? 'اكتشف مصر' : 'DISCOVER EGYPT'}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {ar ? 'معسكرات تعليمية و تجريبية عالمية' : 'GLOBAL EDUCATIONAL & ADVENTURE CAMPS'}
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              {ar
                ? 'استكشف مصر كوجهة تجمع بين التعليم، التاريخ، المغامرة، والسياحة الثقافية والترفيهية.'
                : 'Explore Egypt as a destination that combines education, history, adventure, cultural tourism, and recreation.'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-3">{ar ? 'فيديو تعريفي' : 'Introductory Video'}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {ar ? 'شاهد تجربة Vision Edge في مصر' : 'Watch the Vision Edge Egypt Experience'}
            </h2>
            <p className="text-slate-300 leading-relaxed max-w-3xl mx-auto">
              {ar
                ? 'شاهد لمحة عن المعسكرات، الرحلات، والزيارات التعليمية التي تقدمها Vision Edge في مصر.'
                : 'Watch a preview of the camps, tours, and educational visits Vision Edge offers in Egypt.'}
            </p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex justify-center overflow-hidden">
          <video
            className="aspect-video w-[63vw] max-w-none rounded-2xl border border-slate-700 bg-slate-950 object-contain"
            controls
            loop
            playsInline
            preload="metadata"
            poster="/logo.png"
          >
            <source src="/videos/discover-egypt-intro.mp4" type="video/mp4" />
            {ar ? 'متصفحك لا يدعم تشغيل الفيديو.' : 'Your browser does not support the video tag.'}
          </video>
        </motion.div>
      </section>

      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-3">{ar ? 'البروشورات' : 'Brochures'}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{ar ? 'حمّل بروشورات البرامج' : 'Download Program Brochures'}</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {ar ? 'حمّل البروشورات لمعرفة تفاصيل البرامج والرحلات والمعسكرات.' : 'Download the brochures to learn more about programs, tours, and camps.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.brochures.map((brochure) => (
              <Card key={brochure.id} className="bg-slate-900 border-slate-700 hover:border-emerald-500 transition-all">
                <CardHeader>
                  <CardTitle className="text-white">{title(brochure.title_en, brochure.title_ar)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm mb-6">{title(brochure.description_en, brochure.description_ar)}</p>
                  <Button variant="gradient" asChild>
                    <Link href={brochure.href} download>
                      <Download className="h-4 w-4 mr-2" />
                      {ar ? 'تحميل البروشور' : 'Download Brochure'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm uppercase tracking-widest mb-3">{ar ? 'السياحة في مصر' : 'Tourism in Egypt'}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{ar ? 'وجهات وتجارب مصرية مميزة' : 'Iconic Egyptian Destinations & Experiences'}</h2>
            <p className="text-slate-300 max-w-3xl mx-auto">
              {ar
                ? 'تجمع مصر بين التاريخ العريق، الطبيعة الساحرة، السياحة العلاجية والدينية، والشواطئ الخلابة.'
                : 'Egypt combines ancient history, stunning nature, healing and religious tourism, and beautiful coastal destinations.'}
            </p>
          </div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.destinations.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || iconMap.MapPin
              return (
                <motion.div key={item.id} variants={itemVariants}>
                  <Card className="h-full overflow-hidden bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={title(item.title_en, item.title_ar)}
                        onError={(event) => {
                          event.currentTarget.style.display = 'none'
                        }}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-xl bg-slate-950/80 p-3 backdrop-blur-sm">
                        <Icon className="h-8 w-8 text-amber-400" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-white">{title(item.title_en, item.title_ar)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 text-sm leading-relaxed">{title(item.description_en, item.description_ar)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
