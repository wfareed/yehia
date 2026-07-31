import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HelpCircle, Link2, KeyRound, Users, Home, Mail, Newspaper } from "lucide-react"

const sections = [
  {
    href: "/admin/home",
    icon: Home,
    title: "Home Page",
    description: "Edit the hero, stats, services, study destinations, testimonials, and call-to-action sections.",
  },
  {
    href: "/admin/about",
    icon: Users,
    title: "About Us Page",
    description: "Edit the hero text, why-choose-us points, mission/vision/values cards, stats, timeline, and team.",
  },
  {
    href: "/admin/contact",
    icon: Mail,
    title: "Contact Page",
    description: "Edit address, phone, email, working hours, WhatsApp number, and social links.",
  },
  {
    href: "/admin/blog",
    icon: Newspaper,
    title: "Blog / News",
    description: "Add, edit, publish/unpublish, or remove blog posts and news articles.",
  },
  {
    href: "/admin/faq",
    icon: HelpCircle,
    title: "FAQ",
    description: "Add, edit, or remove the questions shown in the homepage FAQ section (English & Arabic).",
  },
  {
    href: "/admin/links",
    icon: Link2,
    title: "Header & Footer Links",
    description: "Add or remove navigation links in the header menu and footer quick links.",
  },
  {
    href: "/admin/settings",
    icon: KeyRound,
    title: "Change Password",
    description: "Update your admin login password.",
  },
]

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-slate-400 mb-8">
        Manage editable content across the site. More sections (Services, About Us, Brochures, etc.)
        will appear here as they are added.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link key={section.href} href={section.href}>
              <Card className="h-full bg-slate-800 border-slate-700 hover:border-emerald-500 transition-colors">
                <CardHeader>
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-2">
                    <Icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <CardTitle className="text-white text-lg">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
