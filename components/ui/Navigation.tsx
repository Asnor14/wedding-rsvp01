"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Venue", href: "#venue" },
        { name: "Story", href: "#story" },
        { name: "Entourage", href: "#entourage" },
        { name: "Gallery", href: "#gallery" },
        { name: "RSVP", href: "#rsvp" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-wedding-pearl/95 backdrop-blur-md shadow-lg shadow-wedding-champagne/10 border-b border-wedding-champagne/20"
                    : "bg-transparent border-b border-white/20"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Desktop Left Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.slice(0, 3).map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:text-wedding-red relative group ${isScrolled ? "text-wedding-charcoal" : "text-wedding-ivory"
                                        }`}
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-wedding-red transition-all duration-300 group-hover:w-full group-hover:left-0" />
                                </a>
                            ))}
                        </div>

                        {/* Logo */}
                        <a
                            href="#home"
                            className={`text-2xl md:text-3xl tracking-tight transition-colors duration-300 ${isScrolled ? "text-wedding-charcoal" : "text-wedding-ivory"
                                }`}
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            G <span className="text-wedding-red">&</span> V
                        </a>

                        {/* Desktop Right Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.slice(3).map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:text-wedding-red relative group ${isScrolled ? "text-wedding-charcoal" : "text-wedding-ivory"
                                        }`}
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-wedding-red transition-all duration-300 group-hover:w-full group-hover:left-0" />
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className={`md:hidden p-2 transition-colors ${isScrolled ? "text-wedding-charcoal" : "text-wedding-ivory"
                                }`}
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-wedding-charcoal/98 backdrop-blur-lg flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-wedding-ivory p-2 hover:text-wedding-red transition-colors"
                            aria-label="Close menu"
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col items-center space-y-8">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="text-wedding-ivory text-3xl tracking-widest hover:text-wedding-red transition-colors"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
