"use client";

import { useRef } from "react";

export default function BookNow() {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <section 
            id="book"
            className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black text-white"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/images/booknow-bg.jpg" 
                    alt="Crowd background" 
                    className="w-full h-full object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl px-6 md:px-12 flex flex-col items-center">
                
                {/* Form Card */}
                <div className="w-full max-w-2xl bg-black p-8 md:p-16 relative border border-white/10 shadow-2xl">
                    <h2 
                        className="font-druk text-2xl md:text-4xl lg:text-5xl uppercase mb-10 text-center"
                        style={{ letterSpacing: "0.02em" }}
                    >
                        Shoot us a message!
                    </h2>

                    <form ref={formRef} className="flex flex-col gap-8 md:gap-10">
                        {/* Name Field */}
                        <div className="group">
                            <label htmlFor="name" className="sr-only">Name</label>
                            <div className="flex items-baseline border-b border-white/30 group-focus-within:border-white transition-colors pb-2">
                                <span className="text-lg md:text-xl font-space-grotesk mr-4 text-white/80">Name:</span>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name"
                                    className="bg-transparent border-none outline-none flex-1 text-lg md:text-xl font-space-grotesk text-white placeholder-white/30"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="group">
                            <label htmlFor="email" className="sr-only">E-mail</label>
                            <div className="flex items-baseline border-b border-white/30 group-focus-within:border-white transition-colors pb-2">
                                <span className="text-lg md:text-xl font-space-grotesk mr-4 text-white/80">E-mail:</span>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    className="bg-transparent border-none outline-none flex-1 text-lg md:text-xl font-space-grotesk text-white placeholder-white/30"
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div className="group">
                            <label htmlFor="message" className="sr-only">What's on your mind?</label>
                            <div className="flex items-baseline border-b border-white/30 group-focus-within:border-white transition-colors pb-2">
                                <span className="text-lg md:text-xl font-space-grotesk mr-4 text-white/80 whitespace-nowrap">What's on your mind?</span>
                                <input 
                                    type="text" 
                                    id="message" 
                                    name="message"
                                    className="bg-transparent border-none outline-none flex-1 text-lg md:text-xl font-space-grotesk text-white placeholder-white/30"
                                />
                            </div>
                        </div>
                    </form>
                </div>

            </div>

            {/* Bottom Info (Mission & Contact) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col md:flex-row justify-between items-end z-20 pointer-events-none">
                <p className="max-w-md text-xs md:text-sm font-space-grotesk text-white/60 leading-relaxed pointer-events-auto">
                    SPNHAUS’ mission is to merge music, art, culture, and storytelling into one connected ecosystem.
                </p>
                <a href="#contact" className="text-sm md:text-base font-medium font-space-grotesk text-white uppercase tracking-widest mt-4 md:mt-0 pointer-events-auto hover:opacity-70 transition-colors">
                    CONTACT
                </a>
            </div>

        </section>
    );
}
