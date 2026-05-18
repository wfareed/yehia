"use client"

import React from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Award, Calendar, DollarSign, MapPin, ArrowRight, CheckCircle, Clock } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ScholarshipsPage() {
  const { t } = useLanguage()

  const scholarships = [
    {
      name: "Chevening Scholarship",
      country: "United Kingdom",
      flag: "ًں‡¬ًں‡§",
      value: "Full Tuition + Living Costs",
      deadline: "November 2024",
      eligibility: ["2+ years work experience", "Bachelor's degree", "Return to home country for 2 years"],
      description: "UK government's global scholarship programme for outstanding emerging leaders.",
      featured: true,
    },
    {
      name: "Fulbright Program",
      country: "United States",
      flag: "ًں‡؛ًں‡¸",
      value: "Full Tuition + Stipend",
      deadline: "October 2024",
      eligibility: ["Bachelor's degree", "Strong academic record", "Leadership qualities"],
      description: "International educational exchange program sponsored by the US government.",
      featured: true,
    },
    {
      name: "DAAD Scholarship",
      country: "Germany",
      flag: "ًں‡©ًں‡ھ",
      value: "â‚¬1,200/month + Tuition",
      deadline: "September 2024",
      eligibility: ["Bachelor's degree", "Good academic record", "Language proficiency"],
      description: "German Academic Exchange Service scholarships for international students.",
      featured: true,
    },
    {
      name: "Australia Awards",
      country: "Australia",
      flag: "ًں‡¦ًں‡؛",
      value: "Full Tuition + Living + Travel",
      deadline: "April 2025",
      eligibility: ["From eligible countries", "Meet academic requirements", "English proficiency"],
      description: "International scholarships funded by the Australian Government.",
      featured: false,
    },
    {
      name: "Commonwealth Scholarship",
      country: "United Kingdom",
      flag: "ًں‡¬ًں‡§",
      value: "Full Tuition + Airfare + Stipend",
      deadline: "December 2024",
      eligibility: ["Commonwealth citizen", "First degree", "Cannot self-fund studies"],
      description: "For students from Commonwealth countries to study in the UK.",
      featured: false,
    },
    {
      name: "Vanier Canada Graduate",
      country: "Canada",
      flag: "ًں‡¨ًں‡¦",
      value: "CAD 50,000/year for 3 years",
      deadline: "November 2024",
      eligibility: ["Doctoral students", "Academic excellence", "Research potential"],
      description: "Canada's most prestigious graduate scholarship for doctoral students.",
      featured: false,
    },
    {
      name: "Erasmus Mundus",
      country: "Europe",
      flag: "ًں‡ھًں‡؛",
      value: "â‚¬1,400/month + Tuition",
      deadline: "January 2025",
      eligibility: ["Bachelor's degree", "English proficiency", "No prior EU master's degree"],
      description: "EU-funded joint master's degree scholarships across European universities.",
      featured: false,
    },
    {
      name: "King Abdullah Scholarship",
      country: "Saudi Arabia",
      flag: "ًں‡¸ًں‡¦",
      value: "Full Coverage",
      deadline: "Varies",
      eligibility: ["Saudi nationals", "Meet academic criteria", "Health requirements"],
      description: "Full scholarship for Saudi students to study at top universities worldwide.",
      featured: false,
    },
  ]

  return (
    <div className="dark">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">SCHOLARSHIPS</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.nav.scholarships}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Discover fully-funded and partial scholarships to help fund your international education journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-12 bg-gradient-to-r from-emerald-900 to-teal-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Featured Scholarships Available Now</h2>
            <p className="text-emerald-200 mb-6">Don&apos;t miss these prestigious fully-funded scholarship opportunities</p>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-900" asChild>
              <Link href="/contact">Get Scholarship Guidance <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Scholarships Grid */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarships.map((scholarship, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`h-full bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all ${scholarship.featured ? 'ring-1 ring-emerald-500' : ''}`}>
                  {scholarship.featured && (
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-medium px-4 py-1 text-center">
                      FEATURED SCHOLARSHIP
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">{scholarship.flag}</span>
                          <span className="text-sm text-slate-400">{scholarship.country}</span>
                        </div>
                        <CardTitle className="text-white text-xl">{scholarship.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-sm mb-4">{scholarship.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm font-medium">{scholarship.value}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-orange-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">Deadline: {scholarship.deadline}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-white text-sm font-semibold mb-2">Eligibility:</h4>
                      <ul className="space-y-1">
                        {scholarship.eligibility.map((item, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle className="h-3 w-3 text-emerald-400 mt-1 flex-shrink-0" />
                            <span className="text-slate-400 text-xs">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="gradient" size="sm" className="w-full" asChild>
                      <Link href="/contact">Apply for Guidance <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Need Help Finding the Right Scholarship?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Our team will assess your profile and match you with the most suitable scholarship opportunities.
            </p>
            <Button variant="gradient" size="lg" asChild>
              <Link href="/contact">{t.hero.freeConsultation}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
