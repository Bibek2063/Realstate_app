import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import gsap from 'gsap';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function AuthModal() {
    const { isAuthModalOpen, hideAuthModal, login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const modalOverlayRef = useRef<HTMLDivElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isAuthModalOpen) {
            // Entrance Animation - Smooth pop up from center
            const tl = gsap.timeline();

            tl.to(modalOverlayRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            });

            tl.fromTo(modalContentRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' },
                '-=0.15'
            );

            // Apply blur to main content
            gsap.to('#main-app-content', {
                filter: 'blur(8px)',
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    }, [isAuthModalOpen]);

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: hideAuthModal
        });

        // Smooth pop down / scale out
        tl.to(modalContentRef.current, {
            scale: 0.9,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
        });

        tl.to(modalOverlayRef.current, {
            opacity: 0,
            duration: 0.2,
        }, '-=0.1');

        // Remove blur
        gsap.to('#main-app-content', {
            filter: 'blur(0px)',
            duration: 0.4,
            ease: 'power2.out'
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Dummy validation
        if (isLogin) {
            if (email && password) {
                handleSuccess();
            }
        } else {
            if (email && password && password === confirmPassword) {
                handleSuccess();
            }
        }
    };

    const handleSuccess = () => {
        login(email);
        handleClose();
    };

    const toggleMode = () => {
        gsap.to(modalContentRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.2,
            onComplete: () => {
                setIsLogin(!isLogin);
                gsap.fromTo(modalContentRef.current,
                    { y: -10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
                );
            }
        });
    };

    if (!isAuthModalOpen) return null;

    return (
        <div
            ref={modalOverlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/60 backdrop-blur-[4px] opacity-0"
        >
            <div
                ref={modalContentRef}
                className="glass-card w-[400px] max-w-[95vw] max-h-[90vh] overflow-y-auto relative custom-scrollbar shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 dark:border-white/10"
                style={{ background: 'var(--card)' }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 hover:bg-foreground/10 rounded-full transition-colors z-10"
                >
                    <X size={20} className="text-foreground/70" />
                </button>

                <div className="p-6">
                    <div className="flex flex-col items-center mb-5">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg mb-3">
                            RE
                        </div>
                        <h2 className="text-xl font-bold text-foreground">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-muted-foreground text-sm text-center mt-1">
                            {isLogin
                                ? 'Login to access your favorites and details'
                                : 'Sign up to start your luxury search'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground/80 flex items-center gap-2">
                                <Mail size={14} /> Email Address
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full bg-foreground/5 border border-border focus:border-accent rounded-lg px-4 py-2.5 text-foreground outline-none transition-all text-sm"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground/80 flex items-center gap-2">
                                <Lock size={14} /> Password
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full bg-foreground/5 border border-border focus:border-accent rounded-lg px-4 py-2.5 text-foreground outline-none transition-all text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {!isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground/80 flex items-center gap-2">
                                    <Lock size={14} /> Confirm Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-foreground/5 border border-border focus:border-accent rounded-lg px-4 py-2.5 text-foreground outline-none transition-all text-sm"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-primary w-full flex items-center justify-center gap-2 mt-4 py-2.5"
                        >
                            {isLogin ? 'Login' : 'Create Account'}
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="mt-6 text-center pt-5 border-t border-border">
                        <p className="text-muted-foreground text-xs">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={toggleMode}
                                className="ml-1 text-accent font-bold hover:underline"
                            >
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}
