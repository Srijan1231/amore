"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface RefundRequestProps {
  orderId: string;
  orderNumber: string;
}

export function RefundRequest({ orderNumber }: RefundRequestProps) {
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <CheckCircle2 className="h-10 w-10 text-sage mx-auto mb-3" />
          <p className="font-medium">Refund request submitted</p>
          <p className="text-sm text-muted-foreground mt-1">
            We&apos;ll review your request for order {orderNumber} within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Request Refund — {orderNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Reason for refund</Label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please describe why you'd like a refund..."
            rows={4}
          />
        </div>
        <Button onClick={() => setSubmitted(true)} disabled={!reason.trim()}>
          Submit Refund Request
        </Button>
      </CardContent>
    </Card>
  );
}
