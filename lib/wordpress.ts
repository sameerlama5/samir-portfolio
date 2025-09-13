export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "")
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = stripHtml(content).split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function extractExcerpt(content: string, maxLength = 160): string {
  const text = stripHtml(content)
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
}
