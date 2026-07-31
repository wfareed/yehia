import "server-only"
import crypto from "crypto"
import { readJson, writeJson } from "./data-store"

interface AdminRecord {
  username: string
  passwordHash: string // format: "salt:hash" (hex)
}

function hashPassword(password: string, salt: string = crypto.randomBytes(16).toString("hex")): string {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":")
  if (!salt || !hash) return false
  const hashBuffer = Buffer.from(hash, "hex")
  const candidate = crypto.scryptSync(password, salt, 64)
  if (candidate.length !== hashBuffer.length) return false
  return crypto.timingSafeEqual(candidate, hashBuffer)
}

function getAdmins(): AdminRecord[] {
  const defaultUsername = process.env.ADMIN_DEFAULT_USERNAME || "admin"
  const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "ChangeMe123!"
  return readJson<AdminRecord[]>("admins", [
    { username: defaultUsername, passwordHash: hashPassword(defaultPassword) },
  ])
}

function saveAdmins(admins: AdminRecord[]) {
  writeJson("admins", admins)
}

export function verifyCredentials(username: string, password: string): boolean {
  const admins = getAdmins()
  const admin = admins.find((a) => a.username.toLowerCase() === username.toLowerCase())
  if (!admin) return false
  return verifyPassword(password, admin.passwordHash)
}

export function changePassword(username: string, currentPassword: string, newPassword: string): boolean {
  const admins = getAdmins()
  const idx = admins.findIndex((a) => a.username.toLowerCase() === username.toLowerCase())
  if (idx === -1) return false
  if (!verifyPassword(currentPassword, admins[idx].passwordHash)) return false
  admins[idx] = { ...admins[idx], passwordHash: hashPassword(newPassword) }
  saveAdmins(admins)
  return true
}
