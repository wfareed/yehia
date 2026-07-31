import { readJson } from "@/lib/data-store"
import { blogSeed, BlogContent } from "@/lib/content-types"
import BlogClient from "./blog-client"

export const dynamic = 'force-dynamic'

export default function BlogPage() {
  const content = readJson<BlogContent>("blog", blogSeed)
  return <BlogClient initialContent={content} />
}
