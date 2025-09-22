import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Clock, Star, MessageCircle, ShoppingCart } from 'lucide-react';

interface VendorResponseProps {
  vendor: {
    name: string;
    avatar: string;
    rating: number;
    distance: string;
    responseTime: string;
    price: string;
    stock: string;
    description: string;
    image: string;
    location: string;
  };
}

const VendorResponse = ({ vendor }: VendorResponseProps) => {
  return (
    <Card className="hover:shadow-[var(--shadow-warm)] transition-[var(--transition-smooth)] border-border/50 bg-card/90">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={vendor.avatar} alt={vendor.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {vendor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-foreground">{vendor.name}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{vendor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{vendor.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{vendor.responseTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{vendor.price}</div>
                <Badge variant="secondary" className="bg-locify-sage text-locify-sage-dark">
                  {vendor.stock}
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground">{vendor.description}</p>

            <div className="flex items-center gap-3">
              <Button size="sm" variant="outline" className="border-primary/30 hover:bg-primary/5">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button size="sm" className="bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)]">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorResponse;