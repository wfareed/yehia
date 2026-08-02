"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp, Send } from 'lucide-react'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { navSeed, NavLink, contactSeed, ContactContent } from '@/lib/content-types'
import { XIcon } from '@/components/icons/x-icon'

export default function Footer() {
  const { t, dir, language } = useLanguage()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [footerLinks, setFooterLinks] = useState<NavLink[]>(navSeed.footerLinks)
  const [contact, setContact] = useState<ContactContent>(contactSeed)

  useEffect(() => {
    fetch('/api/content/nav')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.footerLinks) setFooterLinks(data.footerLinks)
      })
      .catch(() => {})
    fetch('/api/content/contact')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setContact(data))
      .catch(() => {})
  }, [])

  const address = language === 'ar' ? contact.address_ar : contact.address_en

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo size={112} />
            </div>
            <p className="text-slate-300 text-sm mb-4">
              {t.about.description}
            </p>
            <div className="flex space-x-3">
              <a
                href={contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Facebook className="h-4 w-4 text-white" />
              </a>
              <a
                href={contact.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <XIcon className="h-4 w-4 text-white" />
              </a>
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <a
                href={contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Linkedin className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks
                .filter((link) => link.href !== '/countries')
                .map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                      {language === 'ar' ? link.label_ar : link.label_en}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Scholarship Guidance
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Accommodation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Pre-Travel Orientation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.contact.office}</h3>
            <ul className="space-y-3">
              <li className={`flex items-start ${dir === 'rtl' ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">
                  {address}
                </span>
              </li>
              <li className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{contact.phone}</span>
              </li>
              <li className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-semibold text-lg">Subscribe to Our Newsletter</h3>
                <p className="text-slate-400 text-sm">Stay updated with scholarships, tips & news</p>
              </div>
              {subscribed ? (
                <p className="text-green-400 font-medium">âœ“ Thank you for subscribing!</p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 md:w-64 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg transition-all flex items-center gap-2 text-sm font-medium"
                  >
                    <Send className="h-4 w-4" />
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Vision Edge. All rights reserved.
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="mt-4 md:mt-0 text-slate-300 hover:text-white"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  )
}
