"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const subtextRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const [showLogo, setShowLogo] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Register ScrollTrigger
            gsap.registerPlugin(ScrollTrigger);

            // Background scale-in
            gsap.from(bgRef.current, {
                scale: 1.15,
                duration: 2,
                ease: "power3.out",
            });

            // Title staggered letter animation
            if (titleRef.current) {
                const letters = titleRef.current.querySelectorAll(".hero-letter");
                gsap.from(letters, {
                    y: 80,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.06,
                    delay: 0.3,
                });
            }

            // Nav links fade in
            if (navRef.current) {
                gsap.from(navRef.current.querySelectorAll("a"), {
                    y: -20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.08,
                    delay: 0.8,
                });
            }

            // Subtext fade
            if (subtextRef.current) {
                gsap.from(subtextRef.current.children, {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.2,
                    delay: 1.2,
                });
            }

            // Logo visibility based on scroll
            gsap.registerPlugin(ScrollTrigger);

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "bottom top",
                end: "bottom top",
                onEnter: () => setShowLogo(true),
                onLeaveBack: () => setShowLogo(false),
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const titleLetters = "SPNHAUS".split("");

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden bg-black"
        >
            {/* Background Image */}
            <div ref={bgRef} className="absolute inset-0 z-0">
                <img
                    src="/images/hero-bg.webp"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80";
                    }}
                    alt="Crowd dancing background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
            </div>

            {/* Navigation */}
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 pt-5 md:pt-8 w-full mix-blend-difference"
            >
                {/* Left: HOME or SPNHAUS Logo */}
                <div className={`flex items-center transition-opacity duration-300 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="block h-4 md:h-5 hover:opacity-80 transition-opacity"
                    >
                        <img
                            src="/SPNHAUS.webp"
                            alt="SPNHAUS"
                            className="h-full w-auto"
                        />
                    </a>
                </div>

                {/* Mobile Menu */}
                <MobileMenu />

                {/* Right: ACADEMY, CONTACT, BOOK NOW - Hidden on mobile */}
                <div className="hidden md:flex gap-6 md:gap-10">
                    <Link
                        href="/academy"
                        className="link-hover text-[10px] md:text-xs tracking-[0.2em] font-medium text-white/80 hover:text-white transition-colors uppercase font-sora"
                    >
                        ACADEMY
                    </Link>
                    <Link
                        href="/contact"
                        className="link-hover text-[10px] md:text-xs tracking-[0.2em] font-medium text-white/80 hover:text-white transition-colors uppercase font-sora"
                    >
                        CONTACT
                    </Link>
                    <Link
                        href="/book"
                        className="link-hover text-[10px] md:text-xs tracking-[0.2em] font-medium text-white/80 hover:text-white transition-colors uppercase font-sora"
                    >
                        BOOK NOW
                    </Link>
                </div>
            </nav>

            {/* Hero Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center md:justify-start items-center pt-16 md:pt-24">
                {/* Main Title Image */}
                <div
                    ref={titleRef}
                    className="hero-title relative z-10 w-full px-4 md:px-8"
                >
                    <img
                        src="/SPNHAUS.webp"
                        alt="SPNHAUS"
                        className="w-full h-auto"
                    />
                </div>

                {/* Subtitles */}
                    <div
                        ref={subtextRef}
                        className="w-full flex justify-center md:justify-between mt-2 px-4 md:px-8 relative z-0"
                    >
                        <span className="md:hidden text-[10px] tracking-[0.2em] text-white/60 font-medium uppercase text-center">
                            CURATING PLAYLISTS ANYWHERE AND EVERYWHERE.
                        </span>
                        <span className="hidden md:inline text-[10px] md:text-xs tracking-[0.2em] text-white/60 font-medium uppercase">
                            CURATING PLAYLISTS
                        </span>
                        <span className="hidden md:inline text-[10px] md:text-xs tracking-[0.2em] text-white/60 font-medium uppercase text-right">
                            ANYWHERE AND EVERYWHERE.
                        </span>
                    </div>
            </div>
        </section>
    );
}
