import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";

interface RSVPEmailProps {
    fullName: string;
    attending: boolean;
    guestCount: number;
}

export default function RSVPEmail({
    fullName = "Guest",
    attending = true,
    guestCount = 1,
}: RSVPEmailProps) {
    const previewText = attending
        ? `Thank you for confirming your attendance, ${fullName}!`
        : `We'll miss you, ${fullName}. Thank you for letting us know.`;

    return (
        <Html>
            <Head>
                <style>
                    {`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
          `}
                </style>
            </Head>
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Decorative Top Border */}
                    <Section style={topBorder} />

                    {/* Floral Decorative Element */}
                    <Section style={headerSection}>
                        <Text style={floralDecor}>✿ ❀ ✿</Text>
                    </Section>

                    {/* Main Heading */}
                    <Heading style={heading}>
                        Thank You for Your RSVP
                    </Heading>

                    <Hr style={divider} />

                    {/* Personalized Greeting */}
                    <Text style={greeting}>
                        Dear {fullName},
                    </Text>

                    {/* Status Message */}
                    <Section style={statusSection}>
                        <Text style={statusLabel}>Your Response</Text>
                        <Text style={attending ? statusAttending : statusDeclining}>
                            {attending ? "✨ Joyfully Attending ✨" : "Regretfully Declining"}
                        </Text>
                    </Section>

                    {/* Guest Count - Only show if attending */}
                    {attending && (
                        <Section style={detailsSection}>
                            <Text style={detailsLabel}>Number of Seats Reserved</Text>
                            <Text style={detailsValue}>
                                {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                            </Text>
                        </Section>
                    )}

                    <Hr style={divider} />

                    {/* Warm Message */}
                    <Text style={message}>
                        {attending
                            ? "We can't wait to celebrate with you! Your presence will make our special day even more memorable."
                            : "While we'll miss your presence, we truly appreciate you taking the time to let us know. You'll be in our thoughts on our special day."}
                    </Text>

                    {/* Event Details - Only show if attending */}
                    {attending && (
                        <Section style={eventSection}>
                            <Text style={eventTitle}>Event Details</Text>
                            <Text style={eventDetail}>
                                📅 <strong>December 31, 2025</strong>
                            </Text>
                            <Text style={eventDetail}>
                                🕓 <strong>Ceremony:</strong> 4:00 PM
                            </Text>
                            <Text style={eventDetail}>
                                🍽️ <strong>Reception:</strong> 6:30 PM
                            </Text>
                            <Text style={eventDetail}>
                                📍 <strong>Château de Lumière</strong>
                                <br />
                                123 Elegance Avenue, Beverly Hills, CA 90210
                            </Text>
                        </Section>
                    )}

                    {/* Closing */}
                    <Section style={closingSection}>
                        <Text style={closing}>With love,</Text>
                        <Text style={signature}>
                            Name & Name
                        </Text>
                    </Section>

                    {/* Floral Footer */}
                    <Section style={footerSection}>
                        <Text style={floralDecor}>❀ ✿ ❀</Text>
                    </Section>

                    {/* Decorative Bottom Border */}
                    <Section style={bottomBorder} />
                </Container>
            </Body>
        </Html>
    );
}

// ============================================================================
// STYLES
// ============================================================================

const main = {
    backgroundColor: "#F5F5F0",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    padding: "40px 20px",
};

const container = {
    backgroundColor: "#FDFBF7",
    border: "2px solid #C9A962",
    borderRadius: "8px",
    margin: "0 auto",
    maxWidth: "580px",
    padding: "0",
    overflow: "hidden" as const,
};

const topBorder = {
    backgroundColor: "#C9A962",
    height: "6px",
};

const bottomBorder = {
    backgroundColor: "#C9A962",
    height: "6px",
};

const headerSection = {
    padding: "30px 40px 10px",
    textAlign: "center" as const,
};

const floralDecor = {
    color: "#C9A962",
    fontSize: "24px",
    letterSpacing: "8px",
    margin: "0",
};

const heading = {
    color: "#2B2B2B",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "32px",
    fontWeight: "600",
    lineHeight: "1.3",
    margin: "0",
    padding: "0 40px",
    textAlign: "center" as const,
};

const divider = {
    borderColor: "#C9A962",
    borderStyle: "solid" as const,
    borderWidth: "1px 0 0 0",
    margin: "24px 40px",
    opacity: 0.4,
};

const greeting = {
    color: "#4A4A4A",
    fontSize: "18px",
    lineHeight: "1.6",
    margin: "0 0 24px",
    padding: "0 40px",
    textAlign: "center" as const,
};

const statusSection = {
    backgroundColor: "#FAF7F2",
    borderRadius: "8px",
    margin: "0 40px 24px",
    padding: "24px",
    textAlign: "center" as const,
};

const statusLabel = {
    color: "#6B6B6B",
    fontSize: "12px",
    letterSpacing: "2px",
    margin: "0 0 8px",
    textTransform: "uppercase" as const,
};

const statusAttending = {
    color: "#2E7D32",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "24px",
    fontWeight: "600",
    margin: "0",
};

const statusDeclining = {
    color: "#C62828",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "24px",
    fontWeight: "600",
    margin: "0",
};

const detailsSection = {
    backgroundColor: "#FAF7F2",
    borderRadius: "8px",
    margin: "0 40px 24px",
    padding: "20px",
    textAlign: "center" as const,
};

const detailsLabel = {
    color: "#6B6B6B",
    fontSize: "12px",
    letterSpacing: "2px",
    margin: "0 0 8px",
    textTransform: "uppercase" as const,
};

const detailsValue = {
    color: "#2B2B2B",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "20px",
    fontWeight: "500",
    margin: "0",
};

const message = {
    color: "#4A4A4A",
    fontSize: "16px",
    fontStyle: "italic" as const,
    lineHeight: "1.8",
    margin: "0 0 24px",
    padding: "0 40px",
    textAlign: "center" as const,
};

const eventSection = {
    backgroundColor: "#FAF7F2",
    borderLeft: "4px solid #C9A962",
    margin: "0 40px 24px",
    padding: "24px",
};

const eventTitle = {
    color: "#C9A962",
    fontSize: "12px",
    letterSpacing: "2px",
    margin: "0 0 16px",
    textTransform: "uppercase" as const,
};

const eventDetail = {
    color: "#4A4A4A",
    fontSize: "15px",
    lineHeight: "1.8",
    margin: "0 0 8px",
};

const closingSection = {
    padding: "16px 40px 24px",
    textAlign: "center" as const,
};

const closing = {
    color: "#6B6B6B",
    fontSize: "16px",
    fontStyle: "italic" as const,
    margin: "0 0 8px",
};

const signature = {
    color: "#2B2B2B",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "24px",
    fontWeight: "500",
    margin: "0",
};

const footerSection = {
    padding: "0 40px 30px",
    textAlign: "center" as const,
};
