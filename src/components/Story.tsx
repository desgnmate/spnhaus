"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const backgroundImages = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
];

const hashString = (value: string) => {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
        hash = (hash << 5) - hash + value.charCodeAt(i);
        hash |= 0;
    }
    return hash >>> 0;
};

const seededRandom = (seed: number) => {
    let t = seed + 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const imageConfigs = backgroundImages.map((src, index) => {
    const baseSeed = hashString(`${src}-${index}`);
    const randomA = seededRandom(baseSeed);
    const randomB = seededRandom(baseSeed + 1);
    const randomC = seededRandom(baseSeed + 2);
    const isLeft = randomA > 0.5;
    const randomX = isLeft ? randomB * 15 : 85 + randomB * 15;
    const depth = randomC;
    const size = 8 + depth * 7;
    const blur = (1 - depth) * 4;
    const brightness = 0.3 + depth * 0.4;
    const zIndex = Math.floor(depth * 50);

    return {
        src,
        randomX,
        size,
        blur,
        brightness,
        zIndex
    };
});

const paragraph1Text = "It started as a spark — a few friends, a couple of decks, and a dream that music could make people feel at home again. Not the home you grew up in, but the one you find later — the one that feels like exhaling after holding your breath too long.";
const paragraph2TextStart = "SPNHAUS grew from moments that quietly became memories:";
const paragraph2TextHighlight = "late-night mixes into sunrise, inside jokes into family lore, small wins that felt huge because we shared them.";

export default function Story() {
    const sectionRef = useRef<HTMLElement>(null);
    const outlineRef = useRef<HTMLSpanElement>(null);
    const paragraph1Ref = useRef<HTMLParagraphElement>(null);
    const paragraph2Ref = useRef<HTMLParagraphElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768;

            // Text fade-in function
            const animateText = (element: HTMLElement) => {
                const spans = element.querySelectorAll("span[data-word]");
                return gsap.to(spans, {
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: isMobile ? 0.5 : 0.8,
                    stagger: isMobile ? 0.01 : 0.02,
                    ease: "power2.out"
                });
            };

            // Background Image Animation Loop (Independent of Scroll) - Skip on mobile
            if (!isMobile) {
                const bgImages = imagesRef.current?.querySelectorAll(".story-bg-container");
                if (bgImages) {
                    bgImages.forEach((container) => {
                        const randomDuration = 18 + Math.random() * 10; 
                        const randomDelay = -(Math.random() * randomDuration); // Negative delay to start mid-animation
                        
                        gsap.fromTo(container, 
                            { 
                                y: "10vh", // Start just below view
                                opacity: 0,
                                scale: 0.8, 
                            },
                            {
                                y: "-120vh", // Move all the way up past view
                                opacity: 1, 
                                scale: 1,
                                duration: randomDuration,
                                repeat: -1,
                                ease: "none",
                                delay: randomDelay,
                                yoyo: false,
                                keyframes: [
                                    { opacity: 0, duration: 0 },
                                    { opacity: 1, duration: randomDuration * 0.1 }, // Fade in quicker
                                    { opacity: 1, duration: randomDuration * 0.8 }, // Stay visible longer
                                    { opacity: 0, duration: randomDuration * 0.1 }  // Fade out at top
                                ]
                            }
                        );
                    });
                }
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * (isMobile ? 0.5 : 1.5)}`, // Much shorter pin on mobile
                    pin: true,
                    scrub: isMobile ? false : true, // Disable scrub on mobile for instant scroll-through
                    fastScrollEnd: true,
                    pinSpacing: isMobile ? false : true, // No extra spacing on mobile
                    anticipatePin: 1,
                    toggleActions: "play none none reverse",
                }
            });

            // Initial states
            if (outlineRef.current) gsap.set(outlineRef.current, { opacity: 0, y: 50, filter: "blur(10px)" });
            
            // Animation Sequence in Timeline
            
            // 1. Reveal "OUR STORY" (Outlined Text)
            if (outlineRef.current) {
                tl.to(outlineRef.current, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "power2.out"
                });
            }

            // 2. Reveal First Paragraph (Word by Word)
            if (paragraph1Ref.current) {
                const tween = animateText(paragraph1Ref.current);
                tl.add(tween, ">+0.2"); // Explicit positive delay: Wait 0.2s AFTER title finishes
            }

            // 3. Reveal Second Paragraph (Word by Word)
            if (paragraph2Ref.current) {
                const tween = animateText(paragraph2Ref.current);
                tl.add(tween, ">+0.2"); // Explicit positive delay: Wait 0.2s AFTER P1 finishes
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className="bg-black h-screen flex flex-col justify-center items-center px-6 md:px-12 relative overflow-hidden"
        >
                {/* Background Images Container */}
                <div ref={imagesRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ perspective: "1000px" }}>
                    <div className="absolute inset-0 bg-black/50 z-10" /> {/* Adjusted global overlay */}
                    {imageConfigs.map((config, i) => {
                        return (
                            <div
                                key={i}
                                className="story-bg-container absolute"
                                style={{
                                    width: `${config.size}vw`,
                                    height: `${config.size * 1.5}vh`,
                                    left: `${config.randomX}%`,
                                    top: "100%", 
                                    zIndex: config.zIndex,
                                    filter: `blur(${config.blur}px)`,
                                    transform: "translate(-50%, 0px)",
                                }}
                            >
                                <div className="relative w-full h-full overflow-hidden">
                                    <img 
                                        src={config.src}
                                        alt=""
                                        className="w-full h-full object-cover"
                                        style={{
                                            filter: 'grayscale(100%)'
                                        }}
                                    />
                                    {/* Depth Overlay - Darker for further images */}
                                    <div 
                                        className="absolute inset-0 bg-black"
                                        style={{ opacity: 1 - config.brightness }} 
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center space-y-12 md:space-y-16 relative z-10 font-sora">
                    
                    {/* Title: "OUR STORY" */}
                    <div>
                        <span
                            ref={outlineRef}
                            className="block text-white"
                            style={{
                                fontFamily: "var(--font-druk-wide-bold), sans-serif",
                                fontWeight: 700,
                                fontSize: "clamp(20px, 2.5vw, 28px)",
                                textTransform: "uppercase",
                                letterSpacing: "-0.02em",
                                lineHeight: 0.9,
                            }}
                        >
                            OUR STORY
                        </span>
                    </div>

                    {/* Middle: First Paragraph */}
                    <p
                        ref={paragraph1Ref}
                        className="text-base md:text-lg text-white/80 font-light leading-relaxed max-w-2xl mx-auto text-center font-sora"
                    >
                        {paragraph1Text.split(" ").map((word, index, all) => (
                            <span
                                key={`p1-${index}`}
                                data-word
                                className="inline-block opacity-0 blur-sm"
                            >
                                {word}{index < all.length - 1 ? "\u00A0" : ""}
                            </span>
                        ))}
                    </p>

                    {/* Bottom Paragraph */}
                    <p
                        ref={paragraph2Ref}
                        className="text-base md:text-lg text-white/80 font-light leading-relaxed font-sora max-w-2xl mx-auto text-center w-full"
                    >
                        {paragraph2TextStart.split(" ").map((word, index, all) => (
                            <span
                                key={`p2a-${index}`}
                                data-word
                                className="inline-block opacity-0 blur-sm"
                            >
                                {word}{index < all.length - 1 ? "\u00A0" : "\u00A0"}
                            </span>
                        ))}
                        {paragraph2TextHighlight.split(" ").map((word, index, all) => (
                            <span
                                key={`p2b-${index}`}
                                data-word
                                className="inline-block opacity-0 blur-sm text-white/40"
                            >
                                {word}{index < all.length - 1 ? "\u00A0" : ""}
                            </span>
                        ))}
                    </p>

                </div>
            </section>
    );
}
