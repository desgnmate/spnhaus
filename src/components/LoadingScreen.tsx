"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const logos = [
    "/loading/SPNHAUS.png",
    "/loading/SPNHAUS-1.png",
    "/loading/SPNHAUS-2.png",
    "/loading/SPNHAUS-3.png",
    "/loading/SPNHAUS-4.png",
    "/loading/SPNHAUS-5.png",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Logo cycling animation
        const logoInterval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % logos.length);
        }, 100);

        // Timeline for the whole loading sequence
        const tl = gsap.timeline({
            onComplete: () => {
                clearInterval(logoInterval);
                if (onComplete) onComplete();
            }
        });

        // Stay visible, then fade image out before screen exits
        tl.to(containerRef.current, {
            opacity: 1,
            duration: 1,
        });

        tl.to(imageRef.current, {
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
            clearInterval(logoInterval);
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

            {/* Centered Logo */}
            <div 
                ref={imageRef}
                className="relative z-10 w-[60vw] md:w-[40vw] lg:w-[30vw] h-auto"
            >
                <Image
                    src={logos[currentIndex]}
                    alt="SPNHAUS"
                    width={800}
                    height={200}
                    priority
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
}
