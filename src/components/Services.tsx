"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
    {
        title: "BUSINESS LAUNCHES",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
    },
    {
        title: "PRIVATE EVENTS",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
    },
    {
        title: "CORPORATE EVENTS",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80"
    },
    {
        title: "WEDDINGS",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
    },
    {
        title: "DAY PARTIES & BRUNCH PARTIES",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80"
    },
    {
        title: "COMMUNITY EVENTS / FUNDRAISERS",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const items = sectionRef.current?.querySelectorAll(".service-row");
            if (items) {
                gsap.from(items, {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, image: string) => {
        const el = e.currentTarget;
        const originalText = el.querySelector(".original-text");
        const duplicateText = el.querySelector(".duplicate-text");
        const arrow = el.querySelector(".arrow-icon");
        
        // Update preview image
        if (previewRef.current) {
            const img = previewRef.current.querySelector("img");
            if (img) img.src = image;
            
            gsap.to(previewRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power3.out"
            });
        }
        
        // Change background color instantly
        gsap.to(el, {
            backgroundColor: "#FFFFFF",
            duration: 0,
        });

        // Text Slide Up Animation
        if (originalText && duplicateText) {
            gsap.to(originalText, {
                y: "-100%",
                duration: 0.4,
                ease: "power3.out",
                color: "#000000"
            });
            gsap.to(duplicateText, {
                y: "0%",
                duration: 0.4,
                ease: "power3.out",
                color: "#000000"
            });
        }

        if (arrow) {
            gsap.to(arrow, {
                color: "#000000",
                duration: 0,
            });
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const originalText = el.querySelector(".original-text");
        const duplicateText = el.querySelector(".duplicate-text");
        const arrow = el.querySelector(".arrow-icon");

        // Hide preview
        if (previewRef.current) {
            gsap.to(previewRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: "power3.out"
            });
        }

        // Reset background color instantly
        gsap.to(el, {
            backgroundColor: "transparent",
            duration: 0,
        });

        // Reset Text Animation
        if (originalText && duplicateText) {
            gsap.to(originalText, {
                y: "0%",
                duration: 0.4,
                ease: "power3.out",
                color: "#FFFFFF"
            });
            gsap.to(duplicateText, {
                y: "100%",
                duration: 0.4,
                ease: "power3.out",
                color: "#FFFFFF"
            });
        }

        if (arrow) {
            gsap.to(arrow, {
                color: "#FFFFFF", 
                duration: 0,
            });
        }
    };

    // Update preview position on mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (previewRef.current && sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(previewRef.current, {
                x: x + 20,
                y: y - 150,
                duration: 0.4,
                ease: "power3.out"
            });
        }
    };

    return (
        <section
            ref={sectionRef}
            id="services"
            className="bg-black py-24 md:py-32 px-6 md:px-12 w-full relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Floating Image Preview */}
            <div 
                ref={previewRef}
                className="absolute top-0 left-0 w-[300px] h-[200px] pointer-events-none z-30 opacity-0 scale-95 hidden md:block"
                style={{ transform: "translate(-50%, -50%)" }}
            >
                <div className="w-full h-full overflow-hidden">
                    <img 
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
                        alt="Service preview" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="w-full">
                {/* Label */}
                <div className="mb-12">
                    <span className="text-[10px] tracking-[0.2em] text-white/30 font-medium uppercase">
                        WHAT WE DO
                    </span>
                </div>

                {/* Service rows */}
                <div className="flex flex-col w-full">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="service-row relative flex justify-between items-center py-6 md:py-7 px-5 border-t border-white/[0.12] transition-colors group cursor-pointer w-full"
                            onMouseEnter={(e) => handleMouseEnter(e, service.image)}
                            onMouseLeave={handleMouseLeave}
                            style={{ borderBottom: i === services.length - 1 ? "1px solid rgba(255,255,255,0.12)" : undefined }}
                        >
                            <div 
                                className="relative overflow-hidden font-druk text-white"
                                style={{
                                    fontSize: "clamp(16px, 2.5vw, 32px)",
                                    height: "1.3em",
                                    lineHeight: 1.2
                                }}
                            >
                                <span
                                    className="original-text block"
                                    style={{
                                        textTransform: "uppercase",
                                        letterSpacing: "0.02em",
                                    }}
                                >
                                    {service.title}
                                </span>
                                <span
                                    className="duplicate-text block absolute top-0 left-0"
                                    style={{
                                        textTransform: "uppercase",
                                        letterSpacing: "0.02em",
                                        transform: "translateY(100%)"
                                    }}
                                >
                                    {service.title}
                                </span>
                            </div>
                            <span className="arrow-icon text-lg md:text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                →
                            </span>
                            <div
                                className="service-underline"
                                style={{ transform: "scaleX(0)" }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
