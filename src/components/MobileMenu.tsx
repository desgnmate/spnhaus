"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";

const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/academy", label: "ACADEMY" },
    { href: "/contact", label: "CONTACT" },
    { href: "/book", label: "BOOK NOW" },
];

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            gsap.from(".mobile-nav-link", {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
                delay: 0.2,
            });
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const overlay = isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black">
            {/* Close Button */}
            <div className="absolute top-8 right-6">
                <button
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center w-8 h-8 cursor-pointer"
                    aria-label="Close menu"
                >
                    <span className="w-6 h-0.5 bg-white absolute rotate-45" />
                    <span className="w-6 h-0.5 bg-white absolute -rotate-45" />
                </button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col items-center justify-center h-full gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="mobile-nav-link font-druk text-3xl uppercase tracking-[0.02em] text-white hover:text-white/60 transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-8 left-6 right-6 flex justify-between items-center">
                <a
                    href="mailto:hello@spnhaus.com"
                    className="text-xs text-white/40 uppercase tracking-wider font-sora"
                >
                    hello@spnhaus.com
                </a>
                <a
                    href="https://www.instagram.com/spnhaus/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/40 uppercase tracking-wider font-sora"
                >
                    Instagram
                </a>
            </div>
        </div>
    );

    return (
        <>
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer"
                    aria-label="Open menu"
                >
                    <span className="w-6 h-0.5 bg-white" />
                    <span className="w-6 h-0.5 bg-white" />
                </button>
            </div>
            {mounted && createPortal(overlay, document.body)}
        </>
    );
}
