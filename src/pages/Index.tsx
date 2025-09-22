import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SearchInterface from '@/components/SearchInterface';
import VendorResponse from '@/components/VendorResponse';
import { MapPin, Search, Zap, Users, Shield, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-market.jpg';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [vendorResponses, setVendorResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendorResponses();
  }, []);

  const fetchVendorResponses = async () => {
    try {
      // Fetch vendor responses and stores separately since there's no formal relationship
      const [responsesResult, storesResult] = await Promise.all([
        supabase.from('vendor_responses').select('*').limit(10),
        supabase.from('stores').select('*')
      ]);

      if (responsesResult.error) {
        console.error('Error fetching vendor responses:', responsesResult.error);
        return;
      }

      if (storesResult.error) {
        console.error('Error fetching stores:', storesResult.error);
        return;
      }

      // Join the data manually
      const responses = responsesResult.data || [];
      const stores = storesResult.data || [];
      
      const storeMap = new Map(stores.map(store => [store.vendor_id, store]));

      // Transform data to match component expectations
      const transformedData = responses.map((response, index) => {
        const store = storeMap.get(response.vendor_id);
        return {
          name: store?.store_name || 'Unknown Store',
          avatar: `https://images.unsplash.com/photo-${1507003211169 + index * 1000}?w=150&h=150&fit=crop&crop=face`,
          rating: 4.5 + Math.random() * 0.5, // Mock rating for now
          distance: `${(Math.random() * 2 + 0.1).toFixed(1)} mi`,
          responseTime: `${Math.floor(Math.random() * 30 + 1)} min ago`,
          price: response.price ? `$${response.price}` : 'Price on request',
          stock: response.status === 'pending' ? 'Available' : response.status,
          description: response.message || 'No description available',
          image: response.image_url || '',
          location: store?.address || 'Location not specified'
        };
      });

      setVendorResponses(transformedData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-warm)]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
          <div className="space-y-4 max-w-4xl mx-auto">
            <Badge className="bg-primary/20 text-primary-foreground border-primary/30 text-lg px-6 py-2">
              Local Goods, One Click Away
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
              Discover Local
              <span className="block bg-gradient-to-r from-locify-beige to-white bg-clip-text text-transparent">
                Products Instantly
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto">
              Connect with nearby vendors, find unique products, and support your local community with smart search and real-time responses.
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <Button 
              size="lg" 
              className="w-full h-16 text-xl font-semibold bg-card text-foreground hover:bg-card/90 shadow-[var(--shadow-warm)] hover:shadow-[var(--shadow-glow)] transition-[var(--transition-bounce)]"
            >
              <Search className="mr-3 h-6 w-6" />
              Start Searching
            </Button>
            <p className="text-primary-foreground/60 text-sm">
              Join thousands discovering local treasures
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">How Locify Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to connect with local vendors and find exactly what you need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="text-center p-8 hover:shadow-[var(--shadow-warm)] transition-[var(--transition-smooth)] border-border/50">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-[var(--gradient-primary)] rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Smart Search</h3>
                <p className="text-muted-foreground">
                  Describe what you need or upload a photo. Our AI understands exactly what you're looking for.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-[var(--shadow-warm)] transition-[var(--transition-smooth)] border-border/50">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-[var(--gradient-primary)] rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Instant Broadcast</h3>
                <p className="text-muted-foreground">
                  Your request goes out to all nearby vendors instantly. No waiting, no endless browsing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-[var(--shadow-warm)] transition-[var(--transition-smooth)] border-border/50">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-[var(--gradient-primary)] rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Choose & Connect</h3>
                <p className="text-muted-foreground">
                  Compare responses, chat with vendors, and arrange pickup or delivery that works for you.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search Interface */}
          <SearchInterface />
        </div>
      </section>

      {/* Sample Vendor Responses */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">See Vendor Responses</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here's how local vendors respond to your searches with photos, pricing, and availability
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading vendor responses...</p>
              </div>
            ) : vendorResponses.length > 0 ? (
              vendorResponses.map((vendor, index) => (
                <VendorResponse key={index} vendor={vendor} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No vendor responses found. Add some data to your Supabase database!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-[var(--gradient-primary)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center text-primary-foreground">
            <div className="space-y-2">
              <div className="text-4xl font-bold">1,500+</div>
              <div className="text-lg opacity-90">Local Vendors</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">25,000+</div>
              <div className="text-lg opacity-90">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">4.9★</div>
              <div className="text-lg opacity-90">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-locify-green-dark text-locify-beige py-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold">Locify</h3>
          <p className="text-locify-beige/80">Connecting communities, one search at a time.</p>
          <div className="flex justify-center gap-8 text-sm">
            <a href="#" className="hover:text-white transition-[var(--transition-smooth)]">About</a>
            <a href="#" className="hover:text-white transition-[var(--transition-smooth)]">Vendors</a>
            <a href="#" className="hover:text-white transition-[var(--transition-smooth)]">Support</a>
            <a href="#" className="hover:text-white transition-[var(--transition-smooth)]">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;