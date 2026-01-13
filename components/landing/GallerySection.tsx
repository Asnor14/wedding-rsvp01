"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

export function GallerySection() {
    // Gallery images - 2 real + 8 placeholders = 10 total
    const galleryImages = [
        { src: "/photos/gallery1.png", isPlaceholder: false },
        { src: "/photos/gallery2.jpg", isPlaceholder: false },
        { src: null, isPlaceholder: true },
        { src: null, isPlaceholder: true },
        { src: null, isPlaceholder: true },
        { src: null, isPlaceholder: true },
        { src: null, isPlaceholder: true },
        { src: null, isPlaceholder: true },
        { src: null, isPlaceholder: true },
        { src: null, isPlaceholder: true },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-scroll every 4 seconds
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, [galleryImages.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    return (
        <section id="gallery" className="bg-wedding-ivory py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Header */}
            <motion.div
                className="text-center mb-12 md:mb-16 px-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <p
                    className="text-wedding-red text-xs tracking-[0.3em] mb-4"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    MOMENTS
                </p>
                <h2
                    id="gallery-title"
                    className="text-wedding-charcoal text-3xl md:text-4xl lg:text-5xl mb-8"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Our Gallery
                </h2>
                <div className="w-16 h-[1px] bg-wedding-red mx-auto" />
            </motion.div>

            {/* Gallery Carousel */}
            <motion.div
                className="relative max-w-4xl mx-auto px-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Main Image Display */}
                <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden bg-wedding-cream border border-wedding-red/20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {galleryImages[currentIndex].isPlaceholder ? (
                                // Placeholder
                                <div className="w-full h-full flex flex-col items-center justify-center bg-wedding-cream">
                                    <ImageIcon className="text-wedding-red/30 mb-4" size={64} />
                                    <p
                                        className="text-wedding-dove italic text-lg"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        Coming soon...
                                    </p>
                                </div>
                            ) : (
                                // Real image
                                <img
                                    src={galleryImages[currentIndex].src!}
                                    alt={`Gallery ${currentIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-wedding-charcoal p-2 rounded-full shadow-lg transition-all"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-wedding-charcoal p-2 rounded-full shadow-lg transition-all"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentIndex + 1} / {galleryImages.length}
                    </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {galleryImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "bg-wedding-red w-6"
                                : "bg-wedding-red/30 hover:bg-wedding-red/60"
                                }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Thumbnail Preview */}
                <div className="hidden md:flex justify-center gap-2 mt-6 overflow-x-auto pb-2">
                    {galleryImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex
                                ? "border-wedding-red"
                                : "border-transparent opacity-60 hover:opacity-100"
                                }`}
                        >
                            {image.isPlaceholder ? (
                                <div className="w-full h-full bg-wedding-cream flex items-center justify-center">
                                    <ImageIcon className="text-wedding-red/30" size={16} />
                                </div>
                            ) : (
                                <img
                                    src={image.src!}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
