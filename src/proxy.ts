import { NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session"

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isPublic = pathname === "/admin/login" || pathname === "/api/admin/login"

  if (isPublic) {
    return NextResponse.next()
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value
  const session = await verifySessionToken(token)

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const loginUrl = new URL("/admin/login", req.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
