import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { UPLOADS_DIR } from "@/lib/uploads-store"

export const dynamic = "force-dynamic"

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogv": "video/ogg",
  ".pdf": "application/pdf",
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params

  // Prevent path traversal - only allow simple filenames.
  if (!filename || filename.includes("/") || filename.includes("\\") || filename.includes("..")) {
    return NextResponse.json({ error: "Invalid filename." }, { status: 400 })
  }

  const filePath = path.join(UPLOADS_DIR, filename)
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 })
  }

  const ext = path.extname(filename).toLowerCase()
  const contentType = CONTENT_TYPES[ext] || "application/octet-stream"
  const data = fs.readFileSync(filePath)

  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
