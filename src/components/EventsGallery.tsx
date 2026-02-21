"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const events = [
    {
        title: "AKIRA'S ARCADE",
        image:
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80",
    },
    {
        title: "MIDNIGHT SESSIONS",
        image:
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&q=80",
    },
    {
        title: "ROOFTOP VIBES",
        image:
            "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=700&q=80",
    },
    {
        title: "WAREHOUSE 808",
        image:
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&q=80",
    },
];

export default function EventsGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (wrapperRef.current && containerRef.current) {
                const scrollWidth = wrapperRef.current.scrollWidth;
                const clientWidth = containerRef.current.clientWidth;
                // Add padding buffer (96px = 48px left + 48px right approx) to ensure last card clears the edge
                const paddingBuffer = 96; 
                const x = -(scrollWidth - clientWidth + paddingBuffer);

                const scrollTween = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: `+=${(scrollWidth + paddingBuffer) * 1.2}`, // Increase total scroll distance to accommodate pause
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                scrollTween.fromTo(wrapperRef.current, 
                    { x: clientWidth },
                    {
                        x: x,
                        ease: "none",
                        duration: 1
                    }
                );

                // Add a pause at the end to lock cards in place before unpinning
                scrollTween.to({}, { duration: 0.2 });

                // Add blur/fade effect to cards as they enter view
                const cards = wrapperRef.current.querySelectorAll(".event-card");
                cards.forEach((card) => {
                    gsap.fromTo(card, 
                        { 
                            opacity: 0, 
                            filter: "blur(10px) grayscale(100%)",
                            scale: 0.9 
                        },
                        {
                            opacity: 1,
                            filter: "blur(0px) grayscale(0%)",
                            scale: 1,
                            duration: 0.5,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: scrollTween,
                                start: "left 95%", // Start earlier (when card just enters)
                                end: "left 75%",   // Finish earlier (before it gets too far left)
                                scrub: true,
                            }
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-black h-screen flex flex-col justify-center overflow-hidden relative">
            <div className="absolute top-8 left-6 md:left-12 z-10">
                <span className="text-[10px] tracking-[0.2em] text-white/30 font-medium uppercase block mb-4">
                    PAST EVENTS
                </span>
                <div className="w-8 h-[1px] bg-white/15" />
            </div>

            <div ref={containerRef} className="w-full h-[70vh] flex items-center px-6 md:px-12">
                <div ref={wrapperRef} className="flex gap-4 md:gap-8 items-center flex-nowrap w-max">
                    {events.map((event, i) => (
                        <div key={i} className="event-card group cursor-pointer w-[60vw] md:w-[30vw] lg:w-[22vw] flex-shrink-0">
                            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-3">
                                <div className="relative overflow-hidden aspect-[3/4] mb-4">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover img-zoom"
                                        style={{ filter: "grayscale(100%) brightness(0.7)" }}
                                        loading="lazy"
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
            </div>
        </section>
    );
}
