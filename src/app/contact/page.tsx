"use client";

import { useState } from "react";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import { useLoading } from "@/context/LoadingContext";

export default function ContactPage() {
    const { isLoading } = useLoading();
    const [animationFinished, setAnimationFinished] = useState(false);

    return (
        <main className="relative bg-black min-h-screen flex flex-col">
            <style jsx>{`
                @keyframes shine {
                  0% { background-position: 100% center; }
                  100% { background-position: 0% center; }
                }
              `}</style>
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
                        className="font-druk text-4xl md:text-6xl lg:text-8xl uppercase mb-8 md:mb-12 tracking-wide inline-block"
                        onAnimationEnd={() => setAnimationFinished(true)}
                        style={{ 
                            letterSpacing: "0.02em",
                            backgroundImage: (isLoading || animationFinished)
                                ? "linear-gradient(120deg, #bfbfbf 0%, #ffffff 50%, #bfbfbf 100%)"
                                : "linear-gradient(120deg, #bfbfbf 0%, #ffffff 20%, #bfbfbf 40%, #ffd700 48%, #ff00ff 50%, #00ffff 52%, #bfbfbf 60%, #ffffff 80%, #bfbfbf 100%)",
                            backgroundSize: (isLoading || animationFinished) ? "100% auto" : "300% auto",
                            backgroundPosition: (isLoading || animationFinished) ? "center" : "100% center",
                            backgroundRepeat: "no-repeat",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent",
                            animation: (isLoading || animationFinished) ? "none" : "shine 2s ease-in-out 0.5s 1 forwards"
                        }}
                    >
                        GET IN TOUCH
                    </h1>
                    
                    <div className="font-sora space-y-6 md:space-y-8 text-lg md:text-xl font-light">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-white/60 text-sm tracking-widest uppercase">Email Us</span>
                            <a href="mailto:hello@spnhaus.com" className="hover:text-white/80 transition-colors border-b border-white/20 pb-1">
                                hello@spnhaus.com
                            </a>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <span className="text-white/60 text-sm tracking-widest uppercase">Follow Us</span>
                            <div className="flex gap-6 mt-2">
                                <a href="https://www.instagram.com/spnhaus/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">Instagram</a>
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

            {/* Mobile Menu */}
            <MobileMenu />

            {/* Right: ACADEMY, CONTACT, BOOK NOW - Hidden on mobile */}
            <div className="hidden md:flex gap-6 md:gap-10 items-center">
                <Link
                    href="/academy"
                    className="text-[10px] md:text-xs tracking-[0.2em] font-medium text-white hover:text-white/70 transition-colors uppercase font-sora"
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
    );
}
