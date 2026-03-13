import React, { useEffect, useRef, useState } from 'react';
import { PopularVideo } from '@/lib/mockData';
import { MapPin, Heart, Share2, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

interface ShortsCardProps {
    video: PopularVideo;
    isActive: boolean;
    index: number;
    total: number;
}

export default function ShortsCard({ video, isActive, index, total }: ShortsCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            if (isActive) {
                videoRef.current.play().catch(e => console.error("Auto-play blocked:", e));
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isActive]);

    const toggleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            // Heart pop animation
            gsap.fromTo('.heart-icon-' + video.id,
                { scale: 1 },
                { scale: 1.4, duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(2)' }
            );
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[100vh] snap-start bg-black flex items-center justify-center overflow-hidden"
        >
            {/* Blurred Background Layer (Desktop/Landscape) */}
            <div className="absolute inset-0 opacity-40 blur-3xl scale-110 pointer-events-none hidden md:block">
                <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                />
            </div>

            {/* Video Container (Locked to 9:16 Aspect Ratio) */}
            <div className="relative h-full aspect-[9/16] max-w-full bg-black shadow-[20px_0_100px_rgba(0,0,0,0.5),-20px_0_100px_rgba(0,0,0,0.5)] overflow-visible">
                <video
                    ref={videoRef}
                    src={video.videoUrl}
                    className="w-full h-full object-cover rounded-sm md:rounded-lg"
                    loop
                    muted={isMuted}
                    playsInline
                    onClick={() => setIsMuted(!isMuted)}
                />

                {/* Glossy Overlays (Inside for Gradient) */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/80 rounded-sm md:rounded-lg" />

                {/* Right Side Actions (YouTube Style - Right Side) */}
                <div className="absolute -right-16 bottom-32 z-20 hidden md:flex flex-col gap-6 items-center translate-x-4">
                    <button
                        onClick={toggleLike}
                        className="flex flex-col items-center gap-1 group pointer-events-auto"
                    >
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all group-hover:bg-white/20">
                            <Heart
                                className={`heart-icon-${video.id} transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`}
                                size={24}
                            />
                        </div>
                        <span className="text-white text-xs font-semibold">{video.likes + (isLiked ? 1 : 0)}</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 group pointer-events-auto">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all group-hover:bg-white/20 text-white">
                            <Share2 size={24} />
                        </div>
                        <span className="text-white text-xs font-semibold">Share</span>
                    </button>

                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all hover:bg-white/20 text-white pointer-events-auto"
                    >
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                </div>

                {/* Mobile Actions (Fallback for mobile screens) */}
                <div className="absolute right-4 bottom-32 z-20 flex md:hidden flex-col gap-6 items-center">
                    <button onClick={toggleLike} className="flex flex-col items-center gap-1">
                        <Heart className={`heart-icon-${video.id} ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} size={24} />
                        <span className="text-white text-[10px] font-bold">{video.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                    <button onClick={() => setIsMuted(!isMuted)} className="text-white">
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                </div>

                {/* Bottom Information (YouTube Style - Left Side) */}
                <div className="absolute bottom-10 -left-6 md:-left-64 z-10 pointer-events-none text-left flex flex-col items-start translate-x-4 md:translate-x-0 md:w-56">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                        {video.title}
                    </h2>

                    <div className="flex items-center gap-1 text-white/80 mb-4 drop-shadow-md">
                        <MapPin size={14} className="text-accent" />
                        <span className="text-xs md:text-sm font-medium">{video.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-start">
                        {video.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] md:text-[10px] text-white font-semibold uppercase tracking-wider"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
