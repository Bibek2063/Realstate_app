/**
 * Property Listings Page
 * Premium Layout: Sidebar (1) : Content (3) ratio
 * GSAP animations for smooth reveal and interactions
 */

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { mockProperties, propertyApi, Property } from '@/lib/mockData';
import { ChevronDown, Filter, X, Home as HomeIcon, BedDouble, Bath as BathIcon, Tag, SortAsc } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStaggerScrollReveal } from '@/hooks/useGsapAnimations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

interface FilterState {
  priceMin: number;
  priceMax: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  verified: boolean;
  sortBy: string;
}

export default function Listings() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 10000000,
    type: '',
    bedrooms: 0,
    bathrooms: 0,
    verified: false,
    sortBy: 'newest',
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const propertiesRef = useStaggerScrollReveal();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Sticky sidebar animation
  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = async () => {
    setLoading(true);
    try {
      const filtered = await propertyApi.getProperties(filters);
      setProperties(filtered);
    } catch (error) {
      console.error('Failed to apply filters:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleApplyFilters();
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <div className="section-normal bg-gradient-to-br from-primary/5 to-accent/5 border-b border-border pt-[72px]">
        <div className="container">
          <h1 className="text-4xl font-bold text-foreground mb-2">Properties for Sale</h1>
          <p className="text-muted-foreground">
            Showing {properties.length} properties
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-normal">
        <div className="container">
          <div className="layout-sidebar-content">
            {/* Sidebar - Sticky Filters */}
            <div ref={sidebarRef} className="sidebar-sticky">
              <div className="glass-card p-6 rounded-2xl shadow-xl border border-white/10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary" />

                <div className="flex items-center justify-between mb-8 md:mb-6">
                  <h2 className="font-bold text-xl text-foreground flex items-center gap-2">
                    <Filter size={20} className="text-accent" />
                    Filters
                  </h2>
                  <button
                    onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                    className="p-2 hover:bg-muted rounded-full md:hidden transition-colors"
                  >
                    {mobileFilterOpen ? <X size={20} /> : <Filter size={20} />}
                  </button>
                </div>

                <div className={`space-y-8 ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
                  {/* Price Range */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-foreground/80 flex items-center gap-2">
                      <Tag size={16} className="text-accent" />
                      Price Range
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground ml-1">Min</span>
                        <Input
                          type="number"
                          placeholder="0"
                          value={filters.priceMin === 0 ? '' : filters.priceMin}
                          onChange={(e) => handleFilterChange('priceMin', parseInt(e.target.value) || 0)}
                          className="bg-foreground/5 border-none focus-visible:ring-accent/30 h-10"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground ml-1">Max</span>
                        <Input
                          type="number"
                          placeholder="Any"
                          value={filters.priceMax >= 10000000 ? '' : filters.priceMax}
                          onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value) || 10000000)}
                          className="bg-foreground/5 border-none focus-visible:ring-accent/30 h-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-foreground/80 flex items-center gap-2">
                      <HomeIcon size={16} className="text-accent" />
                      Property Type
                    </label>
                    <Select
                      value={filters.type || "all"}
                      onValueChange={(value) => handleFilterChange('type', value === "all" ? "" : value)}
                    >
                      <SelectTrigger className="w-full bg-foreground/5 border-none h-11 px-4 focus:ring-accent/30 text-foreground">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-white/20">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rooms Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {/* Bedrooms */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-foreground/80 flex items-center gap-2">
                        <BedDouble size={16} className="text-accent" />
                        Bedrooms
                      </label>
                      <Select
                        value={filters.bedrooms.toString()}
                        onValueChange={(value) => handleFilterChange('bedrooms', parseInt(value))}
                      >
                        <SelectTrigger className="w-full bg-foreground/5 border-none h-11 px-4 focus:ring-accent/30 text-foreground">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-white/20">
                          <SelectItem value="0">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Bathrooms */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-foreground/80 flex items-center gap-2">
                        <BathIcon size={16} className="text-accent" />
                        Bathrooms
                      </label>
                      <Select
                        value={filters.bathrooms.toString()}
                        onValueChange={(value) => handleFilterChange('bathrooms', parseInt(value))}
                      >
                        <SelectTrigger className="w-full bg-foreground/5 border-none h-11 px-4 focus:ring-accent/30 text-foreground">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-white/20">
                          <SelectItem value="0">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Verified Only */}
                  <div className="pt-2">
                    <div
                      className="flex items-center space-x-3 cursor-pointer group"
                      onClick={() => handleFilterChange('verified', !filters.verified)}
                    >
                      <Checkbox
                        id="verified"
                        checked={filters.verified}
                        onCheckedChange={(checked) => handleFilterChange('verified', !!checked)}
                        className="data-[state=checked]:bg-accent data-[state=checked]:border-accent border-muted-foreground/30"
                      />
                      <label
                        htmlFor="verified"
                        className="text-sm font-bold text-foreground cursor-pointer group-hover:text-accent transition-colors"
                      >
                        Verified Listings Only
                      </label>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2" />

                  {/* Sort */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-foreground/80 flex items-center gap-2">
                      <SortAsc size={16} className="text-accent" />
                      Sort By
                    </label>
                    <Select
                      value={filters.sortBy}
                      onValueChange={(value) => handleFilterChange('sortBy', value)}
                    >
                      <SelectTrigger className="w-full bg-foreground/5 border-none h-11 px-4 focus:ring-accent/30 text-foreground">
                        <SelectValue placeholder="Newest First" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-white/20">
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Reset Button */}
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setFilters({
                        priceMin: 0,
                        priceMax: 10000000,
                        type: '',
                        bedrooms: 0,
                        bathrooms: 0,
                        verified: false,
                        sortBy: 'newest',
                      })
                    }
                    className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all font-bold text-xs uppercase tracking-widest pt-4"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            <div>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="glass-card rounded-xl overflow-hidden animate-pulse">
                      <div className="h-48 bg-muted" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div ref={propertiesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}

              {!loading && properties.length === 0 && (
                <div className="glass-card p-12 rounded-xl text-center">
                  <p className="text-lg text-muted-foreground">
                    No properties found matching your filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
