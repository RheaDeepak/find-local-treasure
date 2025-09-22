import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Camera, Search, Upload } from 'lucide-react';

const SearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="backdrop-blur-sm bg-card/80 shadow-[var(--shadow-warm)] border-0">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">What are you looking for?</h2>
              <p className="text-muted-foreground">Search by description or upload an image</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="e.g., Fresh tomatoes, handmade soap..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg bg-input/50 border-border/50 focus:bg-card focus:border-primary transition-[var(--transition-smooth)]"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Your location (auto-detected)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-12 h-14 text-lg bg-input/50 border-border/50 focus:bg-card focus:border-primary transition-[var(--transition-smooth)]"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-[var(--transition-smooth)] cursor-pointer group">
                  <Camera className="mx-auto h-8 w-8 text-muted-foreground group-hover:text-primary transition-[var(--transition-smooth)]" />
                  <p className="mt-2 text-sm text-muted-foreground group-hover:text-foreground transition-[var(--transition-smooth)]">
                    Upload image
                  </p>
                  <p className="text-xs text-muted-foreground">or drag & drop</p>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full h-14 text-lg font-semibold bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)]"
            >
              <Search className="mr-2 h-5 w-5" />
              Find Local Vendors
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchInterface;