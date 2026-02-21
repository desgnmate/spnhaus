"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const team = [
    {
        src: "/images/about/Lec.jpg",
        name: "SOME GUY NAMED LEC",
        role: "FOUNDER / DJ"
    },
    {
        src: "/images/about/Tole.jpg",
        name: "TOLE",
        role: "DJ"
    },
    {
        src: "/images/about/Sochu.jpg",
        name: "SOCHU",
        role: "DJ"
    },
    {
        src: "/images/about/5600k.jpg",
        name: "5600K",
        role: "DJ"
    },
    {
        src: "/images/about/Jkongerz.jpg",
        name: "JKONGERZ",
        role: "DJ"
    },
];

export default function AboutStrip() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Horizontal text shift on scroll
            if (textRef.current) {
                gsap.fromTo(textRef.current, 
                    { x: 0 },
                    {
                        x: 0, // Keep static or add subtle movement if desired
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            }

            // Images subtle scale on scroll
            const imgs = sectionRef.current?.querySelectorAll(".strip-img");
            imgs?.forEach((img) => {
                gsap.from(img, {
                    scale: 1.1,
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-black w-full overflow-hidden h-screen"
        >
            {/* Image strip */}
            <div className="flex gap-0 w-full h-full">
                {team.map((member, i) => (
                    <div key={i} className="group relative flex-1 overflow-hidden h-full border-r border-white/10 last:border-r-0">
                        {/* Hidden Text Revealed on Hover */}
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-0 flex flex-col justify-end h-[200px]">
                            <h3
                                className={`text-white font-druk uppercase tracking-wide mb-1 ${
                                    member.name === "SOME GUY NAMED LEC"
                                        ? "text-sm md:text-base tracking-tight"
                                        : "text-xl md:text-2xl"
                                }`}
                            >
                                {member.name}
                            </h3>
                            <p className="text-white/60 font-medium text-xs md:text-sm tracking-widest uppercase">
                                {member.role}
                            </p>
                        </div>

                        {/* Image Container that slides up */}
                        <div className="relative w-full h-full z-10 transition-transform duration-500 ease-out group-hover:-translate-y-[120px] bg-black">
                            <img
                                src={member.src}
                                alt={member.name}
                                className="strip-img w-full h-full object-cover"
                                style={{
                                    filter: "grayscale(100%) brightness(0.7)",
                                    transform: member.name === "5600K" ? "scale(1.2)" : undefined
                                }}
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Overlay text */}
            <div
                ref={textRef}
                className="absolute inset-0 flex items-start justify-center pointer-events-none mix-blend-exclusion z-20 pt-[10vh]"
            >
                <span
                    className="whitespace-nowrap font-druk text-white"
                    style={{
                        fontSize: "clamp(60px, 15vw, 215px)",
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        lineHeight: 1,
                    }}
                >
                    ABOUT US
                </span>
            </div>
        </section>
    );
}
