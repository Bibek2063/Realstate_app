import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { X, ArrowLeft } from 'lucide-react';
import { mockPopularVideos } from '@/lib/mockData';
import ShortsCard from '@/components/ShortsCard';
import gsap from 'gsap';

export default function Popular() {
    const [, setLocation] = useLocation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [displayVideos, setDisplayVideos] = useState([...mockPopularVideos]);

    const shuffleVideos = (videos: typeof mockPopularVideos) => {
        return [...videos].sort(() => Math.random() - 0.5);
    };

    const loadMore = () => {
        const nextBatch = shuffleVideos(mockPopularVideos).map(v => ({
            ...v,
            id: `${v.id}-rnd-${Math.random().toString(36).substr(2, 9)}`
        }));
        setDisplayVideos(prev => [...prev, ...nextBatch]);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const scrollTop = containerRef.current.scrollTop;
                const vh = window.innerHeight;
                const index = Math.round(scrollTop / vh);

                if (index !== activeIndex) {
                    setActiveIndex(index);

                    // Load more when 2 videos away from the end
                    if (index >= displayVideos.length - 2) {
                        loadMore();
                    }
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => container?.removeEventListener('scroll', handleScroll);
    }, [activeIndex, displayVideos.length]);

    // Entrance animation
    useEffect(() => {
        gsap.fromTo('.close-btn',
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' }
        );
    }, []);

    return (
        <div className="fixed inset-0 bg-black z-[100] overflow-hidden">
            {/* Back/Close Button */}
            <button
                onClick={() => setLocation('/')}
                className="close-btn absolute top-6 right-6 z-[110] w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all group"
            >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Main Snap Container */}
            <div
                ref={containerRef}
                className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                {displayVideos.map((video, index) => (
                    <ShortsCard
                        key={video.id}
                        video={video}
                        isActive={index === activeIndex}
                        index={index % mockPopularVideos.length}
                        total={mockPopularVideos.length}
                    />
                ))}
            </div>

            {/* Navigation Instruction (only show on first load) */}
            {activeIndex === 0 && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none text-white/50 text-xs flex flex-col items-center gap-2">
                    <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/50" />
                    Scroll for more
                </div>
            )}
        </div>
    );
}
