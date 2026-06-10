"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Intro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (textRef.current && containerRef.current) {
                const words = textRef.current.querySelectorAll(".word");

                // Initial state
                gsap.set(words, { opacity: 0, filter: "blur(10px)" });

                // Create a timeline that is controlled by the ScrollTrigger
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",      // Start when the top of section hits top of viewport
                        end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 0.6 : 1.5)}`, // Shorter pin on mobile
                        pin: true,             // Pin the section
                        scrub: window.innerWidth < 768 ? false : 1, // Disable scrub on mobile for faster scroll
                        fastScrollEnd: true,   // Snap to end on fast scrolls
                        pinSpacing: window.innerWidth < 768 ? false : true, // No extra spacing on mobile
                        anticipatePin: 1,
                    }
                });

                // Animate words to opacity 1 and clear blur sequentially
                tl.to(words, {
                    opacity: 1,
                    filter: "blur(0px)",
                    stagger: window.innerWidth < 768 ? 0.04 : 0.1, // Faster stagger on mobile
                    duration: window.innerWidth < 768 ? 0.5 : 1,
                    ease: "power2.out"
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const content = "SPNHAUS is a DJ collective that brings music to spaces with intention. We throw curated events in unique spots from art galleries to arcades, we're always focused on good sound, good energy, and good people.";

    // Split text but keep SPNHAUS separate if needed, or just split by space
    const words = content.split(" ");

    return (
        <section
            ref={containerRef}
            className="relative bg-black h-screen flex items-center justify-center px-6 md:px-12"
        >
            <div className="max-w-4xl mx-auto text-center">
                <p
                    ref={textRef}
                    className="text-lg md:text-2xl lg:text-3xl font-bold leading-relaxed text-white font-sora"
                >
                    {words.map((word, i) => {
                        const isBrandName = word === "SPNHAUS";
                        return (
                            <span
                                key={i}
                                className={`word inline-block mr-[0.25em] ${isBrandName ? "text-white" : "text-white/90"}`}
                            >
                                {word}
                            </span>
                        );
                    })}
                </p>
            </div>
        </section>
    );
}
