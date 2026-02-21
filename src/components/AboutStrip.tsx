"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const team = [
    {
        src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80",
        name: "ALEX CHEN",
        role: "FOUNDER / DJ"
    },
    {
        src: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=500&q=80",
        name: "SARAH WU",
        role: "CREATIVE DIRECTOR"
    },
    {
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80",
        name: "MARCUS LEE",
        role: "AUDIO ENGINEER"
    },
    {
        src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&q=80",
        name: "JESSICA KIM",
        role: "EVENT MANAGER"
    },
    {
        src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
        name: "DAVID PARK",
        role: "LIGHTING DESIGNER"
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
                            <h3 className="text-white font-druk text-xl md:text-2xl uppercase tracking-wide mb-1">
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
                                style={{ filter: "grayscale(100%) brightness(0.7)" }}
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
