import "server-only"
import nodemailer from "nodemailer"

export interface ContactSubmission {
  name: string
  email: string
  phone?: string
  message: string
}

function getTransporter() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables (see .env.example)."
    )
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports (STARTTLS)
    auth: { user, pass },
  })
}

export async function sendContactEmail(submission: ContactSubmission, recipient: string) {
  const transporter = getTransporter()
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!

  await transporter.sendMail({
    from: `"Vision Edge Website" <${from}>`,
    to: recipient,
    replyTo: submission.email,
    subject: `New contact form message from ${submission.name}`,
    text: [
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      submission.phone ? `Phone: ${submission.phone}` : null,
      "",
      "Message:",
      submission.message,
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
      ${submission.phone ? `<p><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(submission.message).replace(/\n/g, "<br/>")}</p>
    `,
  })
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
