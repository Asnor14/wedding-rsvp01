"use client";

import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer className="bg-wedding-charcoal py-12 text-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <p
                    className="text-wedding-champagne/60 text-3xl md:text-4xl mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    G <span className="text-wedding-red">&</span> V
                </p>
                <p
                    className="text-wedding-dove text-xs tracking-[0.2em] uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    February 14, 2026
                </p>
                <p
                    className="text-wedding-dove/50 text-xs mt-6"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    Made with love
                </p>
            </motion.div>
        </footer>
    );
}
