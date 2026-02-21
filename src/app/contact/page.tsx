"use client";

import { useRef } from "react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <main className="relative bg-black min-h-screen flex flex-col">
            <ContactNavbar />
            
            {/* Main Content */}
            <section className="flex-1 flex flex-col items-center justify-center relative w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/images/contact-bg.jpg" 
                        alt="Contact Background" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-4xl px-6 md:px-12 text-center text-white">
                    <h1 
                        className="font-druk text-4xl md:text-6xl lg:text-8xl uppercase mb-8 md:mb-12 tracking-wide"
                        style={{ letterSpacing: "0.02em" }}
                    >
                        GET IN TOUCH
                    </h1>
                    
                    <div className="font-space-grotesk space-y-6 md:space-y-8 text-lg md:text-xl font-light">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-white/60 text-sm tracking-widest uppercase">Email Us</span>
                            <a href="mailto:info@spnhaus.com" className="hover:text-white/80 transition-colors border-b border-white/20 pb-1">
                                info@spnhaus.com
                            </a>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <span className="text-white/60 text-sm tracking-widest uppercase">Follow Us</span>
                            <div className="flex gap-6 mt-2">
                                <a href="#" className="hover:text-white/80 transition-colors">Instagram</a>
                                <a href="#" className="hover:text-white/80 transition-colors">Twitter</a>
                                <a href="#" className="hover:text-white/80 transition-colors">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function ContactNavbar() {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 pt-8 w-full"
        >
            {/* Left: SPNHAUS Logo */}
            <div className="flex items-center">
                <Link 
                    href="/" 
                    className="font-druk italic text-xl md:text-2xl tracking-normal text-white hover:opacity-80 transition-opacity"
                >
                    SPNHAUS
                </Link>
            </div>

            {/* Right: CONTACT, FOLLOW US, BOOK NOW */}
            <div className="flex gap-8 md:gap-12 items-center">
                <Link
                    href="/contact"
                    className="text-[10px] md:text-xs tracking-[0.2em] font-medium text-white hover:text-white/70 transition-colors uppercase font-space-grotesk"
                >
                    CONTACT
                </Link>
                <a
                    href="#"
                    className="text-[10px] md:text-xs tracking-[0.2em] font-medium text-white hover:text-white/70 transition-colors uppercase font-space-grotesk"
                >
                    FOLLOW US
                </a>
                <Link
                    href="/book"
                    className="text-[10px] md:text-xs tracking-[0.2em] font-medium text-white hover:text-white/70 transition-colors uppercase font-space-grotesk"
                >
                    BOOK NOW
                </Link>
            </div>
        </nav>
    );
}
