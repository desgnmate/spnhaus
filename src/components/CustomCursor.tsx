"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only show custom cursor on non-touch devices
        if ("ontouchstart" in window) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(dot, {
                x: e.clientX - 4,
                y: e.clientY - 4,
                duration: 0.1,
                ease: "power2.out",
            });
            gsap.to(ring, {
                x: e.clientX - 16,
                y: e.clientY - 16,
                duration: 0.25,
                ease: "power2.out",
            });
        };

        const handleHoverEnter = () => {
            ring.classList.add("hovering");
            gsap.to(dot, { scale: 0, duration: 0.2 });
        };

        const handleHoverLeave = () => {
            ring.classList.remove("hovering");
            gsap.to(dot, { scale: 1, duration: 0.2 });
        };

        window.addEventListener("mousemove", onMouseMove);

        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll(
            "a, button, .service-row, .event-card"
        );
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleHoverEnter);
            el.addEventListener("mouseleave", handleHoverLeave);
        });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleHoverEnter);
                el.removeEventListener("mouseleave", handleHoverLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot hidden md:block" />
            <div ref={ringRef} className="cursor-ring hidden md:block" />
        </>
    );
}
