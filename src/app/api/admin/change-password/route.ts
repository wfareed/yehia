import { NextRequest, NextResponse } from "next/server"
import { changePassword } from "@/lib/auth"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session"

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  const session = await verifySessionToken(token)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const currentPassword = body?.currentPassword
  const newPassword = body?.newPassword

  if (!currentPassword || !newPassword || String(newPassword).length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters." },
      { status: 400 }
    )
  }

  const ok = changePassword(session.username, currentPassword, newPassword)
  if (!ok) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
