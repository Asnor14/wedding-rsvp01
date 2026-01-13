"use client";

import { Suspense } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { VenueSection } from "@/components/landing/VenueSection";
import { DressCodeSection } from "@/components/landing/DressCodeSection";
import { StorySection } from "@/components/landing/StorySection";
import { EntourageSection } from "@/components/landing/EntourageSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { RSVPSection } from "@/components/landing/RSVPSection";
import { Footer } from "@/components/landing/Footer";
import { SectionDots } from "@/components/ui/SectionDots";
import { MusicPlayer } from "@/components/ui/MusicPlayer";

// Loading fallback for RSVPSection
function RSVPFallback() {
  return (
    <section
      id="rsvp"
      className="relative min-h-[70vh] flex items-center justify-center py-16 md:py-24"
    >
      <div className="absolute inset-0 bg-wedding-charcoal" />
      <div className="relative z-10 text-center px-6">
        <h2
          className="text-wedding-ivory text-5xl md:text-6xl lg:text-7xl mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          RSVP
        </h2>
        <p
          className="text-wedding-champagne/60 text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Loading...
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-wedding-charcoal min-h-screen text-wedding-ivory selection:bg-wedding-red/30">
      <Navigation />
      <SectionDots />
      <MusicPlayer />
      <HeroSection />
      <VenueSection />
      <DressCodeSection />
      <StorySection />
      <EntourageSection />
      <GallerySection />
      <Suspense fallback={<RSVPFallback />}>
        <RSVPSection />
      </Suspense>
      <Footer />
    </main>
  );
}
