import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface OrderConfirmationProps {
  orderNumber: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: string }>;
  total: string;
  shippingMethod: string;
}

export default function OrderConfirmation({
  orderNumber = "AMR-SAMPLE-001",
  customerName = "Sarah",
  items = [{ name: "Eternal Rose Bouquet", quantity: 1, price: "£49.99" }],
  total = "£54.98",
  shippingMethod = "Standard Delivery",
}: OrderConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Amoré order {orderNumber} is confirmed!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Thank you for your order, {customerName}!</Heading>
          <Text style={text}>
            Your order <strong>{orderNumber}</strong> has been confirmed and is being prepared with love.
          </Text>
          <Hr style={hr} />
          <Section>
            <Heading as="h3" style={subheading}>Order Summary</Heading>
            {items.map((item, i) => (
              <Text key={i} style={text}>
                {item.name} x{item.quantity} — {item.price}
              </Text>
            ))}
            <Hr style={hr} />
            <Text style={{ ...text, fontWeight: "bold" }}>Total: {total}</Text>
            <Text style={text}>Shipping: {shippingMethod}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            With love, The Amoré Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#faf8f5", fontFamily: "Georgia, serif" };
const container = { margin: "0 auto", padding: "40px 20px", maxWidth: "560px" };
const heading = { color: "#8b687f", fontSize: "28px", textAlign: "center" as const };
const subheading = { color: "#2d2d2d", fontSize: "18px" };
const text = { color: "#2d2d2d", fontSize: "16px", lineHeight: "1.6" };
const hr = { borderColor: "#e8e0d8", margin: "24px 0" };
const footer = { color: "#6b6b6b", fontSize: "14px", textAlign: "center" as const };
