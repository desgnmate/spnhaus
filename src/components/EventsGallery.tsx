"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const events = [
    {
        title: "AKIRA'S ARCADE",
        image: "/images/events/akiras-arcade.webp",
    },
    {
        title: "HOWLER",
        image: "/images/events/howler.webp",
    },
    {
        title: "AKIRA'S ARCADE",
        image: "/images/events/akiras-arcade.webp",
    },
    {
        title: "HOWLER",
        image: "/images/events/howler.webp",
    },
];

export default function EventsGallery() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const cards = sectionRef.current?.querySelectorAll(".event-card");
            if (cards) {
                cards.forEach((card, index) => {
                    gsap.from(card, {
                        y: 60,
                        opacity: 0,
                        filter: "blur(10px) grayscale(100%)",
                        scale: 0.95,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: index * 0.15,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    });
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-black py-24 md:py-32 px-6 md:px-12 w-full relative overflow-hidden">
            <div className="mb-16">
                <span className="text-[10px] tracking-[0.2em] text-white/30 font-medium uppercase block mb-4">
                    PAST EVENTS
                </span>
                <div className="w-8 h-px bg-white/15" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-6 w-full">
                {events.map((event, i) => (
                    <div
                        key={i}
                        className="event-card group cursor-pointer"
                    >
                        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-3">
                            <div className="relative overflow-hidden aspect-3/4 mb-4">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="object-cover img-zoom"
                                    style={{ filter: "grayscale(100%) brightness(0.7)" }}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>
                            <h3 className="text-sm tracking-[0.15em] font-medium text-white/70 group-hover:text-white transition-colors duration-300">
                                {event.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
