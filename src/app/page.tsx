"use client";

import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import DomeGallery from "@/components/DomeGallery";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import AboutStrip from "@/components/AboutStrip";
import Story from "@/components/Story";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";

const eventImages = [
    { src: "/images/events/akiras-arcade.webp", alt: "AKIRA'S ARCADE event" },
    { src: "/images/events/howler.webp", alt: "HOWLER event" },
    { src: "/images/about/Jkongerz.webp", alt: "SPNHAUS DJ performing" },
    { src: "/images/about/Lec.webp", alt: "SPNHAUS DJ set" },
    { src: "/images/about/Tole.webp", alt: "SPNHAUS live performance" },
    { src: "/images/about/Sochu.webp", alt: "SPNHAUS event crowd" },
    { src: "/images/about/5600k.webp", alt: "SPNHAUS party" },
    { src: "/images/services/Corporate Events.webp", alt: "Corporate event" },
    { src: "/images/services/Weddings.webp", alt: "Wedding event" },
    { src: "/images/services/Private Events.webp", alt: "Private event" },
    { src: "/images/services/Business Launches.webp", alt: "Business launch" },
    { src: "/images/services/Day Parties & Brunch Parties.webp", alt: "Day party" },
    { src: "/images/services/Community Events:Fundraisers.webp", alt: "Community event" },
    { src: "/SPNHAUS.webp", alt: "SPNHAUS" },
];

export default function Home() {
    return (
        <main className="relative">
            <GrainOverlay />
            <Hero />
            <Intro />
            <section className="relative w-full h-screen bg-black">
                <span className="absolute top-24 md:top-32 left-6 md:left-12 z-10 text-[10px] tracking-[0.2em] text-white/30 font-medium uppercase font-sora">
                    PAST EVENTS
                </span>
                <div className="absolute top-24 md:top-32 left-6 md:left-12 z-10 mt-6 w-8 h-px bg-white/15" />
                <DomeGallery
                    images={eventImages}
                    fit={0.75}
                    fitBasis="max"
                    minRadius={800}
                    padFactor={0.15}
                    overlayBlurColor="#000000"
                    imageBorderRadius="20px"
                    openedImageBorderRadius="20px"
                    openedImageWidth="400px"
                    openedImageHeight="500px"
                    grayscale={true}
                    segments={40}
                />
            </section>
            <Marquee />
            <Services />
            <AboutStrip />
            <Story />
            <Footer />
        </main>
    );
}
