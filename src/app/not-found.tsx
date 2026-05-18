"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="dark min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-emerald-400 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-slate-300 mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button variant="gradient" size="lg" asChild>
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
