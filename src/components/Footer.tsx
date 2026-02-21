"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Parallax effect for the text or other animations can go here
            if (textRef.current) {
                gsap.from(textRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer 
            id="contact"
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-black text-white"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 grayscale">
                <img 
                    src="/images/footer-bg.jpg" 
                    alt="Crowd background" 
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 px-6 md:px-12">
                
                {/* Large SPNHAUS Text */}
                <div 
                    ref={textRef}
                    className="w-full flex justify-center items-end"
                >
                    <h1 
                        className="font-druk font-black text-white leading-none tracking-tight w-full text-center"
                        style={{
                            fontSize: "clamp(60px, 22vw, 235px)",
                            marginBottom: "-0.05em"
                        }}
                    >
                        SPNHAUS
                    </h1>
                </div>

                {/* Bottom Bar Info */}
                <div className="w-full flex flex-col md:flex-row justify-between items-end md:items-center mt-4 md:mt-0 gap-8">
                    {/* Mission Text */}
                    <p className="max-w-md text-sm md:text-base font-medium text-gray-300 leading-snug">
                        SPNHAUS’ mission is to merge music, art, culture, and storytelling into one connected ecosystem.
                    </p>

                    <a 
                        href="https://www.instagram.com/spnhaus/"
                        className="text-base md:text-lg font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
                    >
                        FOLLOW US ON INSTAGRAM
                    </a>
                </div>
            </div>
        </footer>
    );
}
