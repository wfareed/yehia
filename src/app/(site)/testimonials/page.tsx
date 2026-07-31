"use client"

import React from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Star, Quote, Play } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function TestimonialsPage() {
  const { t, language } = useLanguage()
  const ar = language === 'ar'

  const testimonials = [
    {
      name: ar ? "أحمد الرشيد" : "Ahmed Al-Rashid",
      country: ar ? "يدرس في المملكة المتحدة" : "Studying in UK",
      university: ar ? "جامعة مانشستر" : "University of Manchester",
      rating: 5,
      text: ar ? "حوّلت Vision Edge حلمي بالدراسة في المملكة المتحدة إلى حقيقة. كان توجيههم خلال عملية التقديم استثنائيًا. لقد تولوا كل شيء من اختيار الجامعة إلى إجراءات التأشيرة بسلاسة." : "Vision Edge made my dream of studying in the UK a reality. Their guidance throughout the application process was exceptional. They handled everything from university selection to visa processing seamlessly.",
      initials: "AR",
    },
    {
      name: ar ? "سارة حسن" : "Sara Hassan",
      country: ar ? "تدرس في كندا" : "Studying in Canada",
      university: ar ? "جامعة تورنتو" : "University of Toronto",
      rating: 5,
      text: ar ? "من اختيار الجامعة إلى الموافقة على التأشيرة، كانت Vision Edge معي في كل خطوة. الفريق داعم ومحترف للغاية. ما كنت لأنجح بدونهم!" : "From university selection to visa approval, Vision Edge was there every step of the way. The team is incredibly supportive and professional. I couldn't have done it without them!",
      initials: "SH",
    },
    {
      name: ar ? "عمر خالد" : "Omar Khalid",
      country: ar ? "يدرس في أستراليا" : "Studying in Australia",
      university: ar ? "جامعة ملبورن" : "University of Melbourne",
      rating: 5,
      text: ar ? "قدم فريق Vision Edge دعمًا ممتازًا وساعدني في الحصول على منحة دراسية. معرفتهم بنظام التعليم الأسترالي مبهرة." : "The team at Vision Edge provided excellent support and helped me secure a scholarship. Their knowledge of the Australian education system is impressive.",
      initials: "OK",
    },
    {
      name: ar ? "فاطمة الدوسري" : "Fatima Al-Dosari",
      country: ar ? "تدرس في أيرلندا" : "Studying in Ireland",
      university: ar ? "كلية ترينيتي دبلن" : "Trinity College Dublin",
      rating: 5,
      text: ar ? "كنت أشعر بالارتباك من عملية الدراسة بالخارج حتى وجدت Vision Edge. لقد بسّطوا كل شيء وأدخلوني جامعة أحلامي في دبلن." : "I was overwhelmed by the study abroad process until I found Vision Edge. They simplified everything and got me into my dream university in Dublin.",
      initials: "FD",
    },
    {
      name: ar ? "محمد الشهري" : "Mohammed Al-Shehri",
      country: ar ? "يدرس في الولايات المتحدة" : "Studying in USA",
      university: "UCLA",
      rating: 5,
      text: ar ? "احترافيون ومخلصون وجديرون بالثقة. ساعدتني Vision Edge في تجاوز عملية التقديم المعقدة للجامعات الأمريكية، وأنا الآن في UCLA!" : "Professional, dedicated, and trustworthy. Vision Edge helped me navigate the complex US university application process and I'm now at UCLA!",
      initials: "MS",
    },
    {
      name: ar ? "نورة الحربي" : "Noura Al-Harbi",
      country: ar ? "تدرس في ألمانيا" : "Studying in Germany",
      university: ar ? "جامعة ميونخ التقنية" : "TU Munich",
      rating: 5,
      text: ar ? "بدا الحصول على تعليم مجاني في ألمانيا مستحيلًا حتى أرشدتني Vision Edge خلال العملية. خبرتهم في القبول الجامعي الألماني متميزة." : "Getting a free education in Germany seemed impossible until Vision Edge guided me through the process. Their expertise in German university admissions is outstanding.",
      initials: "NH",
    },
    {
      name: ar ? "خالد المطيري" : "Khalid Al-Mutairi",
      country: ar ? "يدرس في ماليزيا" : "Studying in Malaysia",
      university: ar ? "جامعة مالايا" : "University of Malaya",
      rating: 5,
      text: ar ? "جعلت Vision Edge الدراسة بالخارج في متناولي. وجدوا لي البرنامج المثالي في ماليزيا مع دعم رائع للمنح." : "Vision Edge made studying abroad affordable for me. They found me the perfect program in Malaysia with great scholarship support.",
      initials: "KM",
    },
    {
      name: ar ? "ريم القحطاني" : "Reem Al-Qahtani",
      country: ar ? "تدرس في الإمارات" : "Studying in UAE",
      university: ar ? "جامعة نيويورك أبوظبي" : "NYU Abu Dhabi",
      rating: 5,
      text: ar ? "بذل الفريق جهدًا استثنائيًا لمساعدتي على الالتحاق بجامعة نيويورك أبوظبي. إخلاصهم لنجاح الطلاب رائع حقًا." : "The team went above and beyond to help me get into NYU Abu Dhabi. Their dedication to student success is truly remarkable.",
      initials: "RQ",
    },
  ]

  const videoTestimonials = [
    { name: ar ? "رحلة أحمد إلى أوكسفورد" : "Ahmed's Journey to Oxford", duration: "3:45" },
    { name: ar ? "تجربة سارة في كندا" : "Sara's Experience in Canada", duration: "4:12" },
    { name: ar ? "حياة عمر في ملبورن" : "Omar's Life in Melbourne", duration: "5:20" },
  ]

  const stats = [
    { value: "4.9/5", label: ar ? "متوسط التقييم" : "Average Rating" },
    { value: "500+", label: ar ? "المراجعات" : "Reviews" },
    { value: "98%", label: ar ? "يوصون بنا" : "Recommend Us" },
    { value: "95%", label: ar ? "معدل النجاح" : "Success Rate" },
  ]

  return (
    <div className="dark">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">{ar ? 'المراجعات' : 'REVIEWS'}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.testimonials.title}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">{t.testimonials.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">{stat.value}</div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Written Testimonials */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{ar ? 'قصص نجاح الطلاب' : 'Student Success Stories'}</h2>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{testimonial.initials}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{testimonial.name}</h3>
                        <p className="text-emerald-400 text-sm">{testimonial.university}</p>
                        <p className="text-slate-400 text-xs">{testimonial.country}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="relative">
                      <Quote className="h-6 w-6 text-emerald-400/30 absolute -top-1 -left-1" />
                      <p className="text-slate-300 text-sm pl-4">{testimonial.text}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{ar ? 'شهادات بالفيديو' : 'Video Testimonials'}</h2>
            <p className="text-slate-300 mt-4">{ar ? 'شاهد طلابنا يشاركون تجاربهم' : 'Watch our students share their experiences'}</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTestimonials.map((video, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-slate-900 border-slate-700 hover:border-emerald-500 transition-colors cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-emerald-900 to-teal-900 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium">{video.name}</h3>
                    </div>
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
