"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function StorySection() {
    return (
        <section id="story" className="bg-wedding-ivory">
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 lg:py-32">
                {/* Header */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-wedding-gold text-xs tracking-[0.3em] mb-4"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        OUR STORY
                    </p>
                    <h2
                        id="story-title"
                        className="text-wedding-charcoal text-4xl md:text-5xl lg:text-6xl mb-8"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        How We Met
                    </h2>
                    <div className="w-16 h-[1px] bg-wedding-gold mx-auto" />
                </motion.div>

                {/* To Follow Message */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p
                        className="text-wedding-dove text-xl md:text-2xl italic"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        To follow...
                    </p>
                    <Heart
                        className="text-wedding-gold/40 mx-auto mt-8"
                        size={32}
                        fill="currentColor"
                    />
                </motion.div>
            </div>
        </section>
    );
}
