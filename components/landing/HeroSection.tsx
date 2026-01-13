"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Countdown } from "@/components/ui/Countdown";

export function HeroSection() {
    const hashtags = [
        "#NESAtamangtaonasiGODFREY",
        "#ForeverHappiNESniNARDS",
        "#ELLAveyou14nityGODFREY",
    ];

    return (
        <>
            <section id="home" className="relative h-screen w-full overflow-hidden">
                {/* Background Placeholder */}
                <PlaceholderImage
                    className="absolute inset-0 w-full h-full"
                    label="Hero Background"
                    variant="hero"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    {/* Date */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-wedding-pearl/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        February 14, 2026
                    </motion.p>

                    {/* Names */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-wedding-ivory text-4xl md:text-6xl lg:text-8xl tracking-tight mb-4"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Godfrey{" "}
                        <span className="text-wedding-red inline-block mx-2 md:mx-4">&</span>{" "}
                        Vanesa
                    </motion.h1>

                    {/* Quote */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-wedding-pearl/90 text-sm md:text-lg lg:text-xl italic font-light max-w-2xl mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        &ldquo;I have found the one whom my soul loves&rdquo;
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="text-wedding-champagne/60 text-xs md:text-sm"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        — Song of Solomon 3:4
                    </motion.p>

                    {/* Theme Color Circles - Mobile Friendly */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                        className="flex items-center gap-2 mt-6"
                    >
                    </motion.div>

                    {/* Countdown */}
                    <Countdown />

                    {/* Hashtags */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-2 md:gap-4 mt-6"
                    >
                        {hashtags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-wedding-red/70 text-[10px] md:text-xs tracking-wide"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                        className="absolute bottom-8"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <ChevronDown className="text-wedding-ivory/70" size={32} />
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
