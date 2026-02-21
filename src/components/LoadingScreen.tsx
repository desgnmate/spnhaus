"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const fonts = [
    "var(--font-druk)", // Druk Wide Italic
    "Mayonice",
    "Lucidity",
    "DistortionDosAnalogue",
    "Stab",
    "SisterSpray"
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [currentFontIndex, setCurrentFontIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const currentFont = fonts[currentFontIndex];
    const fontSizeClass = currentFont === "SisterSpray"
        ? "text-4xl md:text-6xl lg:text-7xl"
        : "text-6xl md:text-8xl lg:text-9xl";

    useEffect(() => {
        // Font cycling animation
        const fontInterval = setInterval(() => {
            setCurrentFontIndex((prev) => (prev + 1) % fonts.length);
        }, 100);

        // Timeline for the whole loading sequence
        const tl = gsap.timeline({
            onComplete: () => {
                clearInterval(fontInterval);
                if (onComplete) onComplete();
            }
        });

        // Stay visible, then fade text out before screen exits
        tl.to(containerRef.current, {
            opacity: 1,
            duration: 4.2,
        });

        tl.to(textRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });

        // Fade out animation
        tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
        });

        return () => {
            clearInterval(fontInterval);
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
            <div 
                className="absolute inset-0 opacity-4 pointer-events-none bg-center bg-cover"
                style={{ backgroundImage: "url(/Texturelabs_Grunge_226M.jpg)" }}
            />

            {/* Centered Text */}
            <h1 
                ref={textRef}
                className={`text-white uppercase tracking-wider text-center relative z-10 ${fontSizeClass}`}
                style={{ 
                    fontFamily: currentFont,
                    transition: "font-family 0s"
                }}
            >
                SPNHAUS
            </h1>
        </div>
    );
}
