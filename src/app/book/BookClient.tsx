"use client";

import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import BookNow from "@/components/BookNow";

export default function BookPage() {
    return (
        <main className="relative bg-black min-h-screen">
            <BookNavbar />
            <BookNow />
        </main>
    );
}

function BookNavbar() {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 pt-8 w-full"
            aria-label="Primary navigation"
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
                    aria-current="page"
                >
                    BOOK NOW
                </Link>
            </div>
        </nav>
    );
}
