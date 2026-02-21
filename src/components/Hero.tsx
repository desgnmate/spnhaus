"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const subtextRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Register ScrollTrigger
            gsap.registerPlugin(ScrollTrigger);

            // Toggle logo on scroll
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "bottom top", // Trigger when bottom of hero hits top of viewport
                endTrigger: "html",
                end: "bottom bottom",
                onEnter: () => setShowLogo(true),
                onLeaveBack: () => setShowLogo(false),
            });
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

            // Parallax on scroll
            gsap.registerPlugin(ScrollTrigger);

            gsap.to(bgRef.current, {
                y: 150,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.to(titleRef.current, {
                y: 80,
                opacity: 0,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "60% top",
                    scrub: true,
                },
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
                    src="/images/hero-bg.jpg"
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
                className="fixed top-0 left-0 right-0 z-50 flex justify-between items-start px-6 md:px-12 pt-8 w-full mix-blend-difference"
            >
                {/* Left: HOME or SPNHAUS Logo */}
                <div className="flex items-center h-6">
                    {showLogo ? (
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="font-druk italic text-xl md:text-2xl tracking-normal text-white hover:opacity-80 transition-opacity"
                        >
                            SPNHAUS
                        </a>
                    ) : (
                        <a
                            href="#"
                            className="link-hover text-[10px] md:text-xs tracking-[0.2em] font-medium text-white/80 hover:text-white transition-colors"
                        >
                            HOME
                        </a>
                    )}
                </div>

                {/* Right: CONTACT, FOLLOW US, BOOK NOW */}
                <div className="flex gap-6 md:gap-10">
                    <a
                        href="/contact"
                        className="link-hover text-[10px] md:text-xs tracking-[0.2em] font-medium text-white/80 hover:text-white transition-colors"
                    >
                        CONTACT
                    </a>
                    <a
                        href="#"
                        className="link-hover text-[10px] md:text-xs tracking-[0.2em] font-medium text-white/80 hover:text-white transition-colors"
                    >
                        FOLLOW US
                    </a>
                    <a
                        href="/book"
                        className="link-hover text-[10px] md:text-xs tracking-[0.2em] font-medium text-white/80 hover:text-white transition-colors"
                    >
                        BOOK NOW
                    </a>
                </div>
            </nav>

            {/* Hero Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-start items-center px-6 md:px-12 pt-16 md:pt-24">
                {/* Main Title */}
                <h1
                    ref={titleRef}
                    className="flex overflow-hidden relative z-10 w-full justify-center font-druk py-2"
                    style={{
                        fontSize: "clamp(60px, 18vw, 230px)",
                        fontWeight: 900,
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                        color: "#FFFFFF",
                    }}
                >
                    {titleLetters.map((letter, i) => (
                        <span key={i} className="hero-letter inline-block transform-gpu">
                            {letter}
                        </span>
                    ))}
                </h1>

                {/* Subtitles */}
                <div 
                    ref={subtextRef}
                    className="w-full flex justify-between mt-2 relative z-0"
                >
                    <span className="text-[10px] md:text-xs tracking-[0.2em] text-white/60 font-medium uppercase">
                        CURATING PLAYLISTS
                    </span>
                    <span className="text-[10px] md:text-xs tracking-[0.2em] text-white/60 font-medium uppercase text-right">
                        ANYWHERE AND EVERYWHERE.
                    </span>
                </div>
            </div>
        </section>
    );
}
