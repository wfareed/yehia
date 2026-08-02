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

const ALLOWED_DOCUMENT_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
}

const MAX_IMAGE_SIZE = 8 * 1024 * 1024 // 8MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024 // 100MB
const MAX_DOCUMENT_SIZE = 32 * 1024 * 1024 // 32MB

export async function POST(req: NextRequest) {
  const formData = await req.formData().catch(() => null)
  const file = formData?.get("file")

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 })
  }

  const isImage = Object.prototype.hasOwnProperty.call(ALLOWED_IMAGE_TYPES, file.type)
  const isVideo = Object.prototype.hasOwnProperty.call(ALLOWED_VIDEO_TYPES, file.type)
  const isDocument = Object.prototype.hasOwnProperty.call(ALLOWED_DOCUMENT_TYPES, file.type)

  if (!isImage && !isVideo && !isDocument) {
    return NextResponse.json(
      { error: "Unsupported file type. Allowed: JPG, PNG, WEBP, GIF, PDF, MP4, WEBM, OGG." },
      { status: 400 }
    )
  }

  let maxSize = MAX_IMAGE_SIZE
  if (isVideo) maxSize = MAX_VIDEO_SIZE
  if (isDocument) maxSize = MAX_DOCUMENT_SIZE
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: `File is too large. Max size is ${Math.round(maxSize / (1024 * 1024))}MB.` },
      { status: 400 }
    )
  }

  let extension = ALLOWED_IMAGE_TYPES[file.type]
  if (isVideo) extension = ALLOWED_VIDEO_TYPES[file.type]
  if (isDocument) extension = ALLOWED_DOCUMENT_TYPES[file.type]
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${extension}`

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true })
  }

  const bytes = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(path.join(UPLOADS_DIR, filename), bytes)

  let fileType: string = "image"
  if (isVideo) fileType = "video"
  if (isDocument) fileType = "document"

  return NextResponse.json({ url: `/api/uploads/${filename}`, type: fileType })
}
