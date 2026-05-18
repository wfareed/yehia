"use client"

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Search, MapPin, Star, DollarSign, GraduationCap, ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function UniversitiesPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')

  const universities = [
    { name: "Harvard University", country: "USA", ranking: "#1", tuition: "$54,000/year", programs: "500+", scholarships: true, flag: "ًں‡؛ًں‡¸" },
    { name: "University of Oxford", country: "UK", ranking: "#2", tuition: "آ£28,000/year", programs: "350+", scholarships: true, flag: "ًں‡¬ًں‡§" },
    { name: "MIT", country: "USA", ranking: "#3", tuition: "$57,000/year", programs: "400+", scholarships: true, flag: "ًں‡؛ًں‡¸" },
    { name: "University of Cambridge", country: "UK", ranking: "#4", tuition: "آ£25,000/year", programs: "300+", scholarships: true, flag: "ًں‡¬ًں‡§" },
    { name: "Stanford University", country: "USA", ranking: "#5", tuition: "$56,000/year", programs: "450+", scholarships: true, flag: "ًں‡؛ًں‡¸" },
    { name: "University of Melbourne", country: "Australia", ranking: "#14", tuition: "AUD 35,000/year", programs: "250+", scholarships: true, flag: "ًں‡¦ًں‡؛" },
    { name: "University of Toronto", country: "Canada", ranking: "#18", tuition: "CAD 45,000/year", programs: "300+", scholarships: true, flag: "ًں‡¨ًں‡¦" },
    { name: "TU Munich", country: "Germany", ranking: "#30", tuition: "â‚¬500/semester", programs: "180+", scholarships: true, flag: "ًں‡©ًں‡ھ" },
    { name: "Trinity College Dublin", country: "Ireland", ranking: "#81", tuition: "â‚¬18,000/year", programs: "150+", scholarships: true, flag: "ًں‡®ًں‡ھ" },
    { name: "University of Malaya", country: "Malaysia", ranking: "#65", tuition: "MYR 20,000/year", programs: "200+", scholarships: true, flag: "ًں‡²ًں‡¾" },
    { name: "NYU Abu Dhabi", country: "UAE", ranking: "#Top 50", tuition: "AED 150,000/year", programs: "80+", scholarships: true, flag: "ًں‡¦ًں‡ھ" },
    { name: "University of Cape Town", country: "South Africa", ranking: "#160", tuition: "ZAR 60,000/year", programs: "100+", scholarships: true, flag: "ًں‡؟ًں‡¦" },
    { name: "UCLA", country: "USA", ranking: "#20", tuition: "$44,000/year", programs: "350+", scholarships: true, flag: "ًں‡؛ًں‡¸" },
    { name: "Imperial College London", country: "UK", ranking: "#6", tuition: "آ£35,000/year", programs: "200+", scholarships: true, flag: "ًں‡¬ًں‡§" },
    { name: "UBC", country: "Canada", ranking: "#34", tuition: "CAD 40,000/year", programs: "280+", scholarships: true, flag: "ًں‡¨ًں‡¦" },
    { name: "University of Sydney", country: "Australia", ranking: "#19", tuition: "AUD 42,000/year", programs: "270+", scholarships: true, flag: "ًں‡¦ًں‡؛" },
  ]

  const countryFilters = ['all', 'USA', 'UK', 'Australia', 'Canada', 'Germany', 'Ireland', 'Malaysia', 'UAE', 'South Africa']

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCountry = selectedCountry === 'all' || uni.country === selectedCountry
    return matchesSearch && matchesCountry
  })

  return (
    <div className="dark">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">UNIVERSITIES</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.nav.universities}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Explore our partner universities across the globe and find the perfect fit for your academic journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-slate-800 border-b border-slate-700 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {countryFilters.map((country) => (
                <Button
                  key={country}
                  variant={selectedCountry === country ? "gradient" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCountry(country)}
                  className={selectedCountry !== country ? "border-slate-600 text-slate-300" : ""}
                >
                  {country === 'all' ? 'All' : country}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-12 bg-slate-900">
        <div className="container mx-auto px-4">
          <p className="text-slate-400 mb-6">{filteredUniversities.length} universities found</p>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((uni, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">{uni.flag}</span>
                          <span className="text-xs text-slate-400">{uni.country}</span>
                        </div>
                        <CardTitle className="text-white text-lg">{uni.name}</CardTitle>
                      </div>
                      <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded">
                        {uni.ranking}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="h-4 w-4 text-green-400" />
                        <span className="text-slate-300">{uni.tuition}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <GraduationCap className="h-4 w-4 text-blue-400" />
                        <span className="text-slate-300">{uni.programs} Programs</span>
                      </div>
                      {uni.scholarships && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-slate-300">Scholarships Available</span>
                        </div>
                      )}
                    </div>
                    <Button variant="gradient" size="sm" className="w-full" asChild>
                      <Link href="/contact">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
