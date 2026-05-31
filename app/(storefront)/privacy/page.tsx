import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Amoré",
  description: "Learn how Amoré collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-heading text-4xl font-bold text-charcoal mb-8">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-charcoal">
        <p>Last updated: May 2025</p>
        <h2>1. Information We Collect</h2>
        <p>We collect personal information you provide when placing orders, creating an account, or contacting us. This includes your name, email address, delivery address, phone number, and payment details.</p>
        <h2>2. How We Use Your Information</h2>
        <p>We use your information to process orders, deliver products, send order updates, provide customer support, and improve our services. With your consent, we may also send marketing communications.</p>
        <h2>3. Data Security</h2>
        <p>We implement appropriate security measures to protect your personal data. Payment processing is handled by Stripe, a PCI-DSS compliant payment processor.</p>
        <h2>4. Cookies</h2>
        <p>We use essential cookies for cart functionality and session management. Analytics cookies (Google Analytics) help us understand how visitors use our site.</p>
        <h2>5. Your Rights</h2>
        <p>Under UK GDPR, you have the right to access, rectify, delete, or port your personal data. Contact us at privacy@amore-gifts.com to exercise these rights.</p>
        <h2>6. Contact</h2>
        <p>For privacy-related queries, email privacy@amore-gifts.com.</p>
      </div>
    </div>
  );
}
