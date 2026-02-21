"use client";

export default function Marquee() {
    const items = Array(16).fill("SPNHAUS");

    return (
        <section className="py-6 bg-black border-t border-b border-white/[0.08] overflow-hidden">
            <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
                {items.map((text, i) => (
                    <span key={i} className="flex items-center gap-8">
                        <span
                            className="text-base md:text-lg tracking-[0.2em] font-bold uppercase text-white font-druk"
                        >
                            {text}
                        </span>
                        <span className="text-[8px] text-white/30">◆</span>
                    </span>
                ))}
            </div>
        </section>
    );
}
