import { NextRequest, NextResponse } from "next/server"
import { readJson } from "@/lib/data-store"
import { contactSeed } from "@/lib/content-types"
import { sendContactEmail } from "@/lib/mailer"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const name = typeof body?.name === "string" ? body.name.trim() : ""
  const email = typeof body?.email === "string" ? body.email.trim() : ""
  const phone = typeof body?.phone === "string" ? body.phone.trim() : ""
  const message = typeof body?.message === "string" ? body.message.trim() : ""

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 })
  }

  const contact = readJson("contact", contactSeed)

  try {
    await sendContactEmail({ name, email, phone, message }, contact.email)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Failed to send contact email:", err)
    return NextResponse.json(
      { error: "Sorry, we couldn't send your message right now. Please try again later or contact us directly." },
      { status: 500 }
    )
  }
}
