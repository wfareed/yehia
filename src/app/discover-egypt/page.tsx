"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, Landmark, Ship, Sparkles, Waves, Church, Palmtree, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function DiscoverEgyptPage() {
  const { language } = useLanguage()
  const ar = language === 'ar'

  const brochures = [
    {
      title: ar ? 'دليل البرامج التعليمية والسياحية في مصر' : 'Egypt Educational & Tourism Programs Guide',
      description: ar ? 'تعرف على البرامج التعليمية والزيارات الثقافية والأنشطة السياحية المتاحة للطلاب.' : 'Explore educational programs, cultural visits, and tourism activities available for students.',
      href: '/brochures/egypt-educational-tourism-guide.pdf',
    },
    {
      title: ar ? 'دليل معسكرات المغامرة في مصر' : 'Egypt Adventure Camps Brochure',
      description: ar ? 'اكتشف الرحلات والمعسكرات والأنشطة الترفيهية في أشهر وجهات مصر.' : 'Discover trips, camps, and recreational activities across Egypt’s most famous destinations.',
      href: '/brochures/egypt-adventure-camps-brochure.pdf',
    },
  ]

  const tourismHighlights = [
    {
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
      icon: <Landmark className="h-8 w-8 text-amber-400" />,
      title: ar ? 'الأهرامات وأبو الهول' : 'Pyramids & Sphinx',
      description: ar ? 'زيارة أهرامات الجيزة وأبو الهول تمنح الطلاب تجربة مباشرة مع واحدة من أعظم عجائب التاريخ.' : 'A visit to the Giza Pyramids and Sphinx gives students a direct encounter with one of history’s greatest wonders.',
    },
    {
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=80',
      icon: <Building2 className="h-8 w-8 text-emerald-400" />,
      title: ar ? 'المتحف المصري الكبير' : 'Grand Egyptian Museum',
      description: ar ? 'وجهة عالمية تعرض كنوز الحضارة المصرية القديمة، بما في ذلك مجموعات توت عنخ آمون.' : 'A world-class destination showcasing the treasures of ancient Egyptian civilization, including Tutankhamun collections.',
    },
    {
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/MS_Mirage_1_Nile_cruise.JPG?width=1200',
      icon: <Ship className="h-8 w-8 text-sky-400" />,
      title: ar ? 'رحلات النيل' : 'Nile Cruise',
      description: ar ? 'رحلات نهرية بين الأقصر وأسوان تجمع بين المناظر الطبيعية والمعابد التاريخية على ضفاف النيل.' : 'River cruises between Luxor and Aswan combine scenic landscapes with historic temples along the Nile banks.',
    },
    {
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Karnak_Temple,_Ram_Road.JPG?width=1200',
      icon: <Sparkles className="h-8 w-8 text-orange-400" />,
      title: ar ? 'المعابد الشهيرة' : 'Famous Temples',
      description: ar ? 'اكتشف معابد الكرنك والأقصر وفيلة وأبو سمبل، حيث تروي النقوش قصص الملوك والحضارة.' : 'Discover Karnak, Luxor, Philae, and Abu Simbel temples, where inscriptions tell stories of kings and civilization.',
    },
    {
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      icon: <Palmtree className="h-8 w-8 text-green-400" />,
      title: ar ? 'السياحة العلاجية' : 'Healing Tourism',
      description: ar ? 'تتميز مصر بمناطق علاجية طبيعية مثل الواحات وسيوة وسفاجا، المعروفة بالمناخ والرمال والمياه المعدنية.' : 'Egypt features natural wellness destinations such as oases, Siwa, and Safaga, known for climate, sands, and mineral waters.',
    },
    {
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mosque_of_Muhammad_Ali,_Cairo2026_16.jpg?width=1200',
      icon: <Church className="h-8 w-8 text-purple-400" />,
      title: ar ? 'السياحة الدينية' : 'Religious Tourism',
      description: ar ? 'مسار العائلة المقدسة، المساجد التاريخية، والأديرة القديمة تجعل مصر مركزاً مهماً للسياحة الدينية.' : 'The Holy Family route, historic mosques, and ancient monasteries make Egypt an important religious tourism hub.',
    },
    {
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80',
      icon: <Waves className="h-8 w-8 text-cyan-400" />,
      title: ar ? 'السياحة الساحلية' : 'Coastal Tourism',
      description: ar ? 'استمتع بسواحل البحر الأحمر والمتوسط، من شرم الشيخ والغردقة إلى الساحل الشمالي والإسكندرية.' : 'Enjoy the Red Sea and Mediterranean coasts, from Sharm El Sheikh and Hurghada to the North Coast and Alexandria.',
    },
  ]

  return (
    <div className="dark">
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_25%_20%,#f59e0b,transparent_28%),radial-gradient(circle_at_75%_30%,#14b8a6,transparent_28%)]" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-amber-400 text-sm uppercase tracking-widest mb-4">{ar ? 'اكتشف مصر' : 'DISCOVER EGYPT'}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {ar ? 'معسكرات تعليمية و تجريبية عالمية' : 'GLOBAL EDUCATIONAL & ADVENTURE CAMPS'}
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              {ar
                ? 'استكشف مصر كوجهة تجمع بين التعليم، التاريخ، المغامرة، والسياحة الثقافية والترفيهية.'
                : 'Explore Egypt as a destination that combines education, history, adventure, cultural tourism, and recreation.'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-3">{ar ? 'فيديو تعريفي' : 'Introductory Video'}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {ar ? 'شاهد تجربة Vision Edge في مصر' : 'Watch the Vision Edge Egypt Experience'}
            </h2>
            <p className="text-slate-300 leading-relaxed max-w-3xl mx-auto">
              {ar
                ? 'شاهد لمحة عن المعسكرات، الرحلات، والزيارات التعليمية التي تقدمها Vision Edge في مصر.'
                : 'Watch a preview of the camps, tours, and educational visits Vision Edge offers in Egypt.'}
            </p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex justify-center overflow-hidden">
          <video
            className="aspect-video w-[63vw] max-w-none rounded-2xl border border-slate-700 bg-slate-950 object-contain"
            controls
            loop
            playsInline
            preload="metadata"
            poster="/logo.png"
          >
            <source src="/videos/discover-egypt-intro.mp4" type="video/mp4" />
            {ar ? 'متصفحك لا يدعم تشغيل الفيديو.' : 'Your browser does not support the video tag.'}
          </video>
        </motion.div>
      </section>

      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-3">{ar ? 'البروشورات' : 'Brochures'}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{ar ? 'حمّل بروشورات البرامج' : 'Download Program Brochures'}</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {ar ? 'حمّل البروشورات لمعرفة تفاصيل البرامج والرحلات والمعسكرات.' : 'Download the brochures to learn more about programs, tours, and camps.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {brochures.map((brochure) => (
              <Card key={brochure.href} className="bg-slate-900 border-slate-700 hover:border-emerald-500 transition-all">
                <CardHeader>
                  <CardTitle className="text-white">{brochure.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm mb-6">{brochure.description}</p>
                  <Button variant="gradient" asChild>
                    <Link href={brochure.href} download>
                      <Download className="h-4 w-4 mr-2" />
                      {ar ? 'تحميل البروشور' : 'Download Brochure'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm uppercase tracking-widest mb-3">{ar ? 'السياحة في مصر' : 'Tourism in Egypt'}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{ar ? 'وجهات وتجارب مصرية مميزة' : 'Iconic Egyptian Destinations & Experiences'}</h2>
            <p className="text-slate-300 max-w-3xl mx-auto">
              {ar
                ? 'تجمع مصر بين التاريخ العريق، الطبيعة الساحرة، السياحة العلاجية والدينية، والشواطئ الخلابة.'
                : 'Egypt combines ancient history, stunning nature, healing and religious tourism, and beautiful coastal destinations.'}
            </p>
          </div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourismHighlights.map((item) => (
              <motion.div key={item.title} variants={itemVariants}>
                <Card className="h-full overflow-hidden bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 rounded-xl bg-slate-950/80 p-3 backdrop-blur-sm">
                      {item.icon}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
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
