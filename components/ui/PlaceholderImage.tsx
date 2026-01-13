import { Camera } from "lucide-react";

interface PlaceholderImageProps {
    className?: string;
    label?: string;
    variant?: "hero" | "venue" | "story" | "gallery" | "rsvp";
}

export function PlaceholderImage({ className = "", label = "Image", variant = "gallery" }: PlaceholderImageProps) {
    const gradients = {
        hero: "from-wedding-charcoal via-wedding-charcoal to-wedding-charcoal",
        venue: "from-wedding-sage via-wedding-cream to-wedding-rose",
        story: "from-wedding-rose via-wedding-blush to-wedding-champagne",
        gallery: "from-wedding-champagne via-wedding-pearl to-wedding-cream",
        rsvp: "from-wedding-charcoal via-wedding-slate to-wedding-dove",
    };

    // Hero variant shows plain black background without icon
    if (variant === "hero") {
        return (
            <div className={`bg-wedding-charcoal ${className}`} />
        );
    }

    return (
        <div className={`bg-gradient-to-br ${gradients[variant]} flex items-center justify-center ${className}`}>
            <div className="text-center opacity-50">
                <Camera className="mx-auto mb-2 text-wedding-red" size={32} />
                <p className="text-xs tracking-widest uppercase text-wedding-dove" style={{ fontFamily: "var(--font-body)" }}>
                    {label}
                </p>
            </div>
        </div>
    );
}
