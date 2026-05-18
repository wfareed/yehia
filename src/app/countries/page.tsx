"use client"

import React from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GraduationCap, DollarSign, FileText, Heart, ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function CountriesPage() {
  const { t } = useLanguage()

  const countries = [
    {
      name: "United States",
      code: "us",
      image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=600",
      universities: ["Harvard University", "MIT", "Stanford University", "UCLA"],
      tuition: "$20,000 - $60,000 / year",
      visa: "F-1 Student Visa",
      lifestyle: "Diverse campus life with world-class facilities and research opportunities.",
      advantages: ["World-renowned universities", "Diverse culture", "Extensive research funding", "OPT work opportunities"],
    },
    {
      name: "United Kingdom",
      code: "gb",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600",
      universities: ["Oxford University", "Cambridge University", "Imperial College", "UCL"],
      tuition: "آ£10,000 - آ£38,000 / year",
      visa: "Tier 4 Student Visa",
      lifestyle: "Rich history and culture with excellent public transportation.",
      advantages: ["Shorter degree programs", "Rich cultural heritage", "Post-study work visa", "Global recognition"],
    },
    {
      name: "Australia",
      code: "au",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600",
      universities: ["University of Melbourne", "ANU", "University of Sydney", "UNSW"],
      tuition: "AUD 20,000 - 45,000 / year",
      visa: "Student Visa (Subclass 500)",
      lifestyle: "Beautiful beaches, outdoor lifestyle, and welcoming multicultural society.",
      advantages: ["High quality of life", "Post-study work rights", "Multicultural society", "Strong economy"],
    },
    {
      name: "Canada",
      code: "ca",
      image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600",
      universities: ["University of Toronto", "UBC", "McGill University", "University of Waterloo"],
      tuition: "CAD 15,000 - 35,000 / year",
      visa: "Study Permit",
      lifestyle: "Safe, clean, and friendly environment with stunning natural beauty.",
      advantages: ["Affordable education", "Immigration pathways", "Safe environment", "Bilingual country"],
    },
    {
      name: "Germany",
      code: "de",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600",
      universities: ["TU Munich", "LMU Munich", "Heidelberg University", "Humboldt University"],
      tuition: "â‚¬0 - â‚¬20,000 / year (many free)",
      visa: "National Visa for Study",
      lifestyle: "Efficient public transport, rich culture, and central European location.",
      advantages: ["Free/low tuition at public universities", "Strong economy", "Central European location", "Post-study job search visa"],
    },
    {
      name: "Ireland",
      code: "ie",
      image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=600",
      universities: ["Trinity College Dublin", "UCD", "University of Galway", "DCU"],
      tuition: "â‚¬10,000 - â‚¬25,000 / year",
      visa: "Study Visa / Stamp 2",
      lifestyle: "Friendly people, beautiful landscapes, and vibrant arts scene.",
      advantages: ["English-speaking", "Tech hub of Europe", "Post-study work permit", "Welcoming culture"],
    },
    {
      name: "Malaysia",
      code: "my",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600",
      universities: ["University of Malaya", "Monash Malaysia", "University of Nottingham Malaysia", "Taylor's University"],
      tuition: "MYR 15,000 - 40,000 / year",
      visa: "Student Pass",
      lifestyle: "Tropical climate, diverse food culture, and affordable living.",
      advantages: ["Affordable living costs", "Multicultural", "English widely spoken", "Growing education hub"],
    },
    {
      name: "UAE (Dubai)",
      code: "ae",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
      universities: ["NYU Abu Dhabi", "AUS", "University of Dubai", "Heriot-Watt Dubai"],
      tuition: "AED 40,000 - 120,000 / year",
      visa: "Student Residence Visa",
      lifestyle: "Modern infrastructure, safe environment, and international community.",
      advantages: ["No income tax", "Modern facilities", "Strategic location", "Growing job market"],
    },
    {
      name: "South Africa",
      code: "za",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600",
      universities: ["University of Cape Town", "Wits University", "Stellenbosch University", "University of Pretoria"],
      tuition: "ZAR 40,000 - 120,000 / year",
      visa: "Study Visa",
      lifestyle: "Stunning nature, diverse wildlife, and vibrant culture.",
      advantages: ["Affordable education", "English-speaking", "Beautiful scenery", "Rich cultural experience"],
    },
  ]

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
            {countries.map((country, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-slate-800 border-slate-700 overflow-hidden hover:border-emerald-500 transition-colors">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Image */}
                    <div className="relative h-64 md:h-auto bg-gradient-to-br from-emerald-900 to-teal-900 flex items-center justify-center">
                      <div className="text-center px-4">
                        <img
                          src={`https://flagcdn.com/w160/${country.code}.png`}
                          srcSet={`https://flagcdn.com/w320/${country.code}.png 2x`}
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
