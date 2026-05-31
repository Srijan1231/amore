import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { OrganizationStructuredData } from "@/components/shared/StructuredData";
import "./globals.css";

const heading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Amoré — Handcrafted Bouquets & Luxury Gifts",
    template: "%s | Amoré",
  },
  description:
    "Discover beautifully handcrafted bouquets, preserved flowers, and luxury gift hampers. Made with love, delivered across the UK. Free shipping over £50.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://amore-gifts.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Amoré",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${heading.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationStructuredData />
        {children}
      </body>
    </html>
  );
}
