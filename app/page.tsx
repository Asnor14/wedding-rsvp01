"use client";

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

export default function Home() {
  return (
    <main className="bg-wedding-charcoal min-h-screen text-wedding-ivory selection:bg-wedding-gold/30">
      <Navigation />
      <SectionDots />
      <MusicPlayer />
      <HeroSection />
      <VenueSection />
      <DressCodeSection />
      <StorySection />
      <EntourageSection />
      <GallerySection />
      <RSVPSection />
      <Footer />
    </main>
  );
}
