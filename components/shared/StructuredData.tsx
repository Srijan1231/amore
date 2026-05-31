import type { Product } from "@/types";

interface ProductStructuredDataProps {
  product: Product & { avgRating?: number; reviewCount?: number };
}

export function ProductStructuredData({ product }: ProductStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://amore-gifts.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.map((img) => img.url) ?? [],
    url: `${baseUrl}/shop/${product.slug}`,
    sku: product.sku,
    brand: { "@type": "Brand", name: "Amoré" },
    offers: {
      "@type": "Offer",
      price: Number(product.price).toFixed(2),
      priceCurrency: "GBP",
      availability: product.inventory > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${baseUrl}/shop/${product.slug}`,
      seller: { "@type": "Organization", name: "Amoré" },
    },
    ...(product.avgRating && product.reviewCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.avgRating.toFixed(1),
        reviewCount: product.reviewCount,
        bestRating: "5",
        worstRating: "1",
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://amore-gifts.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Amoré",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: "Handcrafted bouquets and luxury gifts made with love",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@amore-gifts.com",
      contactType: "customer service",
    },
    sameAs: [
      "https://instagram.com/amore",
      "https://facebook.com/amore",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbStructuredDataProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FAQStructuredDataProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
