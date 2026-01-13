"use client";

import { motion } from "framer-motion";
import { Heart, Utensils, ExternalLink } from "lucide-react";

export function VenueSection() {
    const images = [
        "/photos/front.jpg",
        "/photos/venue side0.jpg",
        "/photos/venue side1.jpg",
    ];

    return (
        <section id="venue" className="bg-wedding-cream">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                {/* Side-by-side layout: Images Left, Content Right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* Left Side - Image Gallery Grid */}
                    <motion.div
                        className="grid grid-cols-2 gap-3"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Large Image - spans 2 rows */}
                        <div className="row-span-2 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={images[0]}
                                alt="Main Venue"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Top Right Image */}
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={images[1]}
                                alt="Venue Detail 1"
                                className="w-full h-full object-cover aspect-[4/3]"
                            />
                        </div>

                        {/* Bottom Right Image */}
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={images[2]}
                                alt="Venue Detail 2"
                                className="w-full h-full object-cover aspect-[4/3]"
                            />
                        </div>
                    </motion.div>

                    {/* Right Side - Content Area */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Title */}
                        <div className="text-center lg:text-left">
                            <h2
                                id="venue-title"
                                className="text-wedding-charcoal text-4xl md:text-5xl lg:text-6xl mb-4"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                The Venue
                            </h2>
                            <div className="w-16 h-[2px] bg-wedding-red mx-auto lg:mx-0" />
                        </div>

                        {/* Venue Details - Two Columns (Ceremony | Reception) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Ceremony */}
                            <div className="bg-white/50 rounded-xl p-5 border border-wedding-red/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <Heart className="text-wedding-red" size={20} />
                                    <h3 className="text-lg md:text-xl text-wedding-charcoal" style={{ fontFamily: "var(--font-heading)" }}>
                                        Ceremony
                                    </h3>
                                </div>
                                <p className="text-wedding-red font-semibold mb-2 tracking-widest text-xs">3:00 PM</p>
                                <p className="text-wedding-charcoal text-sm md:text-base font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                    San Lorenzo Ruiz Parish Church
                                </p>
                                <p className="text-wedding-slate text-xs mb-4" style={{ fontFamily: "var(--font-body)" }}>
                                    San Vicente, Tarlac City
                                </p>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=San+Lorenzo+Ruiz+Parish+Church+San+Vicente+Tarlac+City"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-wedding-red text-wedding-ivory px-3 py-2 rounded-md text-[10px] tracking-[0.1em] uppercase hover:bg-wedding-darkred transition-colors shadow-md font-medium"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    View Map <ExternalLink size={10} />
                                </a>
                            </div>

                            {/* Reception */}
                            <div className="bg-white/50 rounded-xl p-5 border border-wedding-red/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <Utensils className="text-wedding-red" size={20} />
                                    <h3 className="text-lg md:text-xl text-wedding-charcoal" style={{ fontFamily: "var(--font-heading)" }}>
                                        Reception
                                    </h3>
                                </div>
                                <p className="text-wedding-red font-semibold mb-2 tracking-widest text-xs">5:00 PM</p>
                                <p className="text-wedding-charcoal text-sm md:text-base font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                    The Bella Plaza
                                </p>
                                <p className="text-wedding-slate text-xs mb-4" style={{ fontFamily: "var(--font-body)" }}>
                                    San Sebastian Village, Tarlac City
                                </p>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=The+Bella+Plaza+San+Sebastian+Village+Tarlac+City"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-wedding-red text-wedding-ivory px-3 py-2 rounded-md text-[10px] tracking-[0.1em] uppercase hover:bg-wedding-darkred transition-colors shadow-md font-medium"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    View Map <ExternalLink size={10} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
