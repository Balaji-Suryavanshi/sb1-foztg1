import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Timer, DollarSign } from 'lucide-react';
import { Auction } from '../types';
import { formatINR } from '../utils/currency';

interface AuctionCardProps {
  auction: Auction;
  onClick: (auction: Auction) => void;
}

export function AuctionCard({ auction, onClick }: AuctionCardProps) {
  const timeLeft = formatDistanceToNow(new Date(auction.endTime), { addSuffix: true });

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
      onClick={() => onClick(auction)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full flex items-center gap-1">
          <Timer size={16} />
          <span className="text-sm">{timeLeft}</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{auction.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{auction.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign size={20} className="text-green-600" />
            <span className="text-2xl font-bold text-green-600">
              {formatINR(auction.currentBid)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {auction.bids.length} bids
          </div>
        </div>
      </div>
    </div>
  );
}