"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const curriculum = [
    {
        title: "FOUNDATIONS OF DJING",
        items: [
            "Understanding your gear, controllers, mixers, and turntables",
            "Beat matching and tempo control fundamentals",
            "Music theory basics for DJs, key, BPM, and phrasing",
        ],
    },
    {
        title: "MIXING TECHNIQUES",
        items: [
            "Seamless transitions, blends, cuts, and drops",
            "EQ mixing and harmonic mixing techniques",
            "Reading the room and building a set that flows",
        ],
    },
    {
        title: "ADVANCED PERFORMANCE",
        items: [
            "Effects, loops, and live remixing on the fly",
            "Scratching fundamentals and turntablism basics",
            "Recording your first mix and getting booked",
        ],
    },
];

const pricing = [
    {
        title: "BEGINNER",
        price: "$XX.XX",
        duration: "4 sessions",
        desc: "Learn the fundamentals. Gear, beat matching, and your first mix.",
    },
    {
        title: "INTERMEDIATE",
        price: "$XX.XX",
        duration: "6 sessions",
        desc: "Advanced transitions, EQ mixing, and building cohesive sets.",
    },
    {
        title: "PRO",
        price: "$XX.XX",
        duration: "8 sessions",
        desc: "Performance techniques, scratching, effects, and career guidance.",
    },
];

