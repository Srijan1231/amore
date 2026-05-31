"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Integration point: Klaviyo / Mailchimp
    setSubmitted(true);
  };

  return (
    <section className="bg-cream py-16">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-3">
          Join the Amoré Family
        </h2>
        <p className="text-muted-foreground mb-6">
          Get 10% off your first order, plus be the first to know about new collections, 
          exclusive offers, and gifting inspiration.
        </p>
        {submitted ? (
          <p className="text-primary font-medium">
            Welcome to Amoré! Check your inbox for your discount code.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              aria-label="Email address"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </div>
    </section>
  );
}
