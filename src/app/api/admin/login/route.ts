import { NextRequest, NextResponse } from "next/server"
import { verifyCredentials } from "@/lib/auth"
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/session"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const username = body?.username
  const password = body?.password

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 })
  }

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 })
  }

  const token = await createSessionToken(username)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
  return res
}
