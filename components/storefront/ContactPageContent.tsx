"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, Clock, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  orderNumber: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactInput = z.infer<typeof contactSchema>;

const faqs = [
  { q: "How long does delivery take?", a: "Standard delivery takes 2–3 working days. Express delivery is next day, and same-day delivery is available for orders placed before 1pm." },
  { q: "Can I change or cancel my order?", a: "You can modify or cancel your order within 1 hour of placing it. After that, our artisans may have already started preparing your bouquet." },
  { q: "Do you offer corporate gifting?", a: "Yes! We offer bespoke corporate gifting packages. Fill out the B2B enquiry form or email us at corporate@amore-gifts.com." },
  { q: "What is your returns policy?", a: "We offer free returns within 14 days for non-perishable items. Fresh flower bouquets cannot be returned due to their perishable nature." },
  { q: "Can I add a personalised message?", a: "Absolutely! You can add a personalised message card during checkout at no extra cost." },
  { q: "Do you ship internationally?", a: "Currently we deliver within the United Kingdom. International shipping is coming soon!" },
];

export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
      {/* Contact Form */}
      <div>
        {submitted ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-sage mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">We&apos;ll get back to you within 24 hours.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="orderNumber">Order Number (optional)</Label>
                  <Input id="orderNumber" {...register("orderNumber")} placeholder="AMR-XXXXX" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" {...register("message")} rows={5} placeholder="How can we help?" />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">hello@amore-gifts.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">+44 20 1234 5678</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">Mon–Fri 9am–6pm, Sat 10am–4pm</span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
          Frequently Asked Questions
        </h2>
        <Accordion className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
