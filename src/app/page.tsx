"use client";

import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import EventsGallery from "@/components/EventsGallery";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import AboutStrip from "@/components/AboutStrip";
import Story from "@/components/Story";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";

export default function Home() {
  return (
    <main className="relative">
      <CustomCursor />
      <GrainOverlay />
      <Hero />
      <Intro />
      <EventsGallery />
      <Marquee />
      <Services />
      <AboutStrip />
      <Story />
      <Footer />
    </main>
  );
}
