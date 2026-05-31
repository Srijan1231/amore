import { Metadata } from "next";
import { HeroSection } from "@/components/storefront/HeroSection";
import { BrandStoryStrip } from "@/components/storefront/BrandStoryStrip";
import { FeaturedCollection } from "@/components/storefront/FeaturedCollection";
import { HowItWorks } from "@/components/storefront/HowItWorks";
import { TestimonialsSection } from "@/components/storefront/TestimonialsSection";
import { WhyAmore } from "@/components/storefront/WhyAmore";
import { NewsletterSignup } from "@/components/shared/NewsletterSignup";

export const metadata: Metadata = {
  title: "Amoré — Handcrafted Bouquets & Gifts Made with Love",
  description:
    "Discover handmade bouquets, preserved flowers, and luxury gift hampers. Crafted with love, delivered with care. Free delivery on orders over £50.",
  openGraph: {
    title: "Amoré — Handcrafted Bouquets & Gifts Made with Love",
    description: "Discover handmade bouquets, preserved flowers, and luxury gift hampers.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStoryStrip />
      <FeaturedCollection />
      <HowItWorks />
      <TestimonialsSection />
      <WhyAmore />
      <NewsletterSignup />
    </>
  );
}
