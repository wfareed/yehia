"use client"

import React from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, ArrowRight, Clock } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function BlogPage() {
  const { t, language } = useLanguage()

  const posts = language === 'ar' ? [
    {
      title: "أفضل 10 منح للطلاب الدوليين في 2024",
      excerpt: "اكتشف أكثر المنح الممولة بالكامل للطلاب الذين يرغبون في الدراسة في الخارج هذا العام.",
      date: "15 ديسمبر 2024",
      readTime: "5 دقائق قراءة",
      category: "منح",
      image: "🎓",
    },
    {
      title: "كيفية كتابة بيان الغرض الفائز",
      excerpt: "نصائح خبراء في صياغة بيان شخصي مقنع سيساعدك على التميز في طلبات الجامعة.",
      date: "10 ديسمبر 2024",
      readTime: "7 دقائق قراءة",
      category: "القبول",
      image: "✍️",
    },
    {
      title: "حياة الطالب في المملكة المتحدة: ماذا تتوقع",
      excerpt: "دليل شامل للعيش والدراسة في المملكة المتحدة كطالب دولي.",
      date: "5 ديسمبر 2024",
      readTime: "6 دقائق قراءة",
      category: "حياة الطالب",
      image: "🇬🇧",
    },
    {
      title: "IELTS مقابل TOEFL: أي اختبار يجب أن تأخذه؟",
      excerpt: "مقارنة بين اختباري إتقان اللغة الإنجليزية الأكثر شعبية ومساعدتك في تحديد أيهما مناسب لك.",
      date: "28 نوفمبر 2024",
      readTime: "8 دقائق قراءة",
      category: "التحضير للاختبار",
      image: "📝",
    },
    {
      title: "دليل شامل لطلبات تأشيرة الطالب",
      excerpt: "دليل خطوة بخطوة للتنقل في عملية طلب التأشيرة لأشهر وجهات الدراسة.",
      date: "20 نوفمبر 2024",
      readTime: "10 دقائق قراءة",
      category: "التأشيرة",
      image: "🛂",
    },
    {
      title: "نصائح الميزانية للطلاب الدوليين",
      excerpt: "نصائح عملية لإدارة أموالك أثناء الدراسة في الخارج، من السكن إلى النفقات اليومية.",
      date: "15 نوفمبر 2024",
      readTime: "6 دقائق قراءة",
      category: "المالية",
      image: "💰",
    },
  ] : [
    {
      title: "Top 10 Scholarships for International Students in 2024",
      excerpt: "Discover the most prestigious fully-funded scholarships available for students looking to study abroad this year.",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Scholarships",
      image: "🎓",
    },
    {
      title: "How to Write a Winning Statement of Purpose",
      excerpt: "Expert tips on crafting a compelling personal statement that will help you stand out in university applications.",
      date: "Dec 10, 2024",
      readTime: "7 min read",
      category: "Admissions",
      image: "✍️",
    },
    {
      title: "Student Life in the UK: What to Expect",
      excerpt: "A comprehensive guide to living and studying in the United Kingdom as an international student.",
      date: "Dec 5, 2024",
      readTime: "6 min read",
      category: "Student Life",
      image: "🇬🇧",
    },
    {
      title: "IELTS vs TOEFL: Which Test Should You Take?",
      excerpt: "Comparing the two most popular English proficiency tests and helping you decide which one is right for you.",
      date: "Nov 28, 2024",
      readTime: "8 min read",
      category: "Test Prep",
      image: "📝",
    },
    {
      title: "Complete Guide to Student Visa Applications",
      excerpt: "Step-by-step guide to navigating the visa application process for the most popular study destinations.",
      date: "Nov 20, 2024",
      readTime: "10 min read",
      category: "Visa",
      image: "🛂",
    },
    {
      title: "Budgeting Tips for International Students",
      excerpt: "Practical advice on managing your finances while studying abroad, from accommodation to daily expenses.",
      date: "Nov 15, 2024",
      readTime: "6 min read",
      category: "Finance",
      image: "💰",
    },
  ]

  return (
    <div className="dark">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">BLOG</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{language === 'ar' ? 'الأخبار والمقالات' : 'News & Articles'}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              {language === 'ar' ? 'أحدث الرؤى والنصائح والأدلة للطلاب الذين يخططون للدراسة في الخارج.' : 'Latest insights, tips, and guides for students planning to study abroad.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-emerald-900/50 to-teal-900/50 flex items-center justify-center rounded-t-lg">
                      <span className="text-5xl">{post.image}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-xs text-emerald-400 font-medium bg-emerald-900/30 px-2 py-1 rounded">{post.category}</span>
                        <div className="flex items-center space-x-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-emerald-400 transition-colors">{post.title}</h3>
                      <p className="text-slate-300 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs text-slate-400">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                        <span className="text-emerald-400 text-sm group-hover:underline">{t.common.readMore} →</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 to-teal-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">{language === 'ar' ? 'اشترك في نشرتنا الإخبارية' : 'Subscribe to Our Newsletter'}</h2>
            <p className="text-emerald-200 mb-8 max-w-xl mx-auto">
              {language === 'ar' ? 'احصل على أحدث أخبار الدراسة في الخارج وتحديثات المنح ونصائح الخبراء في بريدك الوارد.' : 'Get the latest study abroad news, scholarship updates, and expert tips delivered to your inbox.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-900">
                {language === 'ar' ? 'اشترك' : 'Subscribe'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
