import "server-only"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function filePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`)
}

/**
 * Reads a JSON data file from /data. If it does not exist yet, it is
 * created with `defaultValue` so the site always has content to render.
 */
export function readJson<T>(name: string, defaultValue: T): T {
  ensureDataDir()
  const file = filePath(name)
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaultValue, null, 2), "utf-8")
    return defaultValue
  }
  try {
    const raw = fs.readFileSync(file, "utf-8")
    return JSON.parse(raw) as T
  } catch {
    return defaultValue
  }
}

export function writeJson<T>(name: string, value: T): void {
  ensureDataDir()
  fs.writeFileSync(filePath(name), JSON.stringify(value, null, 2), "utf-8")
}
