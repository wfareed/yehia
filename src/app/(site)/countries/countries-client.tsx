"use client"

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GraduationCap, DollarSign, FileText, Heart, ArrowRight } from 'lucide-react'
import { CountriesPageContent } from '@/lib/content-types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function CountriesClient({ initialContent }: { initialContent: CountriesPageContent }) {
  const { t } = useLanguage()
  const [content, setContent] = useState<CountriesPageContent>(initialContent)

  useEffect(() => {
    fetch('/api/content/countriesPage')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setContent(data))
      .catch(() => {})
  }, [])

  const countries = content.countries

  return (
    <div className="dark">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">DESTINATIONS</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.destinations.title}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">{t.destinations.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-12">
            {countries.map((country) => (
              <motion.div key={country.id} variants={itemVariants}>
                <Card className="bg-slate-800 border-slate-700 overflow-hidden hover:border-emerald-500 transition-colors">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Image */}
                    <div className="relative h-64 md:h-auto bg-gradient-to-br from-emerald-900 to-teal-900 flex items-center justify-center">
                      <div className="text-center px-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={country.flag || `https://flagcdn.com/w320/${country.code}.png`}
                          alt={`${country.name} flag`}
                          className="w-28 h-auto rounded-lg shadow-xl mx-auto mb-4 border-2 border-white/20"
                        />
                        <h3 className="text-2xl font-bold text-white">{country.name}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 p-6 md:p-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <GraduationCap className="h-5 w-5 text-emerald-400" />
                            <h4 className="text-white font-semibold">Popular Universities</h4>
                          </div>
                          <ul className="space-y-1 mb-4">
                            {country.universities.map((uni, i) => (
                              <li key={i} className="text-slate-300 text-sm">• {uni}</li>
                            ))}
                          </ul>

                          <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="h-5 w-5 text-green-400" />
                            <h4 className="text-white font-semibold">Tuition Overview</h4>
                          </div>
                          <p className="text-slate-300 text-sm mb-4">{country.tuition}</p>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <FileText className="h-5 w-5 text-blue-400" />
                            <h4 className="text-white font-semibold">Visa Info</h4>
                          </div>
                          <p className="text-slate-300 text-sm mb-4">{country.visa}</p>

                          <div className="flex items-center space-x-2 mb-2">
                            <Heart className="h-5 w-5 text-red-400" />
                            <h4 className="text-white font-semibold">Study Advantages</h4>
                          </div>
                          <ul className="space-y-1">
                            {country.advantages.map((adv, i) => (
                              <li key={i} className="text-slate-300 text-sm flex items-start space-x-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>{adv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-700">
                        <p className="text-slate-400 text-sm mb-4">{country.lifestyle}</p>
                        <Button variant="gradient" size="sm" asChild>
                          <Link href="/contact">
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
