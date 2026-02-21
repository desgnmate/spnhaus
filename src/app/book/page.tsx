"use client";

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
        >
            {/* Left: SPNHAUS Logo */}
            <div className="flex items-center">
                <a 
                    href="/" 
                    className="font-druk italic text-xl md:text-2xl tracking-normal text-white hover:opacity-80 transition-opacity"
                >
                    SPNHAUS
                </a>
            </div>

            {/* Right: CONTACT, FOLLOW US, BOOK NOW */}
            <div className="flex gap-8 md:gap-12 items-center">
                <a
                    href="/contact"
                    className="text-[10px] md:text-xs tracking-[0.2em] font-medium text-white hover:text-white/70 transition-colors uppercase font-space-grotesk"
                >
                    CONTACT
                </a>
                <a
                    href="/book"
                    className="text-[10px] md:text-xs tracking-[0.2em] font-medium text-white hover:text-white/70 transition-colors uppercase font-space-grotesk"
                >
                    BOOK NOW
                </a>
            </div>
        </nav>
    );
}
