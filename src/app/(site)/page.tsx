"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Star, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import FAQ from '@/components/faq'
import { homeSeed, HomeContent, aboutSeed, AboutContent } from '@/lib/content-types'
import { iconMap } from '@/lib/icon-map'

const COUNTRY_GRADIENTS = [
  "from-blue-900/80 to-red-900/60",
  "from-blue-900/80 to-red-800/60",
  "from-sky-900/80 to-yellow-900/50",
  "from-red-900/80 to-slate-800/60",
  "from-yellow-900/60 to-slate-800/80",
  "from-green-900/70 to-orange-900/50",
  "from-red-900/70 to-blue-900/50",
  "from-green-900/70 to-slate-800/60",
  "from-sky-900/70 to-slate-800/60",
  "from-yellow-900/60 to-green-900/60",
]

export default function Home() {
  const { t, language } = useLanguage()
  const ar = language === 'ar'
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const [content, setContent] = useState<HomeContent>(homeSeed)
  const [about, setAbout] = useState<AboutContent>(aboutSeed)

  useEffect(() => {
    fetch('/api/content/home')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setContent(data))
      .catch(() => {})
    fetch('/api/content/about')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setAbout(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {})
      }
    }
    tryPlay()
    video.addEventListener('loadeddata', tryPlay)
    return () => video.removeEventListener('loadeddata', tryPlay)
  }, [])

  const services = content.services.map((service) => ({
    icon: iconMap[service.icon],
    title: ar ? service.title_ar : service.title_en,
    description: ar ? service.description_ar : service.description_en,
  }))

  const countries = content.countries.map((country, index) => ({
    name: country.name,
    code: country.code,
    universities: country.universities,
    color: COUNTRY_GRADIENTS[index % COUNTRY_GRADIENTS.length],
  }))

  const stats = content.stats.map((stat) => ({
    value: stat.value,
    label: ar ? stat.label_ar : stat.label_en,
  }))

  const testimonials = content.testimonials

  const whyChooseUsTitle = ar ? about.whyChooseUs_ar : about.whyChooseUs_en
  const whyChooseUsPoints = about.points.map((p) => (ar ? p.text_ar : p.text_en))

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
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover brightness-125"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/25 to-transparent" />
        
        <div className="relative container mx-auto px-4 z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-left rtl:text-right"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {ar ? content.hero_title_ar : content.hero_title_en}
            </h1>
            <p className="text-base md:text-lg text-slate-200 mb-8 max-w-xl drop-shadow-md">
              {ar ? content.hero_subtitle_ar : content.hero_subtitle_en}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Button variant="gradient" size="lg" className="text-lg" asChild>
                <Link href="/discover-egypt">
                  {t.hero.egyptsCamp}
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
              {ar ? content.services_title_ar : content.services_title_en}
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {ar ? content.services_subtitle_ar : content.services_subtitle_en}
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
                    <div className="mb-4">
                      <service.icon className="h-8 w-8 text-emerald-400" />
                    </div>
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
              {ar ? content.destinations_title_ar : content.destinations_title_en}
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {ar ? content.destinations_subtitle_ar : content.destinations_subtitle_en}
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
                {whyChooseUsTitle}
              </h2>
              <div className="space-y-4">
                {whyChooseUsPoints.map((point, index) => (
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
              <div className="aspect-square rounded-2xl overflow-hidden border border-slate-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2295.8038358887266!2d30.971933233695395!3d30.041744550203507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145859930ff8e55f%3A0xc9b4b7f2391bae73!2zNTMg2KfZhNmB2YrYsdmI2LIsIFNlY29uZCBBbCBTaGVpa2ggWmF5ZWQsIEdpemEgR292ZXJub3JhdGUgMzI0MTMyMw!5e1!3m2!1sen!2seg!4v1785612065637!5m2!1sen!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Vision Edge Location"
                />
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
              {ar ? content.testimonials_title_ar : content.testimonials_title_en}
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {ar ? content.testimonials_subtitle_ar : content.testimonials_subtitle_en}
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
              {ar ? content.cta_title_ar : content.cta_title_en}
            </h2>
            <p className="text-slate-200 text-lg mb-8 max-w-2xl mx-auto">
              {ar ? content.cta_description_ar : content.cta_description_en}
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
