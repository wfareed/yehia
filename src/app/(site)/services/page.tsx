"use client"

import React from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  GraduationCap, Home, BookOpen, Headphones,
  MapPin, ArrowRight, CheckCircle, Clock
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ServicesPage() {
  const { t, language } = useLanguage()
  const ar = language === 'ar'

  const services = [
    {
      icon: <GraduationCap className="h-8 w-8 text-emerald-400" />,
      title: ar ? "استشارات الدراسة في الخارج" : "Study Abroad Consultation",
      description: ar ? "استشارة شخصية لمساعدتك في اختيار الدولة والجامعة والبرنامج المناسب بناءً على خلفيتك الأكاديمية وأهدافك المهنية." : "Personalized consultation to help you choose the right country, university, and program based on your academic background and career goals.",
      features: ar ? ["تقييم الملف الأكاديمي", "مطابقة الدولة والجامعة", "توجيه اختيار البرنامج", "تحديد المسار المهني"] : ["Academic profile assessment", "Country & university matching", "Program selection guidance", "Career path alignment"],
    },
    {
      icon: <BookOpen className="h-8 w-8 text-pink-400" />,
      title: ar ? "التحضير لاختبارات اللغة" : "English Test Preparation",
      description: ar ? "موارد وإرشادات التحضير لاختبارات الكفاءة في اللغة الإنجليزية بما فيها IELTS وTOEFL وPTE." : "Preparation resources and guidance for English proficiency tests including IELTS, TOEFL, and PTE.",
      features: ar ? ["التحضير لـ IELTS", "إرشادات TOEFL", "دعم PTE", "موارد التدريب"] : ["IELTS preparation", "TOEFL guidance", "PTE support", "Practice resources"],
    },
    {
      icon: <Home className="h-8 w-8 text-teal-400" />,
      title: ar ? "المساعدة في السكن" : "Accommodation Assistance",
      description: ar ? "المساعدة في إيجاد سكن مناسب بالقرب من جامعتك، سواء في مساكن الحرم الجامعي أو الإيجارات الخاصة." : "Help finding suitable accommodation near your university, whether on-campus housing or private rentals.",
      features: ar ? ["خيارات السكن الجامعي", "البحث عن السكن الخاص", "مراجعة عقد الإيجار", "مطابقة رفقاء السكن"] : ["On-campus options", "Private housing search", "Lease review", "Roommate matching"],
    },
    {
      icon: <MapPin className="h-8 w-8 text-red-400" />,
      title: ar ? "التوجيه قبل السفر" : "Pre-Travel Orientation",
      description: ar ? "جلسات توجيهية شاملة تغطي التكيف الثقافي ونصائح السفر وما يمكن توقعه في بلدك الجديد." : "Comprehensive orientation sessions covering cultural adaptation, travel tips, and what to expect in your new country.",
      features: ar ? ["الإحاطة الثقافية", "دليل التعبئة", "فتح الحساب البنكي", "معلومات التأمين الصحي"] : ["Cultural briefing", "Packing guide", "Bank account setup", "Health insurance info"],
    },
    {
      icon: <Headphones className="h-8 w-8 text-yellow-400" />,
      title: ar ? "تنسيق الاستقبال من المطار" : "Airport Pickup Coordination",
      description: ar ? "ترتيب الاستقبال من المطار والنقل الأولي إلى مكان إقامتك لضمان وصول سلس." : "Arranging airport pickup and initial transportation to your accommodation, ensuring a smooth arrival.",
      features: ar ? ["الاستقبال في المطار", "النقل إلى السكن", "شريحة هاتف محلية", "التعريف بالمدينة"] : ["Airport meet & greet", "Transportation to housing", "Local SIM card", "City orientation"],
    },
  ]

  const process = [
    { step: 1, title: ar ? "استشارة مجانية" : "Free Consultation", description: ar ? "احجز جلسة مجانية لمناقشة أهدافك في الدراسة بالخارج." : "Book a free session to discuss your study abroad goals." },
    { step: 2, title: ar ? "تقييم الملف" : "Profile Assessment", description: ar ? "نقيّم ملفك الأكاديمي وتفضيلاتك." : "We evaluate your academic profile and preferences." },
    { step: 3, title: ar ? "التقديم والقبول" : "Application & Admission", description: ar ? "نتولى عملية التقديم بالكامل نيابةً عنك." : "We handle the entire application process." },
    { step: 4, title: ar ? "الدعم قبل المغادرة" : "Pre-Departure Support", description: ar ? "التوجيه وترتيبات السكن والسفر." : "Orientation, accommodation, and travel arrangements." },
  ]

  return (
    <div className="dark">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">SERVICES</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.services.title}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">{t.services.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-3 group-hover:bg-emerald-900/50 transition-colors">
                      {service.icon}
                    </div>
                    <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-slate-400 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">{ar ? 'كيف نعمل' : 'HOW IT WORKS'}</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">{ar ? 'خطواتنا معك' : 'Our Process'}</h2>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-slate-900 border-slate-700 text-center">
                  <CardContent className="pt-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300 text-sm">{item.description}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{ar ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}</h2>
            <p className="text-slate-200 text-lg mb-8 max-w-2xl mx-auto">
              {ar ? 'احجز استشارتك المجانية اليوم وابدأ أولى خطواتك نحو رحلتك التعليمية الدولية.' : 'Book your free consultation today and take the first step towards your international education journey.'}
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
