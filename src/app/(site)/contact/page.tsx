"use client"

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, Linkedin } from 'lucide-react'
import { contactSeed, ContactContent } from '@/lib/content-types'
import { XIcon } from '@/components/icons/x-icon'

export default function ContactPage() {
  const { t, language } = useLanguage()
  const ar = language === 'ar'
  const [contact, setContact] = useState<ContactContent>(contactSeed)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetch('/api/content/contact')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setContact(data))
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        return
      }
      setStatus('sent')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="dark">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">CONTACT</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.contact.title}</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">{t.contact.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-slate-300 mb-2 block">{t.contact.name}</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="bg-slate-900 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-300 mb-2 block">{t.contact.email}</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="bg-slate-900 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 mb-2 block">{t.contact.phone}</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+966 XX XXX XXXX"
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 mb-2 block">{t.contact.message}</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your study abroad goals..."
                        rows={5}
                        required
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    {status === 'sent' && (
                      <p className="text-emerald-400 text-sm">
                        {ar ? 'شكراً لك! سنتواصل معك قريباً.' : 'Thank you! We will get back to you soon.'}
                      </p>
                    )}
                    {status === 'error' && <p className="text-red-400 text-sm">{errorMessage}</p>}
                    <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={status === 'sending'}>
                      {status === 'sending' ? (ar ? 'جاري الإرسال...' : 'Sending...') : t.contact.send}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-emerald-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{t.contact.address}</h4>
                        <p className="text-slate-300 text-sm">{ar ? contact.address_ar : contact.address_en}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-emerald-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{t.contact.phoneLabel}</h4>
                        <p className="text-slate-300 text-sm">{contact.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-emerald-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{t.contact.emailLabel}</h4>
                        <p className="text-slate-300 text-sm">{contact.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-emerald-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{ar ? 'ساعات العمل' : 'Working Hours'}</h4>
                        <p className="text-slate-300 text-sm">{ar ? contact.working_hours_ar : contact.working_hours_en}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp CTA */}
              <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700">
                <CardContent className="pt-6 text-center">
                  <MessageCircle className="h-10 w-10 text-green-400 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Chat on WhatsApp</h4>
                  <p className="text-green-200 text-sm mb-4">Get instant responses from our team</p>
                  <Button
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-green-900 w-full"
                    asChild
                  >
                    <a href={`https://wa.me/${contact.whatsapp_number}`} target="_blank" rel="noopener noreferrer">
                      Start Chat
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href={contact.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                      <Facebook className="h-5 w-5 text-white" />
                    </a>
                    <a href={contact.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                      <XIcon className="h-5 w-5 text-white" />
                    </a>
                    <a href={contact.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                      <Instagram className="h-5 w-5 text-white" />
                    </a>
                    <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0A66C2] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                      <Linkedin className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-slate-800">
        <div className="container mx-auto px-4">
          <h3 className="text-white text-xl font-semibold mb-4 text-center">{ar ? 'موقعنا' : 'Our Location'}</h3>
          <div className="rounded-2xl overflow-hidden h-96 border border-slate-700">
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
        </div>
      </section>
    </div>
  )
}
