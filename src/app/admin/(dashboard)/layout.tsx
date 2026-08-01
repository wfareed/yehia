"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, HelpCircle, Link2, KeyRound, LogOut, ExternalLink, Users, Home, Mail, Newspaper, Handshake, Tag } from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/home", label: "Home Page", icon: Home },
  { href: "/admin/about", label: "About Us Page", icon: Users },
  { href: "/admin/contact", label: "Contact Page", icon: Mail },
  { href: "/admin/blog", label: "Blog / News", icon: Newspaper },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/promotions", label: "Promotions", icon: Tag },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/links", label: "Header & Footer Links", icon: Link2 },
  { href: "/admin/settings", label: "Change Password", icon: KeyRound },
]

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="dark min-h-screen bg-slate-900 flex">
      <aside className="w-64 shrink-0 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-700">
          <p className="text-white font-semibold">Vision Edge Admin</p>
          <p className="text-slate-400 text-xs mt-0.5">Content Management</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-900/40 text-emerald-400"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-slate-700 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            View Site
          </Link>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-2.5 px-3 text-slate-300 hover:bg-slate-700/50 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}
