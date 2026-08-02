import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { UPLOADS_DIR } from "@/lib/uploads-store"

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
}

const ALLOWED_VIDEO_TYPES: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/ogg": "ogv",
}

const MAX_IMAGE_SIZE = 8 * 1024 * 1024 // 8MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024 // 100MB

export async function POST(req: NextRequest) {
  const formData = await req.formData().catch(() => null)
  const file = formData?.get("file")

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 })
  }

  const isImage = Object.prototype.hasOwnProperty.call(ALLOWED_IMAGE_TYPES, file.type)
  const isVideo = Object.prototype.hasOwnProperty.call(ALLOWED_VIDEO_TYPES, file.type)

  if (!isImage && !isVideo) {
    return NextResponse.json(
      { error: "Unsupported file type. Allowed: JPG, PNG, WEBP, GIF, MP4, WEBM, OGG." },
      { status: 400 }
    )
  }

  const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: `File is too large. Max size is ${Math.round(maxSize / (1024 * 1024))}MB.` },
      { status: 400 }
    )
  }

  const extension = isImage ? ALLOWED_IMAGE_TYPES[file.type] : ALLOWED_VIDEO_TYPES[file.type]
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${extension}`

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true })
  }

  const bytes = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(path.join(UPLOADS_DIR, filename), bytes)

  return NextResponse.json({ url: `/api/uploads/${filename}`, type: isImage ? "image" : "video" })
}
