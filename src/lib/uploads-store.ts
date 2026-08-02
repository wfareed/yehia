import "server-only"
import path from "path"

// Allow uploaded media (images/videos) to be stored outside the deployed
// project folder (set UPLOADS_DIR to an absolute path on the server). This
// is required on hosts like Hostinger where a git-based deploy fully
// re-extracts the project directory on every deploy, which would otherwise
// wipe out admin-uploaded files regardless of .gitignore. Falls back to
// ./public/uploads for local development.
export const UPLOADS_DIR = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.join(process.cwd(), "public", "uploads")
