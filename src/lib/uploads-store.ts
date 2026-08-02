import "server-only"
import os from "os"
import path from "path"

// Allow uploaded media (images/videos) to be stored outside the deployed
// project folder (set UPLOADS_DIR to an absolute path on the server). This
// is required on hosts like Hostinger where a git-based deploy fully
// re-extracts the project directory on every deploy, which would otherwise
// wipe out admin-uploaded files regardless of .gitignore. Falls back to
// ./public/uploads for local development and ~/vision-edge-data/uploads on
// the server.
const DEFAULT_UPLOADS_DIR = process.cwd().startsWith(os.homedir())
  ? path.join(os.homedir(), "vision-edge-data", "uploads")
  : path.join(process.cwd(), "public", "uploads")

export const UPLOADS_DIR = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : DEFAULT_UPLOADS_DIR

console.log(`[uploads-store] Using UPLOADS_DIR: ${UPLOADS_DIR}`)
