/**
 * Property Detail Page
 * Modern Luxury Minimalism: Comprehensive property information with analytics and agent details
 */

import { useEffect, useState, useRef } from 'react';
import { useRoute } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFadeInUp, useScrollReveal } from '@/hooks/useGsapAnimations';

gsap.registerPlugin(ScrollTrigger);
import { propertyApi, Property } from '@/lib/mockData';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { Heart, Share2, Phone, Mail, MapPin, Bed, Bath, Ruler, Calendar, Zap, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function PropertyDetail() {
  const [, params] = useRoute('/property/:id');
  const id = params?.id;
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const detailsRef = useScrollReveal();
  const agentRef = useScrollReveal();

  // combine images and video into a single media list for the slider
  // User wants second slide to be a video
  const mediaList = property ? [
    { type: 'image', url: property.media.images[0] },
    { type: 'video', url: property.media.video },
    ...property.media.images.slice(1).map(img => ({ type: 'image', url: img }))
  ] : [];

  // Gallery entrance animation
  useEffect(() => {
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [loading]);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        const [prop, similar] = await Promise.all([
          propertyApi.getPropertyById(id),
          propertyApi.getSimilarProperties(id),
        ]);
        setProperty(prop);
        setSimilarProperties(similar);
      } catch (error) {
        console.error('Failed to load property:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-muted rounded-xl" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Property Not Found</h1>
          <p className="text-muted-foreground">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        {/* Image Gallery Slider */}
        <div ref={galleryRef} className="mb-8 relative">
          <Carousel className="w-full">
            <CarouselContent>
              {mediaList.map((item, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative h-96 md:h-[600px] bg-muted rounded-2xl overflow-hidden shadow-2xl">
                    {item.type === 'video' ? (
                      <video
                        src={item.url as string}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <img
                        src={item.url as string}
                        alt={`${property.title} - view ${idx + 1}`}
                        className="w-full h-full object-cover"
                        style={{ objectFit: 'cover' }}
                      />
                    )}

                    {/* Media Type Badge */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {item.type === 'video' ? 'Video Tour' : `Image ${idx + 1}`}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              onClick={() => setWishlist(!wishlist)}
              className="bg-white/90 dark:bg-slate-800/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <Heart
                size={20}
                className={wishlist ? 'fill-red-500 text-red-500' : 'text-foreground/70'}
              />
            </button>
            <button className="bg-white/90 dark:bg-slate-800/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110">
              <Share2 size={20} className="text-foreground/70" />
            </button>
          </div>

          {/* Swipe Hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm text-white/80 px-4 py-2 rounded-full text-xs pointer-events-none transition-opacity opacity-100 group-hover:opacity-0">
            Swipe to see more
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div ref={detailsRef} className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin size={18} />
                    <span>
                      {property.location.address}, {property.location.city}, {property.location.state}
                    </span>
                  </div>
                </div>
                {property.verified && (
                  <div className="bg-accent/10 text-accent px-4 py-2 rounded-full flex items-center gap-2 font-semibold">
                    <Zap size={18} />
                    Verified
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-5xl font-bold text-accent mb-2">{formattedPrice}</p>
                <p className="text-lg text-muted-foreground">
                  ${(property.price / property.area).toFixed(0)}/sqft
                </p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-border">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Bedrooms</p>
                  <p className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Bed size={20} className="text-accent" />
                    {property.bedrooms}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Bathrooms</p>
                  <p className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Bath size={20} className="text-accent" />
                    {property.bathrooms}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Area</p>
                  <p className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Ruler size={20} className="text-accent" />
                    {property.area} sqft
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Built</p>
                  <p className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Calendar size={20} className="text-accent" />
                    {property.builtYear}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Property</h2>
              <p className="text-foreground/80 leading-relaxed mb-6">{property.description}</p>

              {/* Property Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Floors</p>
                  <p className="font-semibold text-foreground">{property.floors}</p>
                </div>
                <div className="glass-card p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Facing</p>
                  <p className="font-semibold text-foreground capitalize">{property.facing}</p>
                </div>
                <div className="glass-card p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Road Access</p>
                  <p className="font-semibold text-foreground">{property.roadAccess}</p>
                </div>
                <div className="glass-card p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Property Type</p>
                  <p className="font-semibold text-foreground capitalize">{property.type}</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(property.amenities).map(([key, value]) => (
                  <div
                    key={key}
                    className={`p-3 rounded-lg border ${value
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'bg-muted/30 border-border text-muted-foreground'
                      }`}
                  >
                    <p className="font-semibold capitalize text-sm">
                      {key === 'internet' ? 'WiFi' : key}
                    </p>
                    <p className="text-xs">{value ? '✓ Available' : '✗ Not available'}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price History */}
            {property.priceHistory && property.priceHistory.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp size={24} className="text-accent" />
                  Price History
                </h2>
                <div className="glass-card p-6 rounded-xl">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={property.priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="var(--accent)"
                        strokeWidth={3}
                        dot={{ fill: 'var(--accent)', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Analytics */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Property Analytics</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-card p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-accent mb-2">
                    {property.analytics.views}
                  </p>
                  <p className="text-muted-foreground">Views</p>
                </div>
                <div className="glass-card p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-accent mb-2">
                    {property.analytics.saves}
                  </p>
                  <p className="text-muted-foreground">Saved</p>
                </div>
                <div className="glass-card p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-accent mb-2">
                    {property.analytics.popularity}%
                  </p>
                  <p className="text-muted-foreground">Popularity</p>
                </div>
              </div>
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Similar Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {similarProperties.map(prop => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Agent Card */}
          <div ref={agentRef} className="lg:col-span-1">
            <div className="glass-card p-6 rounded-xl sticky top-24 space-y-6">
              {/* Agent Card */}
              <div>
                <h3 className="font-bold text-foreground mb-4">Agent Information</h3>
                <div className="text-center mb-6">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                  <h4 className="font-bold text-lg text-foreground mb-1">
                    {property.agent.name}
                  </h4>
                  <p className="text-accent font-semibold mb-2">
                    ★ {property.agent.rating.toFixed(1)} Rating
                  </p>
                  <p className="text-sm text-muted-foreground">Licensed Real Estate Agent</p>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Phone size={18} />
                    Call Agent
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <Mail size={18} />
                    Email Agent
                  </a>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t border-border pt-6 space-y-3">
                <button className="w-full btn-primary">Schedule Tour</button>
                <button className="w-full btn-secondary">Get Pre-Approved</button>
              </div>

              {/* Info Box */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  <strong>💡 Tip:</strong> Contact the agent to arrange a viewing or ask questions about this property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
