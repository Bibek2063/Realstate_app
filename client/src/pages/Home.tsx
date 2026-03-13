/**
 * Home Page - Premium Real Estate Marketplace
 * Modern Luxury Minimalism with GSAP animations
 * Hero section (75vh) → Featured properties → Market stats
 */

import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import SmartSearchBar from '@/components/SmartSearchBar';
import { mockProperties } from '@/lib/mockData';
import { TrendingUp, Users, Building2, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStaggerScrollReveal, useCounterAnimation, useSlideIn } from '@/hooks/useGsapAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const searchCardRef = useRef<HTMLDivElement>(null);
  const statsRef = useStaggerScrollReveal();

  const parseStatValue = (val: string) => {
    const hasPlus = val.includes('+');
    const hasPercent = val.includes('%');
    const cleaned = val.replace(/[,+%]/g, '').trim();
    const num = parseFloat(cleaned) || 0;
    if (hasPercent) return { target: num, decimals: cleaned.includes('.') ? 1 : 0, suffix: '%' };
    if (hasPlus) return { target: num, decimals: 0, suffix: '+' };
    return { target: num, decimals: cleaned.includes('.') ? 1 : 0, suffix: '' };
  };

  // parse targets for hooks (explicit calls to keep hook order stable)
  const p0 = parseStatValue('12,500+');
  const p1 = parseStatValue('50,000+');
  const p2 = parseStatValue('18.5%');
  const p3 = parseStatValue('24');

  const countRef0 = useCounterAnimation(p0.target, 1.6, p0.decimals, p0.suffix);
  const countRef1 = useCounterAnimation(p1.target, 1.6, p1.decimals, p1.suffix);
  const countRef2 = useCounterAnimation(p2.target, 1.6, p2.decimals, p2.suffix);
  const countRef3 = useCounterAnimation(p3.target, 1.6, p3.decimals, p3.suffix);
  const featuredRef = useStaggerScrollReveal();
  const leftWhyRef = useSlideIn('left', 100);
  const imageWhyRef = useSlideIn('right', 140);

  // Hero entrance animation
  useEffect(() => {
    if (heroContentRef.current) {
      gsap.fromTo(
        heroContentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  // Search card entrance with scale
  useEffect(() => {
    if (searchCardRef.current) {
      gsap.fromTo(
        searchCardRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.4 }
      );
    }
  }, []);

  const stats = [
    { icon: Building2, label: 'Properties Listed', value: '12,500+' },
    { icon: Users, label: 'Happy Customers', value: '50,000+' },
    { icon: TrendingUp, label: 'Avg. ROI', value: '18.5%' },
    { icon: Award, label: 'Awards Won', value: '24' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - 75vh with Background Image */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{
          minHeight: '75vh',
          backgroundImage: `url('/images/download.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />

        {/* Hero Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 h-full flex flex-col items-center justify-center pt-[72px] pb-6 md:pb-8 px-4"
        >
          <div className="container max-w-4xl">
            {/* Hero Text Section */}
            <div ref={heroTextRef} className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Find Your Dream Home
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md max-w-2xl mx-auto">
                Discover premium properties curated by expert agents. Browse, compare, and invest in your future with confidence.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/listings">
                  <a className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 drop-shadow-lg inline-block text-center">
                    Explore Properties
                  </a>
                </Link>
                <Link href="/map">
                  <a className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg border border-white/40 transition-all duration-300 transform hover:scale-105 drop-shadow-lg backdrop-blur-sm inline-block text-center">
                    View on Map
                  </a>
                </Link>
              </div>
            </div>

            {/* Search Card - Glassmorphism */}
            <div ref={searchCardRef} className="relative">
              <SmartSearchBar />
            </div>
          </div>
        </div>
      </div>

      {/* Further reduced spacing after hero */}
      <div className="h-2 md:h-2" />

      {/* Featured Properties Section (tighter to section) */}
      <section className="section-small">
        <div className="container ">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Properties</h2>
            <p className="text-lg text-muted-foreground">
              Handpicked luxury properties available exclusively on PropertyHub
            </p>
          </div>

          <div ref={featuredRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.slice(0, 6).map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/listings">
              <a className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 inline-block">
                View All Properties
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Market Statistics Section */}
      <section className="section-large bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Market Insights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time data from our platform showing the current state of the luxury real estate market
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300">
              <Building2 size={48} className="text-accent mx-auto mb-4" />
              <p className="text-muted-foreground text-sm mb-2">Properties Listed</p>
              <p ref={countRef0 as any} className="text-3xl font-bold text-foreground">0</p>
            </div>

            <div className="glass-card p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300">
              <Users size={48} className="text-accent mx-auto mb-4" />
              <p className="text-muted-foreground text-sm mb-2">Happy Customers</p>
              <p ref={countRef1 as any} className="text-3xl font-bold text-foreground">0</p>
            </div>

            <div className="glass-card p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300">
              <TrendingUp size={48} className="text-accent mx-auto mb-4" />
              <p className="text-muted-foreground text-sm mb-2">Avg. ROI</p>
              <p ref={countRef2 as any} className="text-3xl font-bold text-foreground">0%</p>
            </div>

            <div className="glass-card p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300">
              <Award size={48} className="text-accent mx-auto mb-4" />
              <p className="text-muted-foreground text-sm mb-2">Awards Won</p>
              <p ref={countRef3 as any} className="text-3xl font-bold text-foreground">0</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-large">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div ref={leftWhyRef}>
              <h2 className="text-4xl font-bold text-foreground mb-6">Why Choose PropertyHub?</h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Expert Agents',
                    description: 'Work with certified real estate professionals with 10+ years of experience',
                  },
                  {
                    title: 'Verified Properties',
                    description: 'Every listing is verified and inspected for authenticity and quality',
                  },
                  {
                    title: 'Transparent Pricing',
                    description: 'No hidden fees. See exactly what you\'re paying for upfront',
                  },
                  {
                    title: 'Secure Transactions',
                    description: 'Bank-level security for all your financial and personal information',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
                        <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div ref={imageWhyRef} className="relative h-96 rounded-2xl overflow-hidden glass-card">
              <img
                src="/images/Futuristic Dream Mansion in Dubai _ The $300M Oceanfront Sky Estate!.jpg"
                alt="Why Choose PropertyHub"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-large bg-gradient-to-r from-primary to-accent/80">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Perfect Property?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream homes on PropertyHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings">
              <a className="px-8 py-3 bg-white text-primary hover:bg-white/90 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 inline-block text-center">
                Start Exploring
              </a>
            </Link>
            <Link href="/sell">
              <a className="px-8 py-3 bg-white/20 text-white hover:bg-white/30 font-semibold rounded-lg border border-white/40 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm inline-block text-center">
                List Your Property
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {[
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Press', 'Blog'],
              },
              {
                title: 'Support',
                links: ['Help Center', 'Contact Us', 'Safety', 'Terms'],
              },
              {
                title: 'Resources',
                links: ['Market Report', 'Guides', 'API Docs', 'Community'],
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-foreground mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">© 2026 PropertyHub. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
