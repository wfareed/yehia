"use client"

import React from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { GraduationCap, Globe, Users, Award, MapPin, Star, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import FAQ from '@/components/faq'

export default function Home() {
  const { t, dir } = useLanguage()

  const services = [
    {
      icon: <GraduationCap className="h-8 w-8 text-emerald-400" />,
      title: t.services.admissions,
      description: t.services.admissionsDesc,
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-400" />,
      title: t.services.logistical,
      description: t.services.logisticalDesc,
    },
    {
      icon: <Users className="h-8 w-8 text-green-400" />,
      title: t.services.guidance,
      description: t.services.guidanceDesc,
    },
    {
      icon: <Award className="h-8 w-8 text-orange-400" />,
      title: t.services.support,
      description: t.services.supportDesc,
    },
  ]

  const countries = [
    { name: "USA",          code: "us", universities: "500+", color: "from-blue-900/80 to-red-900/60" },
    { name: "UK",           code: "gb", universities: "300+", color: "from-blue-900/80 to-red-800/60" },
    { name: "Australia",    code: "au", universities: "200+", color: "from-sky-900/80 to-yellow-900/50" },
    { name: "Canada",       code: "ca", universities: "250+", color: "from-red-900/80 to-slate-800/60" },
    { name: "Germany",      code: "de", universities: "150+", color: "from-yellow-900/60 to-slate-800/80" },
    { name: "Ireland",      code: "ie", universities: "50+",  color: "from-green-900/70 to-orange-900/50" },
    { name: "Malaysia",     code: "my", universities: "100+", color: "from-red-900/70 to-blue-900/50" },
    { name: "UAE",          code: "ae", universities: "80+",  color: "from-green-900/70 to-slate-800/60" },
    { name: "New Zealand",  code: "nz", universities: "30+",  color: "from-sky-900/70 to-slate-800/60" },
    { name: "South Africa", code: "za", universities: "40+",  color: "from-yellow-900/60 to-green-900/60" },
  ]

  const stats = [
    { value: "5000+", label: "Students Placed" },
    { value: "50+", label: "Partner Universities" },
    { value: "15+", label: "Countries" },
    { value: "95%", label: "Success Rate" },
  ]

  const testimonials = [
    {
      name: "Ahmed Al-Rashid",
      country: "Studying in UK",
      rating: 5,
      text: "Vision Edge made my dream of studying in the UK a reality. Their guidance throughout the application process was exceptional.",
    },
    {
      name: "Sara Hassan",
      country: "Studying in Canada",
      rating: 5,
      text: "From university selection to visa approval, Vision Edge was there every step of the way. Highly recommended!",
    },
    {
      name: "Omar Khalid",
      country: "Studying in Australia",
      rating: 5,
      text: "The team at Vision Edge provided excellent support and helped me secure a scholarship. I couldn't have done it without them.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
        
        <div className="relative container mx-auto px-4 text-center z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" className="text-lg" asChild>
                <Link href="/services">
                  {t.hero.discoverServices}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg border-white text-white hover:bg-white hover:text-slate-900" asChild>
                <Link href="/contact">
                  {t.hero.freeConsultation}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t.services.title}
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500 transition-colors">
                  <CardHeader>
                    <div className="mb-4">{service.icon}</div>
                    <CardTitle className="text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t.destinations.title}
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {t.destinations.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {countries.map((country, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href="/countries">
                  <Card className="h-full bg-slate-900 border-slate-700 hover:border-emerald-500 transition-all cursor-pointer overflow-hidden group">
                    <CardContent className="p-0">
                      {/* Flag banner */}
                      <div className={`bg-gradient-to-br ${country.color} flex items-center justify-center py-5`}>
                        <img
                          src={`https://flagcdn.com/w80/${country.code}.png`}
                          srcSet={`https://flagcdn.com/w160/${country.code}.png 2x`}
                          alt={`${country.name} flag`}
                          className="w-16 h-auto rounded shadow-md transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
                        />
                      </div>
                      {/* Info */}
                      <div className="p-4 text-center">
                        <h3 className="text-white font-semibold text-sm mb-1">{country.name}</h3>
                        <p className="text-emerald-400 text-xs font-medium">{country.universities} Universities</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {t.about.whyChooseUs}
              </h2>
              <div className="space-y-4">
                {t.about.points.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <p className="text-slate-300">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center">
                <MapPin className="h-32 w-32 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t.testimonials.title}
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card className="h-full bg-slate-900 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-white">{testimonial.name}</CardTitle>
                    <CardDescription className="text-emerald-400">
                      {testimonial.country}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{testimonial.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 to-teal-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-slate-200 text-lg mb-8 max-w-2xl mx-auto">
              Get free consultation and take the first step towards your international education dream.
            </p>
            <Button variant="outline" size="lg" className="text-lg border-white text-white hover:bg-white hover:text-emerald-900" asChild>
              <Link href="/contact">
                {t.hero.freeConsultation}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
