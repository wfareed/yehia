"use client"

import React from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Rocket, Target, Eye, Heart, Users, Globe, Award, CheckCircle, Calendar } from 'lucide-react'
import Logo from '@/components/logo'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function AboutPage() {
  const { t, language } = useLanguage()
  const ar = language === 'ar'

  const missionCards = [
    {
      icon: <Rocket className="h-8 w-8 text-pink-400" />,
      title: t.missionVisionValues.ourMessage,
      description: t.missionVisionValues.messageDesc,
    },
    {
      icon: <Target className="h-8 w-8 text-red-400" />,
      title: t.missionVisionValues.ourMission,
      description: t.missionVisionValues.missionDesc,
    },
    {
      icon: <Eye className="h-8 w-8 text-blue-400" />,
      title: t.missionVisionValues.ourVision,
      description: t.missionVisionValues.visionDesc,
    },
    {
      icon: <Heart className="h-8 w-8 text-emerald-400" />,
      title: t.missionVisionValues.ourValues,
      description: t.missionVisionValues.valuesDesc,
    },
  ]

  const timeline = [
    { year: "2018", title: ar ? "التأسيس" : "Founded", description: ar ? "تأسست Vision Edge في القاهرة، مصر." : "Vision Edge was established in Cairo, Egypt." },
    { year: "2019", title: ar ? "أول 100 طالب" : "First 100 Students", description: ar ? "نجحنا في إلحاق أول 100 طالب بجامعات دولية." : "Successfully placed our first 100 students in international universities." },
    { year: "2020", title: ar ? "التوسع العالمي" : "Global Expansion", description: ar ? "توسعنا في شراكات تشمل أكثر من 10 دول عبر 5 قارات." : "Expanded partnerships to 10+ countries across 5 continents." },
    { year: "2021", title: ar ? "التحول الرقمي" : "Digital Transformation", description: ar ? "أطلقنا منصتنا الرقمية لتسهيل طلبات الطلاب." : "Launched our digital platform for seamless student applications." },
    { year: "2022", title: ar ? "أكثر من 1000 طالب" : "1000+ Students", description: ar ? "لقد حققنا إنجازاً هاماً بتوظيف أكثر من 1000 طالب حول العالم." : "Reached milestone of placing 1000+ students worldwide." },
    { year: "2023", title: ar ? "جائزة التميز" : "Award-Winning", description: ar ? "حصلنا على لقب أفضل وكالة تعليمية في العالم العربي." : "Recognized as a top educational consultancy in the Arab world." },
    { year: "2024", title: ar ? "أكثر من 5000 طالب" : "5000+ Students", description: ar ? "أكثر من 5000 طالب تم إلحاقهم بنجاح في أكثر من 50 جامعة شريكة." : "Over 5000 students successfully placed in 50+ partner universities." },
  ]

  const team = [
    { name: ar ? "د. أحمد الفهد" : "Dr. Ahmed Al-Fahad", role: ar ? "المؤسس والرئيس التنفيذي" : "Founder & CEO", initials: "AA" },
    { name: ar ? "سارة المطيري" : "Sara Al-Mutairi", role: ar ? "رئيسة القبول" : "Head of Admissions", initials: "SA" },
    { name: ar ? "خالد الراشد" : "Khalid Al-Rashid", role: ar ? "متخصص التأشيرات" : "Visa Specialist", initials: "KR" },
    { name: ar ? "نورة الدوسري" : "Nora Al-Dosari", role: ar ? "مستشارة الطلاب" : "Student Counselor", initials: "ND" },
    { name: ar ? "عمر الشيخ" : "Omar Al-Sheikh", role: ar ? "مدير الشراكات" : "Partnerships Director", initials: "OS" },
    { name: ar ? "فاطمة الحربي" : "Fatima Al-Harbi", role: ar ? "مديرة العمليات" : "Operations Manager", initials: "FH" },
  ]

  const stats = [
    { icon: <Users className="h-8 w-8" />, value: "5000+", label: ar ? "طالب تم إلحاقه" : "Students Placed" },
    { icon: <Globe className="h-8 w-8" />, value: "15+", label: ar ? "دولة" : "Countries" },
    { icon: <Award className="h-8 w-8" />, value: "50+", label: ar ? "جامعة شريكة" : "Partner Universities" },
    { icon: <Calendar className="h-8 w-8" />, value: "6+", label: ar ? "سنوات خبرة" : "Years Experience" },
  ]

  return (
    <div className="dark">
      {/* Hero Banner */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">ABOUT</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.about.whoWeAre}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">{t.about.description}</p>
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
                  <CardTitle className="text-white text-2xl">{t.about.whyChooseUs}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-6">{t.about.description}</p>
                  <ul className="space-y-3">
                    {t.about.points.map((point: string, i: number) => (
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
              {t.missionVisionValues.ourMessage} • {t.missionVisionValues.ourMission} • {t.missionVisionValues.ourVision} • {t.missionVisionValues.ourValues}
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
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-3">{card.icon}</div>
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
                <div className="text-white mb-3 flex justify-center">{stat.icon}</div>
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
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && <div className="w-0.5 h-full bg-slate-700 mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-slate-300 mt-1">{item.description}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-white">{ar ? 'تعرف على خبرائنا' : 'Meet Our Experts'}</h2>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-slate-900 border-slate-700 hover:border-emerald-500 transition-all text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{member.initials}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-emerald-400 text-sm mt-1">{member.role}</p>
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
