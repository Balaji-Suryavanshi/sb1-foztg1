import { useState } from 'react';
import { Auction, Bid } from '../types';

const initialAuctions: Auction[] = [
  {
    id: '1',
    title: 'Vintage Rolex Submariner',
    description: 'Rare 1960s Rolex Submariner in excellent condition. Original parts and documentation included.',
    imageUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=2000',
    currentBid: 1200000, // ₹12,00,000
    startingPrice: 1000000,
    endTime: new Date(Date.now() + 86400000),
    seller: 'LuxuryWatches',
    bids: []
  },
  {
    id: '2',
    title: 'Original Andy Warhol Print',
    description: 'Authenticated Andy Warhol print from his famous Campbell\'s Soup series.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=2000',
    currentBid: 2000000, // ₹20,00,000
    startingPrice: 1500000,
    endTime: new Date(Date.now() + 172800000),
    seller: 'ArtCollector',
    bids: []
  },
  {
    id: '3',
    title: 'Tesla Model S Plaid',
    description: '2023 Tesla Model S Plaid with full self-driving capability. Only 1,000 miles.',
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2000',
    currentBid: 7500000, // ₹75,00,000
    startingPrice: 7000000,
    endTime: new Date(Date.now() + 259200000),
    seller: 'LuxuryCars',
    bids: []
  },
  {
    id: '4',
    title: 'Rare First Edition Harry Potter',
    description: 'First edition, first printing of Harry Potter and the Philosopher\'s Stone. Excellent condition with original dust jacket.',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=2000',
    currentBid: 600000, // ₹6,00,000
    startingPrice: 500000,
    endTime: new Date(Date.now() + 345600000),
    seller: 'RareBooks',
    bids: []
  },
  {
    id: '5',
    title: 'Vintage Gibson Les Paul 1959',
    description: 'Legendary 1959 Gibson Les Paul Standard Sunburst. One of the most sought-after electric guitars ever made.',
    imageUrl: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?auto=format&fit=crop&q=80&w=2000',
    currentBid: 2000000, // ₹20,00,000
    startingPrice: 1800000,
    endTime: new Date(Date.now() + 432000000),
    seller: 'VintageInstruments',
    bids: []
  }
];

export function useAuctions() {
  const [auctions, setAuctions] = useState<Auction[]>(initialAuctions);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);

  const handlePlaceBid = (auctionId: string, amount: number) => {
    setAuctions(prevAuctions => {
      return prevAuctions.map(auction => {
        if (auction.id === auctionId) {
          const newBid: Bid = {
            id: Date.now().toString(),
            auctionId,
            amount,
            bidder: 'Current User',
            timestamp: new Date()
          };
          return {
            ...auction,
            currentBid: amount,
            bids: [newBid, ...auction.bids]
          };
        }
        return auction;
      });
    });
  };

  const handleSelectAuction = (auction: Auction) => {
    setSelectedAuction(auction);
  };

  const handleCloseModal = () => {
    setSelectedAuction(null);
  };

  return {
    auctions,
    selectedAuction,
    handlePlaceBid,
    handleSelectAuction,
    handleCloseModal
  };
}