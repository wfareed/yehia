"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Is the consultation really free?",
    answer: "Yes! We provide completely free educational consultations. Our service is free for students from the initial consultation through to acceptance and enrollment.",
  },
  {
    question: "Which countries do you help students study in?",
    answer: "We help students study in the USA, UK, Australia, Canada, Germany, Ireland, Malaysia, UAE, South Africa, and more. We have partnerships with universities in over 15 countries.",
  },
  {
    question: "How long does the application process take?",
    answer: "The timeline varies by country and university, but typically the process takes 2-4 months from initial consultation to receiving an offer letter. Visa processing adds an additional 2-6 weeks.",
  },
  {
    question: "Do you help with visa applications?",
    answer: "Yes, we provide comprehensive visa guidance including document preparation, application form filling, and interview coaching. Our success rate for visa approvals is over 95%.",
  },
  {
    question: "Can you help me find scholarships?",
    answer: "Absolutely! We assess your profile and match you with suitable scholarship opportunities. We've helped hundreds of students secure partial and full scholarships.",
  },
  {
    question: "What support do you provide after arrival?",
    answer: "We arrange airport pickup, help with accommodation, assist with bank account setup, and provide ongoing support throughout your study period. We're available 24/7 for our students.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
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
