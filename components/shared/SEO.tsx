import type { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://amore-gifts.com";
  const url = `${baseUrl}${path}`;
  const ogImage = image ?? `${baseUrl}/og-default.jpg`;

  return {
    title,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Amoré",
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
