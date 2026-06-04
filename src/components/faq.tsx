"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'

export default function FAQ() {
  const { t, language } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isRTL = language === 'ar'

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">{t.faq.title}</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {t.faq.items.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-white font-medium ${isRTL ? 'pl-4' : 'pr-4'}`}>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-emerald-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-slate-300">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
