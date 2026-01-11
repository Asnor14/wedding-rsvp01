"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MapPin,
  Clock,
  Utensils,
  X,
  Menu,
  Heart,
  ExternalLink,
  Camera,
} from "lucide-react";
import { submitRSVP } from "./actions";

// ============================================================================
// PLACEHOLDER IMAGE COMPONENT
// ============================================================================
interface PlaceholderImageProps {
  className?: string;
  label?: string;
  variant?: "hero" | "venue" | "story" | "gallery" | "rsvp";
}

function PlaceholderImage({ className = "", label = "Image", variant = "gallery" }: PlaceholderImageProps) {
  const gradients = {
    hero: "from-wedding-charcoal via-wedding-slate to-wedding-charcoal",
    venue: "from-wedding-sage via-wedding-cream to-wedding-rose",
    story: "from-wedding-rose via-wedding-blush to-wedding-champagne",
    gallery: "from-wedding-champagne via-wedding-pearl to-wedding-cream",
    rsvp: "from-wedding-charcoal via-wedding-slate to-wedding-dove",
  };

  return (
    <div className={`bg-gradient-to-br ${gradients[variant]} flex items-center justify-center ${className}`}>
      <div className="text-center opacity-50">
        <Camera className="mx-auto mb-2 text-wedding-gold" size={32} />
        <p className="text-xs tracking-widest uppercase text-wedding-dove" style={{ fontFamily: "var(--font-body)" }}>
          {label}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================
function Navigation() {
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
                  className={`text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:text-wedding-gold relative group ${isScrolled ? "text-wedding-charcoal" : "text-wedding-ivory"
                    }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-wedding-gold transition-all duration-300 group-hover:w-full group-hover:left-0" />
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
              B <span className="text-wedding-gold">&</span> G
            </a>

            {/* Desktop Right Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.slice(3).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:text-wedding-gold relative group ${isScrolled ? "text-wedding-charcoal" : "text-wedding-ivory"
                    }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-wedding-gold transition-all duration-300 group-hover:w-full group-hover:left-0" />
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
              className="absolute top-6 right-6 text-wedding-ivory p-2 hover:text-wedding-gold transition-colors"
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
                  className="text-wedding-ivory text-3xl tracking-widest hover:text-wedding-gold transition-colors"
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

// ============================================================================
// COUNTDOWN COMPONENT
// ============================================================================
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2025-12-31T16:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 md:gap-8 mt-8">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            key={unit.value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-wedding-ivory text-3xl md:text-5xl lg:text-6xl font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {String(unit.value).padStart(2, "0")}
          </motion.div>
          <p
            className="text-wedding-champagne/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {unit.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection() {
  return (
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
          December 31, 2025
        </motion.p>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-wedding-ivory text-5xl md:text-7xl lg:text-9xl tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Name{" "}
          <span className="text-wedding-gold inline-block mx-2 md:mx-4">&</span>{" "}
          Name
        </motion.h1>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-wedding-pearl/90 text-base md:text-xl lg:text-2xl italic font-light max-w-2xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          &ldquo;Two souls, one heart, forever intertwined&rdquo;
        </motion.p>

        {/* Countdown */}
        <Countdown />

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
  );
}

// ============================================================================
// VENUE SECTION
// ============================================================================
function VenueSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="venue" className="grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* Left - Image Placeholder */}
      <motion.div
        className="relative h-[400px] md:h-auto md:min-h-[600px] overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div style={{ y }} className="absolute inset-0">
          <PlaceholderImage
            className="w-full h-full"
            label="Venue Photo"
            variant="venue"
          />
        </motion.div>
      </motion.div>

      {/* Right - Content */}
      <motion.div
        className="bg-wedding-cream px-6 md:px-12 lg:px-20 py-12 md:py-16 lg:py-24 flex flex-col justify-center"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Label */}
        <p
          className="text-wedding-gold text-xs tracking-[0.3em] mb-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          THE VENUE
        </p>

        {/* Venue Name */}
        <h2
          className="text-wedding-charcoal text-3xl md:text-4xl lg:text-5xl mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Château de Lumière
        </h2>

        {/* Separator */}
        <div className="w-16 h-[1px] bg-wedding-gold mb-8" />

        {/* Details */}
        <div className="space-y-6 mb-10">
          <div className="flex items-start gap-4">
            <MapPin className="text-wedding-gold mt-1 flex-shrink-0" size={20} />
            <div>
              <p
                className="text-wedding-slate text-sm md:text-base"
                style={{ fontFamily: "var(--font-body)" }}
              >
                123 Elegance Avenue
                <br />
                Beverly Hills, CA 90210
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="text-wedding-gold mt-1 flex-shrink-0" size={20} />
            <div>
              <p
                className="text-wedding-charcoal font-medium text-sm mb-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Ceremony
              </p>
              <p
                className="text-wedding-slate text-sm md:text-base"
                style={{ fontFamily: "var(--font-body)" }}
              >
                4:00 PM
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Utensils className="text-wedding-gold mt-1 flex-shrink-0" size={20} />
            <div>
              <p
                className="text-wedding-charcoal font-medium text-sm mb-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Reception
              </p>
              <p
                className="text-wedding-slate text-sm md:text-base"
                style={{ fontFamily: "var(--font-body)" }}
              >
                6:30 PM
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-wedding-gold text-wedding-gold px-8 py-3 md:px-10 md:py-4 text-xs tracking-[0.2em] uppercase hover:bg-wedding-gold hover:text-white transition-all duration-300 w-fit"
          style={{ fontFamily: "var(--font-body)" }}
        >
          View on Map
          <ExternalLink size={14} />
        </a>
      </motion.div>
    </section>
  );
}

// ============================================================================
// OUR STORY SECTION
// ============================================================================
function StorySection() {
  const storyImages = [
    { label: "Couple Portrait" },
    { label: "Photo 1" },
    { label: "Photo 2" },
    { label: "Photo 3" },
    { label: "Photo 4" },
  ];

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
            className="text-wedding-charcoal text-4xl md:text-5xl lg:text-6xl mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            How We Met
          </h2>
          <div className="w-16 h-[1px] bg-wedding-gold mx-auto" />
        </motion.div>

        {/* Narrative */}
        <motion.div
          className="text-center space-y-6 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p
            className="text-wedding-slate text-base md:text-lg lg:text-xl leading-relaxed font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            It was a crisp autumn evening in 2019 when our paths first crossed at a
            mutual friend&apos;s art gallery opening. Brianna was captivated by a
            painting, and Gabriel, working up the courage to introduce himself,
            offered his interpretation of the piece. Little did they know, that
            conversation would be the first of many that would last until dawn.
          </p>
          <p
            className="text-wedding-slate text-base md:text-lg lg:text-xl leading-relaxed font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            What started as shared laughter over coffee dates quickly blossomed into
            something deeper. Through adventures near and far, quiet Sunday mornings,
            and dreams whispered under starlit skies, they discovered in each other a
            love that felt both exhilarating and like coming home.
          </p>
          <p
            className="text-wedding-slate text-base md:text-lg lg:text-xl leading-relaxed font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Now, five years and countless memories later, they&apos;re ready to begin
            their greatest adventure yet—building a life together, forever.
          </p>
        </motion.div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {storyImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-md ${index === 0 ? "col-span-2 row-span-2" : ""
                }`}
            >
              <div
                className={`relative ${index === 0 ? "aspect-[4/5]" : "aspect-square"
                  } overflow-hidden`}
              >
                <PlaceholderImage
                  className="w-full h-full hover:scale-105 transition-all duration-500"
                  label={image.label}
                  variant="story"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ENTOURAGE SECTION
// ============================================================================
function EntourageSection() {
  const entourageData = {
    principalSponsors: {
      title: "Principal Sponsors",
      members: [
        "Name",
        "Name",
        "Name",
        "Name",
        "Name",
        "Name",
      ],
    },
    secondarySponsors: {
      title: "Secondary Sponsors",
      subtitle: "Candle, Veil & Cord",
      members: [
        "Name",
        "Name",
        "Name",
        "Name",
      ],
    },
    bridesmaids: {
      title: "Bridesmaids",
      members: [
        "Name",
        "Name",
        "Name",
        "Name",
        "Name",
        "Name",
      ],
    },
    groomsmen: {
      title: "Groomsmen",
      members: [
        "Name",
        "Name",
        "Name",
        "Name",
        "Name",
        "Name",
      ],
    },
  };

  return (
    <section id="entourage" className="bg-wedding-blush">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 lg:py-32">
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
            OUR ENTOURAGE
          </p>
          <h2
            className="text-wedding-charcoal text-4xl md:text-5xl lg:text-6xl mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Those Who Stand With Us
          </h2>
          <div className="w-16 h-[1px] bg-wedding-gold mx-auto" />
        </motion.div>

        {/* Groups */}
        <div className="space-y-12 md:space-y-16">
          {Object.values(entourageData).map((group, groupIndex) => (
            <motion.div
              key={group.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
            >
              <h3
                className="text-wedding-charcoal text-xl md:text-2xl lg:text-3xl mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {group.title}
              </h3>
              {"subtitle" in group && (
                <p
                  className="text-wedding-dove text-sm italic mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {group.subtitle}
                </p>
              )}
              {!("subtitle" in group) && <div className="mb-6" />}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 max-w-3xl mx-auto">
                {group.members.map((member, index) => (
                  <p
                    key={index}
                    className="text-wedding-slate text-sm md:text-base py-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {member}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// GALLERY SECTION
// ============================================================================
function GallerySection() {
  const galleryImages = [
    { label: "Garden Dreams" },
    { label: "First Dance" },
    { label: "Details" },
    { label: "Forever Yours" },
    { label: "Blushing Blooms" },
    { label: "Celebration" },
    { label: "Sweet Moments" },
    { label: "Golden Hour" },
    { label: "Journey Together" },
    { label: "Our Venue" },
  ];

  return (
    <section id="gallery" className="bg-wedding-ivory">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32">
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
            MOMENTS
          </p>
          <h2
            className="text-wedding-charcoal text-4xl md:text-5xl lg:text-6xl mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our Gallery
          </h2>
          <div className="w-16 h-[1px] bg-wedding-gold mx-auto" />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-md cursor-pointer ${index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
            >
              <div
                className={`relative ${index === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square"
                  } overflow-hidden`}
              >
                <PlaceholderImage
                  className="w-full h-full group-hover:scale-[1.02] transition-all duration-500"
                  label={image.label}
                  variant="gallery"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-wedding-charcoal/0 group-hover:bg-wedding-charcoal/40 transition-all duration-500 flex items-center justify-center">
                  <p
                    className="text-wedding-ivory text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {image.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONFETTI COMPONENT
// ============================================================================
function Confetti() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: ["#D4AF6F", "#F7E7CE", "#E8D5D0", "#D4D9D0", "#C5A572"][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: `${piece.left}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            rotate: 360 + Math.random() * 360,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear",
          }}
          className="absolute w-3 h-3"
          style={{
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// RSVP CONFIRMATION MODAL
// ============================================================================
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    guests: string;
    attending: string;
    message: string;
  };
  showConfetti: boolean;
}

function ConfirmationModal({ isOpen, onClose, formData, showConfetti }: ConfirmationModalProps) {
  if (!isOpen) return null;

  const isAttending = formData.attending === "yes";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {showConfetti && <Confetti />}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[150] flex items-center justify-center p-6"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-wedding-cream border border-wedding-gold/30 rounded-xl p-8 md:p-12 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Heart
                    className={`mx-auto mb-4 ${isAttending ? "text-wedding-gold" : "text-wedding-dove"}`}
                    size={48}
                    fill="currentColor"
                  />
                </motion.div>
                <h3
                  className="text-wedding-charcoal text-3xl md:text-4xl mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {isAttending ? "See You There!" : "We'll Miss You!"}
                </h3>
                <p
                  className="text-wedding-slate text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {isAttending
                    ? "Thank you for confirming your attendance!"
                    : "Thank you for letting us know."}
                </p>
              </div>

              {/* Event Details */}
              {isAttending && (
                <div className="bg-wedding-pearl/50 rounded-lg p-6 mb-6">
                  <h4
                    className="text-wedding-gold text-xs tracking-[0.2em] uppercase mb-4"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Event Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-wedding-gold mt-0.5 flex-shrink-0" size={16} />
                      <div>
                        <p className="text-wedding-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
                          Château de Lumière
                        </p>
                        <p className="text-wedding-slate text-xs" style={{ fontFamily: "var(--font-body)" }}>
                          123 Elegance Avenue, Beverly Hills, CA 90210
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="text-wedding-gold mt-0.5 flex-shrink-0" size={16} />
                      <div>
                        <p className="text-wedding-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
                          December 31, 2025
                        </p>
                        <p className="text-wedding-slate text-xs" style={{ fontFamily: "var(--font-body)" }}>
                          Ceremony: 4:00 PM • Reception: 6:30 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* RSVP Summary */}
              <div className="bg-wedding-pearl/50 rounded-lg p-6 mb-8">
                <h4
                  className="text-wedding-gold text-xs tracking-[0.2em] uppercase mb-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Your RSVP
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Name</span>
                    <span className="text-wedding-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Email</span>
                    <span className="text-wedding-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Guests</span>
                    <span className="text-wedding-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{formData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Response</span>
                    <span className={`text-sm font-medium ${isAttending ? "text-green-600" : "text-wedding-dove"}`} style={{ fontFamily: "var(--font-body)" }}>
                      {isAttending ? "Attending ✨" : "Not Attending"}
                    </span>
                  </div>
                  {formData.message && (
                    <div className="pt-2 mt-2 border-t border-wedding-champagne/30">
                      <span className="text-wedding-slate text-sm block mb-1" style={{ fontFamily: "var(--font-body)" }}>Message</span>
                      <p className="text-wedding-charcoal text-sm italic" style={{ fontFamily: "var(--font-body)" }}>
                        &ldquo;{formData.message}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full bg-wedding-gold text-wedding-charcoal py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-wedding-antique transition-all duration-300 rounded-lg"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// RSVP SECTION
// ============================================================================
function RSVPSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "1",
    attending: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create FormData for server action
      const data = new FormData();
      data.append("fullName", formData.name);
      data.append("email", formData.email);
      data.append("guestCount", formData.guests);
      data.append("attending", formData.attending);
      data.append("message", formData.message);

      const result = await submitRSVP(data);

      if (result.success) {
        if (formData.attending === "yes") {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
        }
        setShowModal(true);
      } else {
        setError(result.message);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        showConfetti={showConfetti}
      />

      <section
        id="rsvp"
        className="relative min-h-screen flex items-center justify-center py-16 md:py-24"
      >
        {/* Background Placeholder */}
        <PlaceholderImage
          className="absolute inset-0 w-full h-full"
          label="RSVP Background"
          variant="rsvp"
        />
        <div className="absolute inset-0 bg-wedding-charcoal/85" />

        {/* Form Card */}
        <motion.div
          className="relative z-10 w-full max-w-2xl mx-6 bg-wedding-pearl/10 backdrop-blur-md border border-wedding-gold/30 rounded-xl p-8 md:p-12 lg:p-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-10 md:mb-12">
            <h2
              className="text-wedding-ivory text-5xl md:text-6xl lg:text-7xl mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              RSVP
            </h2>
            <p
              className="text-wedding-champagne/80 text-sm md:text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Please respond by March 15, 2025
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div>
              <label
                className="block text-wedding-gold text-xs tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Your Full Name <span className="text-wedding-gold">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b-2 border-wedding-champagne/40 text-wedding-ivory py-3 focus:border-wedding-gold focus:outline-none transition-all duration-300 placeholder:text-wedding-champagne/50"
                style={{ fontFamily: "var(--font-body)" }}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-wedding-gold text-xs tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Email Address <span className="text-wedding-gold">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b-2 border-wedding-champagne/40 text-wedding-ivory py-3 focus:border-wedding-gold focus:outline-none transition-all duration-300 placeholder:text-wedding-champagne/50"
                style={{ fontFamily: "var(--font-body)" }}
                placeholder="your.email@example.com"
              />
            </div>

            {/* Number of Guests */}
            <div>
              <label
                className="block text-wedding-gold text-xs tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Number of Guests
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full bg-transparent border-b-2 border-wedding-champagne/40 text-wedding-ivory py-3 focus:border-wedding-gold focus:outline-none transition-all duration-300 cursor-pointer"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <option value="1" className="bg-wedding-charcoal">
                  1 Guest (Just me)
                </option>
                <option value="2" className="bg-wedding-charcoal">
                  2 Guests (Me + 1)
                </option>
              </select>
            </div>

            {/* Attendance - Radio Buttons */}
            <div>
              <label
                className="block text-wedding-gold text-xs tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Will You Attend? <span className="text-wedding-gold">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${formData.attending === "yes"
                    ? "border-wedding-gold bg-wedding-gold/20"
                    : "border-wedding-champagne/30 hover:border-wedding-champagne/60"
                    }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === "yes"}
                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    className="sr-only"
                    required
                  />
                  <Heart
                    className={`${formData.attending === "yes" ? "text-wedding-gold" : "text-wedding-champagne/50"}`}
                    size={20}
                    fill={formData.attending === "yes" ? "currentColor" : "none"}
                  />
                  <span
                    className={`text-sm ${formData.attending === "yes" ? "text-wedding-ivory" : "text-wedding-champagne/70"}`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Joyfully Accepting
                  </span>
                </label>

                <label
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${formData.attending === "no"
                    ? "border-wedding-dove bg-wedding-dove/20"
                    : "border-wedding-champagne/30 hover:border-wedding-champagne/60"
                    }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === "no"}
                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    className="sr-only"
                  />
                  <X
                    className={`${formData.attending === "no" ? "text-wedding-dove" : "text-wedding-champagne/50"}`}
                    size={20}
                  />
                  <span
                    className={`text-sm ${formData.attending === "no" ? "text-wedding-ivory" : "text-wedding-champagne/70"}`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Regretfully Declining
                  </span>
                </label>
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                className="block text-wedding-gold text-xs tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Message for the Couple (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b-2 border-wedding-champagne/40 text-wedding-ivory py-3 focus:border-wedding-gold focus:outline-none transition-all duration-300 resize-none placeholder:text-wedding-champagne/50"
                style={{ fontFamily: "var(--font-body)" }}
                placeholder="Share your wishes..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500/40 rounded-lg p-4 mb-4"
                >
                  <p
                    className="text-red-300 text-sm text-center"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {error}
                  </p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full md:w-auto bg-wedding-gold text-wedding-charcoal px-12 md:px-16 py-4 md:py-5 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-wedding-antique hover:shadow-2xl"
                  }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send RSVP"
                )}
              </motion.button>
            </div>
          </form>

          {/* Heart Icon */}
          <div className="flex justify-center mt-10">
            <Heart className="text-wedding-gold/50" size={24} fill="currentColor" />
          </div>
        </motion.div>
      </section>
    </>
  );
}

// ============================================================================
// FOOTER
// ============================================================================
function Footer() {
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
          B <span className="text-wedding-gold">&</span> G
        </p>
        <p
          className="text-wedding-dove text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          December 31, 2025
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

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function WeddingPage() {
  return (
    <main className="bg-wedding-ivory">
      <Navigation />
      <HeroSection />
      <VenueSection />
      <StorySection />
      <EntourageSection />
      <GallerySection />
      <RSVPSection />
      <Footer />
    </main>
  );
}
