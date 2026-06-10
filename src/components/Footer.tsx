"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Parallax effect for the image
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
                    src="/images/footer-bg.webp"
                    alt="Crowd background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 px-6 md:px-12">

                {/* Large SPNHAUS Image */}
                <div
                    ref={textRef}
                    className="w-full flex justify-center items-end mb-8"
                >
                    <img
                        src="/SPNHAUS.webp"
                        alt="SPNHAUS"
                        className="w-full h-auto"
                    />
                </div>

                {/* Bottom Bar Info */}
                <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-8">
                    {/* Credit */}
                    <a
                        href="https://www.desgnmate.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base md:text-lg font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide text-center"
                    >
                        Designed and Developed by www.desgnmate.com
                    </a>

                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <a
                            href="mailto:hello@spnhaus.com"
                            className="text-base md:text-lg font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
                        >
                            hello@spnhaus.com
                        </a>
                        <a
                            href="https://www.instagram.com/spnhaus/"
                            className="text-base md:text-lg font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
                        >
                            FOLLOW US ON INSTAGRAM
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
