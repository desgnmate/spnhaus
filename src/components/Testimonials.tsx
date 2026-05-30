"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
    {
        quote: "We wanted something different for our launch, not just a playlist and some drinks. SPNHAUS brought the energy, the vibe, and a whole experience. People are still talking about it.",
        name: "Alex Rivera",
        title: "Founder, Neon Collective",
    },
    {
        quote: "They don't just play music, they read the room. Every set felt intentional, like they knew exactly what we needed to hear. It was a vibe from start to finish.",
        name: "Jordan Lee",
        title: "Creative Director, Hype Studios",
    },
    {
        quote: "SPNHAUS turned our backyard wedding into a full-on festival. The music, the energy, the way they connected with everyone, it was exactly what we imagined and more.",
        name: "Samira Chen",
        title: "Event Manager, Urban Nights",
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const cards = sectionRef.current?.querySelectorAll(".testimonial-card");
            if (cards) {
                cards.forEach((card, index) => {
                    gsap.from(card, {
                        y: 40,
                        opacity: 0,
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
        <section
            ref={sectionRef}
            className="bg-black py-24 md:py-32 px-6 md:px-12 w-full relative overflow-hidden"
        >
            {/* Section Label */}
            <div className="mb-16">
                <span className="text-[10px] tracking-[0.2em] text-white/30 font-medium uppercase block mb-4">
                    WHAT OUR CLIENTS SAY
                </span>
                <div className="w-8 h-px bg-white/15" />
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="testimonial-card border border-white/10 p-8 flex flex-col justify-between group hover:border-white/30 transition-colors duration-300"
                    >
                        <div>
                            <div className="text-4xl text-white/20 mb-6 font-serif">&ldquo;</div>
                            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
                                {testimonial.quote}
                            </p>
                        </div>
                        <div className="border-t border-white/10 pt-6">
                            <p className="text-white font-medium text-sm tracking-wider uppercase">
                                {testimonial.name}
                            </p>
                            <p className="text-white/40 text-xs tracking-wider mt-1">
                                {testimonial.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
