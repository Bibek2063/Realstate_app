import React, { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Play } from 'lucide-react';
import gsap from 'gsap';

export default function PopularToggle() {
    const [, setLocation] = useLocation();
    const bubbleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (bubbleRef.current) {
            // Subtle float animation
            gsap.to(bubbleRef.current, {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        }
    }, []);

    return (
        <div className="fixed bottom-10 right-10 z-[60] flex items-center justify-center">
            {/* Animated Ripples (Circular Waves) */}
            <div className="absolute w-16 h-16 bg-accent/40 rounded-full animate-[ping_3s_linear_infinite]" />
            <div className="absolute w-16 h-16 bg-accent/30 rounded-full animate-[ping_3s_linear_infinite_1s]" />
            <div className="absolute w-16 h-16 bg-accent/20 rounded-full animate-[ping_3s_linear_infinite_2s]" />

            <button
                ref={bubbleRef}
                onClick={() => setLocation('/popular')}
                className="relative w-16 h-16 bg-accent rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.5)] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-all active:scale-95 border-2 border-white/30 group"
                aria-label="View Popular Shorts"
            >
                <div className="relative">
                    <Play size={28} className="fill-white translate-x-0.5" />
                </div>

                {/* Inner Highlight */}
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
        </div>
    );
}
