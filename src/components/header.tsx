"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe, Moon, Sun, Phone } from 'lucide-react'
import Logo from '@/components/logo'
import { useTheme } from 'next-themes'
import { navSeed, NavLink } from '@/lib/content-types'

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [headerLinks, setHeaderLinks] = useState<NavLink[]>(navSeed.headerLinks)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    fetch('/api/content/nav')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.headerLinks) setHeaderLinks(data.headerLinks)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  const navItems = headerLinks.map((link) => ({
    href: link.href,
    label: language === 'ar' ? link.label_ar : link.label_en,
  }))

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  if (!mounted) return null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-emerald-900/50'
          : 'bg-gradient-to-b from-slate-900/80 to-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size={96} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
                  isActive(item.href)
                    ? 'text-emerald-400 bg-emerald-900/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden xl:flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-slate-300 hover:text-white px-3 py-2 rounded-md hover:bg-slate-700/50 transition-colors text-sm"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-slate-300 hover:text-white rounded-md hover:bg-slate-700/50 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Button variant="gradient" size="sm" asChild>
              <Link href="/contact">
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                {t.hero.freeConsultation}
              </Link>
            </Button>
          </div>

          {/* Mobile Right Side */}
          <div className="xl:hidden flex items-center space-x-1">
            <button
              onClick={toggleLanguage}
              className="text-slate-300 hover:text-white px-2 py-1.5 rounded text-xs font-medium hover:bg-slate-700/50 transition-colors"
            >
              {language === 'en' ? 'AR' : 'EN'}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-slate-300 hover:text-white rounded hover:bg-slate-700/50 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded hover:bg-slate-700/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pb-4 border-t border-slate-700 pt-4 bg-slate-900/98 rounded-b-xl">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'text-emerald-400 bg-emerald-900/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 px-4">
                <Button variant="gradient" asChild className="w-full">
                  <Link href="/contact">{t.hero.freeConsultation}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
