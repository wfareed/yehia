// Lightweight signed-session helper built on the Web Crypto API so it works
// in both the Node.js runtime (route handlers) and the Edge runtime
// (middleware) without any extra dependencies.

export const SESSION_COOKIE = "admin_session"
const SESSION_TTL_SECONDS = 60 * 60 * 12 // 12 hours

const encoder = new TextEncoder()
const decoder = new TextDecoder()

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    // Falls back to a fixed dev secret so local development keeps working,
    // but this MUST be set to a long random value in production (see .env.example).
    return "dev-only-insecure-secret-change-me"
  }
  return secret
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = ""
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function base64UrlDecode(str: string): Uint8Array {
  const normalized = str.replace(/-/g, "+").replace(/_/g, "/")
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  )
}

interface SessionPayload {
  u: string
  exp: number
}

export async function createSessionToken(username: string): Promise<string> {
  const payload: SessionPayload = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }
  const payloadB64 = base64UrlEncode(encoder.encode(JSON.stringify(payload)))
  const key = await getKey()
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64))
  const sigB64 = base64UrlEncode(new Uint8Array(signature))
  return `${payloadB64}.${sigB64}`
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<{ username: string } | null> {
  if (!token) return null
  const [payloadB64, sigB64] = token.split(".")
  if (!payloadB64 || !sigB64) return null

  try {
    const key = await getKey()
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlDecode(sigB64) as BufferSource,
      encoder.encode(payloadB64)
    )
    if (!valid) return null

    const payload = JSON.parse(decoder.decode(base64UrlDecode(payloadB64))) as SessionPayload
    if (payload.exp < Math.floor(Date.now() / 1000)) return null
    return { username: payload.u }
  } catch {
    return null
  }
}

export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_SECONDS
