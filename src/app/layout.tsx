import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: "EduBridge - Your Gateway to World-Class Education",
  description: "EduBridge is a premier educational consultancy helping students achieve their dreams of studying abroad. Free consultations, university admissions, visa guidance, and full pre-travel support.",
  keywords: ["study abroad", "scholarship", "university admission", "educational consultancy", "international education"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cairo.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
