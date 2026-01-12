"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Utensils, ExternalLink } from "lucide-react";

export function VenueSection() {
    // front.jpg is first/prioritized
    const images = [
        "/photos/front.jpg",
        "/photos/venue side0.jpg",
        "/photos/venue side1.jpg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-cycle images every 4 seconds (slightly longer for better viewing)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section id="venue" className="relative">
            {/* Hero Image with Auto-Cycling Fade Animation */}
            <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
                {/* Image Carousel with Smooth Cross-Fade */}
                <AnimatePresence mode="sync">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={images[currentIndex]}
                            alt={`Venue ${currentIndex + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Fading Color Gradient Overlay - Multi-layer for rich effect */}
                {/* Layer 1: Top fade to cream (page background) */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-wedding-cream via-wedding-cream/50 to-transparent z-10" />

                {/* Layer 2: Bottom fade to cream (seamless transition to content) */}
                <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-wedding-cream via-wedding-cream/70 to-transparent z-10" />

                {/* Layer 3: Center vignette for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />

                {/* Layer 4: Radial vignette for artistic depth */}
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)"
                    }}
                />

                {/* Text Overlay - Above gradients (z-20) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <p
                            className="text-wedding-gold/90 text-xs md:text-sm tracking-[0.4em] uppercase"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Join Us At
                        </p>
                        <h2
                            className="text-wedding-ivory text-5xl md:text-7xl lg:text-8xl drop-shadow-lg"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            The Venue
                        </h2>

                        {/* Decorative line */}
                        <div className="w-20 h-px bg-wedding-gold/60 mx-auto" />
                    </motion.div>

                    {/* Dots Indicator */}
                    <motion.div
                        className="flex gap-2 mt-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-500 ${index === currentIndex
                                        ? "bg-wedding-gold w-8"
                                        : "bg-white/40 w-2 hover:bg-white/70"
                                    }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Details Content - Seamlessly connected via cream background */}
            <div className="bg-wedding-cream">
                <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Ceremony */}
                        <div className="text-center md:text-right border-b md:border-b-0 md:border-r border-wedding-gold/20 pb-10 md:pb-0 md:pr-12">
                            <div className="flex flex-col items-center md:items-end gap-3 mb-4">
                                <Heart className="text-wedding-gold" size={28} />
                                <h3 className="text-2xl md:text-3xl text-wedding-charcoal" style={{ fontFamily: "var(--font-heading)" }}>
                                    Ceremony
                                </h3>
                            </div>
                            <p className="text-wedding-gold font-medium mb-2 tracking-widest text-sm">3:00 PM</p>
                            <p className="text-wedding-slate text-base md:text-lg mb-6 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                                San Lorenzo Ruiz Parish Church
                                <br />
                                San Vicente, Tarlac City
                            </p>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=San+Lorenzo+Ruiz+Parish+Church+San+Vicente+Tarlac+City"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-wedding-gold text-wedding-ivory px-5 py-3 rounded-md text-xs tracking-[0.15em] uppercase hover:bg-wedding-antique transition-colors shadow-md font-medium"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                View Map <ExternalLink size={14} />
                            </a>
                        </div>

                        {/* Reception */}
                        <div className="text-center md:text-left pt-10 md:pt-0 md:pl-12">
                            <div className="flex flex-col items-center md:items-start gap-3 mb-4">
                                <Utensils className="text-wedding-gold" size={28} />
                                <h3 className="text-2xl md:text-3xl text-wedding-charcoal" style={{ fontFamily: "var(--font-heading)" }}>
                                    Reception
                                </h3>
                            </div>
                            <p className="text-wedding-gold font-medium mb-2 tracking-widest text-sm">5:00 PM</p>
                            <p className="text-wedding-slate text-base md:text-lg mb-6 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                                The Bella Plaza
                                <br />
                                San Sebastian Village, Tarlac City
                            </p>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=The+Bella+Plaza+San+Sebastian+Village+Tarlac+City"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-wedding-gold text-wedding-ivory px-5 py-3 rounded-md text-xs tracking-[0.15em] uppercase hover:bg-wedding-antique transition-colors shadow-md font-medium"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                View Map <ExternalLink size={14} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
