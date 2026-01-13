"use client";

import { motion } from "framer-motion";

export function DressCodeSection() {
    // Exact Hex Codes provided by user
    // Guests (Ladies): Rosy Clay, Soft Peach, Light Apricot, Blush Nude, Soft Ivory
    const guestPalette = [
        { name: "Rosy Clay", hex: "#BC887A" },
        { name: "Soft Peach", hex: "#E8AF93" },
        { name: "Light Apricot", hex: "#EEC6B0" },
        { name: "Blush Nude", hex: "#F1D5C6" },
        { name: "Soft Ivory", hex: "#F4E8E1" },
    ];

    // Principal Sponsors: Champagne Cream, Warm Tan
    const sponsorPalette = [
        { name: "Champagne Cream", hex: "#F4F1D8" },
        { name: "Warm Tan", hex: "#D8B98F" },
    ];

    return (
        <section id="dress-code" className="py-16 md:py-24 bg-wedding-ivory relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-wedding-red/20" />

            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 id="dress-code-title" className="text-wedding-charcoal text-3xl md:text-4xl lg:text-5xl mb-12 md:mb-16" style={{ fontFamily: "var(--font-display)" }}>
                        Dress Code: Formal
                    </h2>

                    {/* Two Columns: Guests | Principal Sponsors */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* Guests Section */}
                        <div className="bg-white/50 rounded-xl p-6 border border-wedding-red/10">
                            <h3 className="text-lg md:text-xl text-wedding-charcoal mb-4 font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                                Guests
                            </h3>
                            <div className="space-y-4 text-left">
                                <div>
                                    <span className="block text-wedding-charcoal text-sm font-medium mb-1">Gentlemen:</span>
                                    <span className="text-wedding-slate text-xs">Suit and Pants in any color</span>
                                </div>
                                <div>
                                    <span className="block text-wedding-charcoal text-sm font-medium mb-1">Ladies:</span>
                                    <span className="text-wedding-slate text-xs block mb-2">Long gown in shades of Neutral Pink</span>
                                    <span className="text-wedding-slate/60 text-[9px] uppercase tracking-wider block mb-3">
                                        (Rosy Clay, Soft Peach, Light Apricot, Blush Nude, Soft Ivory)
                                    </span>
                                </div>

                                {/* Guest Palette */}
                                <div className="flex flex-wrap gap-1 border border-wedding-red/20 rounded-md overflow-hidden bg-white/30 p-1">
                                    {guestPalette.map((color, i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-sm flex-1"
                                            style={{ backgroundColor: color.hex }}
                                            title={`${color.name}: ${color.hex}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Principal Sponsors Section */}
                        <div className="bg-white/50 rounded-xl p-6 border border-wedding-red/10">
                            <h3 className="text-lg md:text-xl text-wedding-charcoal mb-4 font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                                Principal Sponsors
                            </h3>
                            <div className="space-y-4 text-left">
                                <div>
                                    <span className="block text-wedding-charcoal text-sm font-medium mb-1">Gentlemen:</span>
                                    <span className="text-wedding-slate text-xs">Suit and tie in Champagne tones</span>
                                </div>
                                <div>
                                    <span className="block text-wedding-charcoal text-sm font-medium mb-1">Ladies:</span>
                                    <span className="text-wedding-slate text-xs">Evening gown in Beige or Tan</span>
                                </div>
                                <span className="text-wedding-slate/60 text-[9px] uppercase tracking-wider block">
                                    (Champagne Cream, Warm Tan)
                                </span>

                                {/* Sponsor Palette */}
                                <div className="flex gap-1 border border-wedding-red/20 rounded-md overflow-hidden bg-white/30 p-1 max-w-[100px]">
                                    {sponsorPalette.map((color, i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-8 rounded-sm flex-1"
                                            style={{ backgroundColor: color.hex }}
                                            title={`${color.name}: ${color.hex}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 md:mt-16 p-5 md:p-6 bg-wedding-cream/50 rounded-lg border border-wedding-red/10 inline-block max-w-md">
                        <p className="text-wedding-slate text-xs md:text-sm italic leading-relaxed" style={{ fontFamily: "var(--font-heading)" }}>
                            "We kindly ask our guests to strictly follow the dress code."
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
