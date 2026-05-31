import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your store settings</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Store Name</Label>
              <Input defaultValue="Amoré" />
            </div>
            <div>
              <Label>Store URL</Label>
              <Input defaultValue="https://amore-gifts.com" />
            </div>
            <div>
              <Label>Contact Email</Label>
              <Input defaultValue="hello@amore-gifts.com" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input defaultValue="+44 20 1234 5678" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Standard Delivery</Label>
                <Input defaultValue="4.99" type="number" step="0.01" />
              </div>
              <div>
                <Label>Express Delivery</Label>
                <Input defaultValue="9.99" type="number" step="0.01" />
              </div>
              <div>
                <Label>Same-Day Delivery</Label>
                <Input defaultValue="14.99" type="number" step="0.01" />
              </div>
              <div>
                <Label>Free Shipping Threshold</Label>
                <Input defaultValue="50" type="number" step="0.01" />
              </div>
            </div>
            <Button>Save Shipping Rates</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Stripe (Payment Processing)</Label>
              <p className="text-sm text-muted-foreground mt-1">Connected — test mode</p>
            </div>
            <Separator />
            <div>
              <Label>Clerk (Authentication)</Label>
              <p className="text-sm text-muted-foreground mt-1">Configured</p>
            </div>
            <Separator />
            <div>
              <Label>Resend (Email)</Label>
              <p className="text-sm text-muted-foreground mt-1">Connected — sending from hello@amore-gifts.com</p>
            </div>
            <Separator />
            <div>
              <Label>Cloudinary (Media)</Label>
              <p className="text-sm text-muted-foreground mt-1">Connected</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
