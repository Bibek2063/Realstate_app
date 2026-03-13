/**
 * Premium Sticky Header with Scroll Animations
 * Modern Luxury Minimalism: White glass effect over hero → solid on scroll
 * Height: 72px with smooth transitions
 */

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Heart, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import gsap from 'gsap';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const { isAuthenticated, showAuthModal } = useAuth();
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  // Favorite badge animation
  useEffect(() => {
    if (badgeRef.current && favorites.length > 0) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.8, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'elastic.out(1.2, 0.5)',
          overwrite: 'auto'
        }
      );
    }
  }, [favorites.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      if (navRef.current) {
        if (scrolled) {
          // Use CSS variables for theme-aware transitions
          gsap.to(navRef.current, {
            backgroundColor: 'var(--header-bg-solid)',
            backdropFilter: 'blur(12px)',
            borderBottomColor: 'var(--header-border)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            duration: 0.3,
            overwrite: 'auto',
          });
        } else {
          // Use CSS variables for theme-aware transitions
          gsap.to(navRef.current, {
            backgroundColor: 'var(--header-bg)',
            backdropFilter: 'blur(10px)',
            borderBottomColor: 'var(--header-border)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            duration: 0.3,
            overwrite: 'auto',
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation on mount
  useEffect(() => {
    if (logoRef.current && linksRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      );

      gsap.fromTo(
        linksRef.current.children,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, []);

  const navLinks = [
    { label: 'Buy', href: '/listings' },
    { label: 'Rent', href: '/listings' },
    { label: 'Sell', href: '/sell' },
    { label: 'Map', href: '/map' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 border-b border-border/10"
        style={{
          backgroundColor: 'var(--header-bg)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="container w-full flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/">
            <div
              ref={logoRef}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                RE
              </div>
              <span className="font-bold text-xl text-foreground hidden sm:inline">
                PropertyHub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <a className="text-foreground/80 hover:text-foreground font-medium transition-colors duration-300">
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setLocation('/favorites');
                } else {
                  showAuthModal();
                }
              }}
              className="relative inline-flex items-center p-2 hover:bg-foreground/10 rounded-lg transition-colors duration-300 text-foreground/70 hover:text-foreground group/heart"
            >
              <Heart
                size={20}
                className={favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}
              />
              {favorites.length > 0 && (
                <span
                  ref={badgeRef}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold leading-none w-4 h-4 flex items-center justify-center rounded-full shadow-sm"
                >
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-foreground/10 rounded-lg transition-colors duration-300 text-foreground/70 hover:text-foreground"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-foreground/10 rounded-lg transition-colors duration-300 text-foreground/70 hover:text-foreground"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-[72px] left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border md:hidden">
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}>
                  <a
                    className="text-foreground hover:text-accent font-medium transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* spacer to offset fixed header so page content is not overlapped */}
      <div style={{ height: 'var(--header-height)' }} aria-hidden="true" />
    </>
  );
}
