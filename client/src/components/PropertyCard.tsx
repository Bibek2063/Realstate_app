/**
 * Property Card Component
 * Modern Luxury Minimalism: 3:2 image ratio with smooth hover effects
 * Glassmorphism styling with GSAP animations
 */

import React, { useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Property } from '@/lib/mockData';
import { Heart, MapPin, Bed, Bath, Ruler, Zap } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import gsap from 'gsap';


interface PropertyCardProps {
  property: Property;
  isWishlisted?: boolean;
}

export default function PropertyCard({ property, isWishlisted = false }: PropertyCardProps) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const { isAuthenticated, showAuthModal } = useAuth();
  const [, setLocation] = useLocation();
  const isWishlist = isFavorited(property.id) || isWishlisted;
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    if (isAuthenticated) {
      setLocation(`/property/${property.id}`);
    } else {
      showAuthModal();
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      toggleFavorite(property.id);
    } else {
      showAuthModal();
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -8,
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
    if (imageRef.current?.querySelector('img')) {
      gsap.to(imageRef.current.querySelector('img'), {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
    if (imageRef.current?.querySelector('img')) {
      gsap.to(imageRef.current.querySelector('img'), {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(property.price);

  return (
    <div
      onClick={handleCardClick}
      className="block w-full h-full"
    >
      <div
        ref={cardRef}
        className="property-card cursor-pointer group h-full flex flex-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container - 3:2 Ratio */}
        <div ref={imageRef} className="property-card-image relative flex-shrink-0 aspect-[3/2]">
          <img
            src={property.media.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
            style={{ objectFit: 'cover' }}
          />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            {property.verified && (
              <span className="bg-accent/90 backdrop-blur-sm text-accent-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Zap size={14} />
                Verified
              </span>
            )}
            <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold">
              {property.type}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 left-3 bg-white/90 hover:bg-white p-2 rounded-full transition-all hover:scale-110 z-10"
            aria-label={isWishlist ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={18}
              className={isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>

          {/* Popularity Score */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold">
            {property.analytics.popularity}% Popular
          </div>

          {/* Price Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="text-white">
              <p className="text-2xl font-bold">{formattedPrice}</p>
              <p className="text-sm text-white/80">${(property.price / property.area).toFixed(0)}/sqft</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="property-card-content flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-start gap-1 text-muted-foreground text-sm mb-4 min-h-[3rem]">
            <MapPin size={16} className="flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">
              {property.location.address}, {property.location.city}
            </span>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-border mt-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-foreground font-semibold mb-1">
                <Bed size={16} />
                <span>{property.bedrooms}</span>
              </div>
              <p className="text-xs text-muted-foreground">Beds</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-foreground font-semibold mb-1">
                <Bath size={16} />
                <span>{property.bathrooms}</span>
              </div>
              <p className="text-xs text-muted-foreground">Baths</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-foreground font-semibold mb-1">
                <Ruler size={16} />
                <span>{(property.area / 1000).toFixed(1)}k</span>
              </div>
              <p className="text-xs text-muted-foreground">sqft</p>
            </div>
          </div>

          {/* Agent Info */}
          <div className="flex items-center gap-3">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">
                {property.agent.name}
              </p>
              <p className="text-xs text-accent">★ {property.agent.rating.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
