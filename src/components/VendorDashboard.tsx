import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Store, MessageSquare, DollarSign, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ItemRequest {
  id: string;
  description: string;
  image_url: string | null;
  created_at: string;
  status: string;
}

const VendorDashboard = () => {
  const [requests, setRequests] = useState<ItemRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ItemRequest | null>(null);
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('item_requests')
      .select('*')
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching requests:', error);
      return;
    }

    setRequests(data || []);
  };

  const handleResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedRequest) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('vendor_responses')
        .insert([
          {
            vendor_id: user.id,
            request_id: selectedRequest.id,
            price: price ? parseFloat(price) : null,
            message,
            image_url: imageUrl || null,
            status: 'pending'
          }
        ]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to send response. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Your response has been sent!"
      });

      setPrice('');
      setMessage('');
      setImageUrl('');
      setResponseModalOpen(false);
      setSelectedRequest(null);
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Store className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Vendor Dashboard</h2>
      </div>

      <div className="grid gap-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No open requests at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id} className="hover:shadow-[var(--shadow-warm)] transition-[var(--transition-smooth)]">
              <CardHeader>
                <CardTitle className="text-lg">{request.description}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Posted {new Date(request.created_at).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                {request.image_url && (
                  <img 
                    src={request.image_url} 
                    alt="Request" 
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                )}
                <Button 
                  onClick={() => {
                    setSelectedRequest(request);
                    setResponseModalOpen(true);
                  }}
                  className="w-full"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Respond to Request
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={responseModalOpen} onOpenChange={setResponseModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Respond to Request</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleResponse} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (optional)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="10.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe your product, availability, pickup details..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="response-image">Product Image URL (optional)</Label>
              <Input
                id="response-image"
                type="url"
                placeholder="https://example.com/product.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setResponseModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Response
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorDashboard;