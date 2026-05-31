import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Hr,
  Button,
} from "@react-email/components";

interface AbandonedCartProps {
  customerName: string;
  items: Array<{ name: string; price: string }>;
  cartUrl: string;
}

export default function AbandonedCart({
  customerName = "there",
  items = [{ name: "Eternal Rose Bouquet", price: "£49.99" }],
  cartUrl = "https://amore-gifts.com/cart",
}: AbandonedCartProps) {
  return (
    <Html>
      <Head />
      <Preview>You left something beautiful behind...</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Did you forget something?</Heading>
          <Text style={text}>Hi {customerName},</Text>
          <Text style={text}>
            We noticed you left some lovely items in your cart. They&apos;re waiting for you!
          </Text>
          <Hr style={hr} />
          {items.map((item, i) => (
            <Text key={i} style={text}>
              {item.name} — {item.price}
            </Text>
          ))}
          <Hr style={hr} />
          <Button href={cartUrl} style={button}>
            Complete Your Order
          </Button>
          <Text style={footer}>With love, The Amoré Team</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#faf8f5", fontFamily: "Georgia, serif" };
const container = { margin: "0 auto", padding: "40px 20px", maxWidth: "560px" };
const heading = { color: "#8b687f", fontSize: "28px", textAlign: "center" as const };
const text = { color: "#2d2d2d", fontSize: "16px", lineHeight: "1.6" };
const hr = { borderColor: "#e8e0d8", margin: "24px 0" };
const button = { backgroundColor: "#8b687f", color: "#faf8f5", padding: "14px 28px", borderRadius: "8px", fontSize: "16px", textDecoration: "none", display: "block", textAlign: "center" as const, margin: "24px auto" };
const footer = { color: "#6b6b6b", fontSize: "14px", textAlign: "center" as const, marginTop: "32px" };
