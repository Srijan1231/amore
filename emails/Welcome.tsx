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

interface WelcomeProps {
  customerName: string;
  discountCode: string;
}

export default function Welcome({
  customerName = "there",
  discountCode = "WELCOME10",
}: WelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Amoré — here&apos;s 10% off your first order!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welcome to Amoré</Heading>
          <Text style={text}>Hi {customerName},</Text>
          <Text style={text}>
            We&apos;re so happy you&apos;re here! Amoré is all about handcrafted gifts made with love.
            Every bouquet tells a story, and we can&apos;t wait for you to discover yours.
          </Text>
          <Hr style={hr} />
          <Text style={{ ...text, textAlign: "center" as const }}>
            Here&apos;s <strong>10% off</strong> your first order:
          </Text>
          <Text style={code}>{discountCode}</Text>
          <Button href="https://amore-gifts.com/shop" style={button}>
            Start Shopping
          </Button>
          <Hr style={hr} />
          <Text style={footer}>
            Gifted with love, The Amoré Team
          </Text>
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
const code = { backgroundColor: "#f5f0e8", color: "#8b687f", padding: "12px 24px", borderRadius: "8px", fontSize: "24px", fontWeight: "bold" as const, textAlign: "center" as const, letterSpacing: "4px", display: "block", margin: "16px auto" };
const button = { backgroundColor: "#8b687f", color: "#faf8f5", padding: "14px 28px", borderRadius: "8px", fontSize: "16px", textDecoration: "none", display: "block", textAlign: "center" as const, margin: "24px auto" };
const footer = { color: "#6b6b6b", fontSize: "14px", textAlign: "center" as const };
