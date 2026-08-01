"use client"

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import Logo from '@/components/logo'
import { AboutContent } from '@/lib/content-types'
import { iconMap } from '@/lib/icon-map'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function AboutClient({ initialContent }: { initialContent: AboutContent }) {
  const { language } = useLanguage()
  const ar = language === 'ar'
  const [content, setContent] = useState<AboutContent>(initialContent)

  useEffect(() => {
    fetch('/api/content/about')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setContent(data)
      })
      .catch(() => {})
  }, [])

  const missionCards = content.valueCards.map((card) => ({
    icon: iconMap[card.icon],
    title: ar ? card.title_ar : card.title_en,
    description: ar ? card.description_ar : card.description_en,
  }))

  const timeline = content.timeline.map((item) => ({
    year: item.year,
    title: ar ? item.title_ar : item.title_en,
    description: ar ? item.description_ar : item.description_en,
  }))

  const team = content.team.map((member) => ({
    name: member.name,
    role: ar ? member.role_ar : member.role_en,
    initials: member.initials,
  }))

  const stats = content.stats.map((stat) => ({
    icon: iconMap[stat.icon],
    value: stat.value,
    label: ar ? stat.label_ar : stat.label_en,
  }))

  const whoWeAre = ar ? content.whoWeAre_ar : content.whoWeAre_en
  const description = ar ? content.description_ar : content.description_en
  const whyChooseUs = ar ? content.whyChooseUs_ar : content.whyChooseUs_en
  const points = content.points.map((p) => (ar ? p.text_ar : p.text_en))

  return (
    <div className="dark">
      {/* Hero Banner */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">ABOUT</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{whoWeAre}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{whyChooseUs}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-6">{description}</p>
                  <ul className="space-y-3">
                    {points.map((point: string, i: number) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 flex items-center justify-center min-h-[300px] border border-slate-600">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Logo size={240} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Vision Edge</h3>
                  <p className="text-emerald-400 mt-2">{ar ? 'جسرك نحو التعليم العالمي' : 'Your Gateway to World-Class Education'}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">MISSION • VISION • VALUES</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {missionCards.map((c) => c.title).join(' • ')}
            </h2>
            <p className="text-slate-300 text-lg mt-4 max-w-2xl mx-auto">
              {ar ? 'كل ما نؤمن به ويحرك عملنا — موضح بوضوح وإيجاز.' : 'Everything we believe in and that drives our work — articulated clearly and concisely.'}
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionCards.map((card, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-slate-900 border-slate-700 hover:border-emerald-500 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-3">
                      <card.icon className="h-8 w-8 text-emerald-400" />
                    </div>
                    <CardTitle className="text-white text-lg">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-sm">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 to-teal-900">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="text-white mb-3 flex justify-center">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-emerald-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">{ar ? 'مسيرتنا' : 'OUR JOURNEY'}</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">{ar ? 'خط زمني للتجربة' : 'Experience Timeline'}</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-8"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-2xl font-bold text-emerald-400">{item.year}</div>
                </div>
                <div className="flex-grow">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">{ar ? 'فريقنا' : 'OUR TEAM'}</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">{ar ? ' meet the experts' : 'Meet the Experts'}</h2>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-slate-900 border-slate-700 hover:border-emerald-500 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">{member.initials}</span>
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">{member.name || 'Team Member'}</h3>
                    <p className="text-emerald-400 text-xs">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 to-teal-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {ar ? 'هل أنت مستعد لبدء رحلتك؟' : 'Ready to Start Your Journey?'}
            </h2>
            <p className="text-emerald-200 text-lg mb-8 max-w-2xl mx-auto">
              {ar ? 'احصل على استشارة مجانية واتخذ الخطوة الأولى نحو حلمك في التعليم الدولي.' : 'Get free consultation and take the first step towards your international education dream.'}
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-emerald-900 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              {ar ? 'تواصل معنا' : 'Contact Us'}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
