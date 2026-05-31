"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Truck, Gift, CheckCircle2, Loader2 } from "lucide-react";
import { checkoutSchema, type CheckoutInput } from "@/schemas/checkout";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

const steps = ["Contact", "Delivery", "Payment", "Confirmation"];

export function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { subtotal, clearCart, couponCode } = useCart();

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      contact: { email: "", phone: "" },
      delivery: { firstName: "", lastName: "", line1: "", line2: "", city: "", county: "", postcode: "", country: "GB" },
      deliveryMethod: { method: "standard" },
      giftOptions: { giftMessage: "", giftWrapping: false },
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async (data: CheckoutInput) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          couponCode: couponCode || undefined,
          cartSubtotal: subtotal,
        }),
      });

      const json = await res.json();

      if (json.success && json.data) {
        setOrderNumber(json.data.orderNumber);
        setIsSubmitted(true);
        setCurrentStep(3);
        clearCart();
      } else {
        setError(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-20">
        <CheckCircle2 className="h-20 w-20 text-sage mx-auto mb-6" />
        <h2 className="font-heading text-3xl font-bold text-charcoal mb-3">Thank You!</h2>
        <p className="text-muted-foreground mb-2">Your order has been placed successfully.</p>
        <p className="text-muted-foreground mb-6">Order number: <strong>{orderNumber}</strong></p>
        <p className="text-sm text-muted-foreground">A confirmation email has been sent to your email address.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          {steps.map((step, i) => (
            <span key={step} className={i <= currentStep ? "text-primary font-medium" : "text-muted-foreground"}>
              {step}
            </span>
          ))}
        </div>
        <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive rounded-lg p-4 mb-6 text-sm">{error}</div>
      )}

      {/* Order Summary */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1: Contact */}
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("contact.email")} placeholder="you@example.com" />
                {errors.contact?.email && <p className="text-sm text-destructive mt-1">{errors.contact.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" {...register("contact.phone")} placeholder="+44 7xxx xxx xxx" />
              </div>
              <Button type="button" onClick={() => setCurrentStep(1)}>Continue to Delivery</Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Delivery */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" /> Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...register("delivery.firstName")} />
                  {errors.delivery?.firstName && <p className="text-sm text-destructive mt-1">{errors.delivery.firstName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...register("delivery.lastName")} />
                  {errors.delivery?.lastName && <p className="text-sm text-destructive mt-1">{errors.delivery.lastName.message}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="line1">Address</Label>
                <Input id="line1" {...register("delivery.line1")} placeholder="Street address" />
                {errors.delivery?.line1 && <p className="text-sm text-destructive mt-1">{errors.delivery.line1.message}</p>}
              </div>
              <div>
                <Label htmlFor="line2">Address Line 2 (optional)</Label>
                <Input id="line2" {...register("delivery.line2")} placeholder="Apartment, suite, etc." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...register("delivery.city")} />
                </div>
                <div>
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input id="postcode" {...register("delivery.postcode")} />
                </div>
              </div>

              <Separator />

              <div>
                <Label>Delivery Method</Label>
                <RadioGroup defaultValue="standard" className="mt-2 space-y-3" onValueChange={(v) => form.setValue("deliveryMethod.method", v as "standard" | "express" | "same-day" | "collection")}>
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard (2–3 days)</Label>
                    </div>
                    <span className="font-medium">£4.99</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express">Express (Next day)</Label>
                    </div>
                    <span className="font-medium">£9.99</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="same-day" id="same-day" />
                      <Label htmlFor="same-day">Same-Day (Order before 1pm)</Label>
                    </div>
                    <span className="font-medium">£14.99</span>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(0)}>Back</Button>
                <Button type="button" onClick={() => setCurrentStep(2)}>Continue to Payment</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Payment & Gift Options */}
        {currentStep === 2 && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" /> Gift Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="giftMessage">Gift Message (optional)</Label>
                  <Textarea id="giftMessage" {...register("giftOptions.giftMessage")} placeholder="Write a heartfelt message..." rows={3} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" /> Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Payment is processed securely via Stripe. In production, the Stripe Elements payment form would appear here.
                </p>
                <div className="bg-muted rounded-lg p-6 text-center text-sm text-muted-foreground">
                  Stripe Elements Integration Point
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
                    ) : (
                      `Place Order — ${formatPrice(subtotal)}`
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </form>
    </div>
  );
}
