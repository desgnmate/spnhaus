"use client";

import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import DomeGallery from "@/components/DomeGallery";
import Marquee from "@/components/Marquee";
import FlowingMenu from "@/components/FlowingMenu";
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

const serviceItems = [
    { link: "#", text: "Business Launches", image: "/images/services/Business Launches.webp" },
    { link: "#", text: "Private Events", image: "/images/services/Private Events.webp" },
    { link: "#", text: "Corporate Events", image: "/images/services/Corporate Events.webp" },
    { link: "#", text: "Weddings", image: "/images/services/Weddings.webp" },
    { link: "#", text: "Day & Brunch Parties", image: "/images/services/Day Parties & Brunch Parties.webp" },
    { link: "#", text: "Community Events", image: "/images/services/Community Events:Fundraisers.webp" },
];

export default function Home() {
    return (
        <main className="relative">
            <GrainOverlay />
            <Hero />
            <Intro />
            <section className="relative w-full h-screen bg-black">
                <DomeGallery
                    images={eventImages}
                    fit={0.9}
                    fitBasis="max"
                    minRadius={1000}
                    padFactor={0.08}
                    overlayBlurColor="#000000"
                    imageBorderRadius="15px"
                    openedImageBorderRadius="15px"
                    openedImageWidth="500px"
                    openedImageHeight="600px"
                    grayscale={true}
                    segments={45}
                />
            </section>
            <Marquee />
            <section className="relative w-full h-screen bg-black">
                <FlowingMenu
                    items={serviceItems}
                    textColor="#ffffff"
                    bgColor="#000000"
                    marqueeBgColor="#ffffff"
                    marqueeTextColor="#000000"
                    borderColor="rgba(255,255,255,0.15)"
                    speed={12}
                />
            </section>
            <AboutStrip />
            <Story />
            <Footer />
        </main>
    );
}
