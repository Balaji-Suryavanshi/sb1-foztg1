import React, { useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { Timer, DollarSign, User, Clock } from 'lucide-react';
import { Auction } from '../types';
import { PaymentModal } from './PaymentModal';
import { AuthModal } from './AuthModal';
import { useAuth } from '../hooks/useAuth';
import { formatINR } from '../utils/currency';
import toast from 'react-hot-toast';

interface AuctionDetailsProps {
  auction: Auction;
  onPlaceBid: (auctionId: string, amount: number) => void;
}

export function AuctionDetails({ auction, onPlaceBid }: AuctionDetailsProps) {
  const { isAuthenticated } = useAuth();
  const [bidAmount, setBidAmount] = useState(auction.currentBid + 1);
  const [showPayment, setShowPayment] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const timeLeft = formatDistanceToNow(new Date(auction.endTime), { addSuffix: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentConfirm = (paymentMethodId: string) => {
    onPlaceBid(auction.id, bidAmount);
    setShowPayment(false);
    toast.success('Bid placed successfully!');
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setShowPayment(true);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-[300px]">
          <img
            src={auction.imageUrl}
            alt={auction.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-2">{auction.title}</h2>
          <p className="text-gray-600 mb-4">{auction.description}</p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="text-green-600" />
              <span className="text-3xl font-bold text-green-600">
                {formatINR(auction.currentBid)}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Timer size={20} />
              <span>{timeLeft}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <User size={20} />
              <span>Seller: {auction.seller}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex gap-2">
              <input
                type="number"
                min={auction.currentBid + 1}
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter bid amount"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Place Bid
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Bid History</h3>
        {auction.bids.length > 0 ? (
          <div className="space-y-2">
            {auction.bids.map((bid) => (
              <div
                key={bid.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-500" />
                  <span>{bid.bidder}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{formatINR(bid.amount)}</span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{format(new Date(bid.timestamp), 'MMM d, h:mm a')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No bids yet. Be the first to bid!</p>
        )}
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onConfirm={handlePaymentConfirm}
      />

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}