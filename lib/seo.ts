import type { Metadata } from "next"

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: "website" | "article"
}

export function generateSEO({ title, description, image, url, type = "website" }: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com"
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.jpg`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}