export default function AcademyPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<(typeof pricing)[0] | null>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            sectionRefs.current.forEach((section, index) => {
                if (section) {
                    gsap.from(section, {
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    });
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <main className="relative bg-black min-h-screen text-white">
            {/* Navbar */}
            <nav
                className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 pt-8 w-full"
                aria-label="Primary navigation"
            >
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="font-druk italic text-xl md:text-2xl tracking-normal text-white hover:opacity-80 transition-opacity"
                    >
                        SPNHAUS
                    </Link>
                </div>
                <MobileMenu />
                <div className="hidden md:flex gap-6 md:gap-10 items-center">
                    <Link
                        href="/academy"
                        className="text-[10px] md:text-xs tracking-[0.2em] font-medium text-white hover:text-white/70 transition-colors uppercase font-sora"
                        aria-current="page"
                    >
                        ACADEMY
                    </Link>
                    <Link
                        href="/contact"
                        className="text-[10px] md:text-xs tracking-[0.2em] font-medium text-white hover:text-white/70 transition-colors uppercase font-sora"
                    >
                        CONTACT
                    </Link>
                    <Link
                        href="/book"
                        className="text-[10px] md:text-xs tracking-[0.2em] font-medium text-white hover:text-white/70 transition-colors uppercase font-sora"
                    >
                        BOOK NOW
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/contact-bg.webp"
                        alt=""
                        role="presentation"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    <p className="text-[10px] tracking-[0.2em] text-white/40 font-medium uppercase mb-6 font-sora">
                        LEARN FROM THE BEST
                    </p>
                    <h1
                        ref={heroRef}
                        className="font-druk text-[8vw] md:text-[5vw] uppercase leading-none tracking-[0.02em] text-white mb-6 text-center"
                    >
                        SPNHAUS Academy
                    </h1>
                    <p className="text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto font-sora leading-relaxed">
                        SPNHAUS Academy is where passion meets practice. We teach the art of DJing from the ground up, no experience required, just a love for music and the drive to move people.
                    </p>
                </div>
            </section>

            {/* What We Teach */}
            <section className="py-24 md:py-32 px-6 md:px-12 w-full" aria-labelledby="curriculum-heading">
                <div
                    ref={(el) => { sectionRefs.current[0] = el; }}
                    className="mb-16"
                >
                    <h2 id="curriculum-heading" className="text-[10px] tracking-[0.2em] text-white/30 font-medium uppercase block mb-4 font-sora">
                        WHAT YOU WILL LEARN
                    </h2>
                    <div className="w-8 h-px bg-white/15" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
                    {curriculum.map((module, i) => (
                        <article
                            key={i}
                            ref={(el) => { sectionRefs.current[i + 1] = el; }}
                            className="border-t border-white/10 pt-8"
                        >
                            <p className="text-white/20 text-xs font-medium tracking-widest mb-4 font-sora">
                                0{i + 1}
                            </p>
                            <h3 className="font-sora font-bold text-lg md:text-xl uppercase tracking-wide mb-6">
                                {module.title}
                            </h3>
                            <ul className="space-y-3">
                                {module.items.map((item, j) => (
                                    <li key={j} className="text-white/60 text-sm md:text-base font-light leading-relaxed font-sora">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>

            {/* Pricing */}
            <section className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-white/8" aria-labelledby="pricing-heading">
                <div
                    ref={(el) => { sectionRefs.current[4] = el; }}
                    className="mb-16"
                >
                    <h2 id="pricing-heading" className="text-[10px] tracking-[0.2em] text-white/30 font-medium uppercase block mb-4 font-sora">
                        PRICING
                    </h2>
                    <div className="w-8 h-px bg-white/15" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {pricing.map((plan, i) => (
                        <div
                            key={i}
                            ref={(el) => { sectionRefs.current[i + 5] = el; }}
                            className="border border-white/10 p-8 flex flex-col group hover:border-white/30 transition-colors duration-300"
                        >
                            <p className="text-white/20 text-xs font-medium tracking-widest uppercase mb-4 font-sora">
                                {plan.title}
                            </p>
                            <p className="font-sora font-extrabold text-4xl md:text-5xl mb-2">
                                {plan.price}
                            </p>
                            <p className="text-white/40 text-sm tracking-widest uppercase mb-6 font-sora">
                                {plan.duration}
                            </p>
                            <p className="text-white/60 text-sm leading-relaxed font-sora flex-1">
                                {plan.desc}
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedPlan(plan);
                                    setModalOpen(true);
                                }}
                                className="mt-8 inline-block text-center border border-white/20 py-3 px-6 text-xs tracking-[0.15em] uppercase font-medium hover:bg-white hover:text-black transition-colors duration-300 font-sora cursor-pointer"
                                aria-label={`Enroll in ${plan.title} plan`}
                            >
                                GET STARTED
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 md:py-32 px-6 md:px-12 w-full text-center border-t border-white/8" aria-labelledby="academy-cta-heading">
                <div
                    ref={(el) => { sectionRefs.current[8] = el; }}
                >
                    <h2 id="academy-cta-heading" className="font-druk text-3xl md:text-5xl uppercase tracking-wide mb-6">
                        READY TO GET BEHIND THE DECKS?
                    </h2>
                    <p className="text-white/50 text-base md:text-lg font-light mb-10 font-sora leading-relaxed">
                        No experience needed. Just bring your love for music and we will handle the rest. Our DJs will guide you every step of the way.
                    </p>
                    <button
                        onClick={() => {
                            setSelectedPlan(null);
                            setModalOpen(true);
                        }}
                        className="inline-block border border-white/20 py-4 px-10 text-sm tracking-[0.15em] uppercase font-medium hover:bg-white hover:text-black transition-colors duration-300 font-sora cursor-pointer"
                    >
                        BOOK A SESSION
                    </button>
                </div>
            </section>

            {/* Confirmation Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setModalOpen(false)}
                    />
                    <div className="relative bg-black border border-white/10 p-8 md:p-12 max-w-md w-full text-center">
                        <h3 id="modal-title" className="font-sora font-bold text-xl md:text-2xl uppercase tracking-wide mb-4">
                            Confirm Enrollment
                        </h3>
                        {selectedPlan ? (
                            <>
                                <p className="text-white/60 text-sm font-sora mb-2 uppercase tracking-widest">
                                    {selectedPlan.title}
                                </p>
                                <p className="font-sora font-extrabold text-4xl md:text-5xl mb-4">
                                    {selectedPlan.price}
                                </p>
                                <p className="text-white/40 text-sm tracking-widest uppercase mb-6 font-sora">
                                    {selectedPlan.duration}
                                </p>
                            </>
                        ) : (
                            <p className="text-white/60 text-sm font-sora mb-6 leading-relaxed">
                                You are about to enroll in SPNHAUS Academy. Our team will reach out to schedule your sessions.
                            </p>
                        )}
                        <p className="text-white/40 text-xs font-sora mb-8">
                            By confirming, you agree to our terms and conditions.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="border border-white/20 py-3 px-6 text-xs tracking-[0.15em] uppercase font-medium text-white/60 hover:text-white transition-colors font-sora cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="bg-white text-black py-3 px-6 text-xs tracking-[0.15em] uppercase font-medium hover:bg-gray-200 transition-colors font-sora cursor-pointer"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="py-12 px-6 md:px-12 w-full border-t border-white/8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
                    <Link
                        href="/"
                        className="font-druk italic text-lg tracking-normal text-white/60 hover:text-white transition-colors"
                    >
                        SPNHAUS
                    </Link>
                    <div className="flex gap-6 md:gap-10">
                        <a
                            href="mailto:hello@spnhaus.com"
                            className="text-xs tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors uppercase font-sora"
                        >
                            hello@spnhaus.com
                        </a>
                        <a
                            href="https://www.instagram.com/spnhaus/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors uppercase font-sora"
                        >
                            INSTAGRAM
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
