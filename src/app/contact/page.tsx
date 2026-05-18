"use client"

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
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
                    <Button type="submit" variant="gradient" size="lg" className="w-full">
                      {t.contact.send}
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
                        <p className="text-slate-300 text-sm">Riyadh, Saudi Arabia<br />King Fahd Road, Office 301</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-emerald-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{t.contact.phoneLabel}</h4>
                        <p className="text-slate-300 text-sm">+966 XX XXX XXXX</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-emerald-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{t.contact.emailLabel}</h4>
                        <p className="text-slate-300 text-sm">info@visionedge.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-emerald-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Working Hours</h4>
                        <p className="text-slate-300 text-sm">Sun - Thu: 9:00 AM - 6:00 PM</p>
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
                    <a href="https://wa.me/966XXXXXXXXX" target="_blank" rel="noopener noreferrer">
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
                    <a href="#" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-emerald-900/50 transition-colors">
                      <Facebook className="h-5 w-5 text-slate-300" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-emerald-900/50 transition-colors">
                      <Twitter className="h-5 w-5 text-slate-300" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-emerald-900/50 transition-colors">
                      <Instagram className="h-5 w-5 text-slate-300" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-emerald-900/50 transition-colors">
                      <Linkedin className="h-5 w-5 text-slate-300" />
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
          <div className="bg-slate-900 rounded-2xl overflow-hidden h-96 flex items-center justify-center border border-slate-700">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">Our Location</h3>
              <p className="text-slate-300">Riyadh, Saudi Arabia</p>
              <p className="text-slate-400 text-sm mt-4">
                (Google Maps integration placeholder — add your API key)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
