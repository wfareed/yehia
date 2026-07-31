// Converts common video URLs (YouTube, Vimeo) into embeddable iframe URLs.
// Returns null if the URL doesn't match a known provider, in which case the
// caller should render it as a direct <video> file instead.

export function getEmbedUrl(url: string): string | null {
  if (!url) return null

  try {
    const parsed = new URL(url)

    // YouTube: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) {
      let videoId = ""
      if (parsed.hostname.includes("youtu.be")) {
        videoId = parsed.pathname.slice(1)
      } else if (parsed.pathname.startsWith("/embed/")) {
        return url
      } else if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/")[2] || ""
      } else {
        videoId = parsed.searchParams.get("v") || ""
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    // Vimeo: vimeo.com/ID
    if (parsed.hostname.includes("vimeo.com")) {
      const videoId = parsed.pathname.split("/").filter(Boolean).pop()
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null
    }

    return null
  } catch {
    return null
  }
}

export function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg)$/i.test(url)
}
