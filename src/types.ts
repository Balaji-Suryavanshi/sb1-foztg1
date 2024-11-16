export interface Auction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  currentBid: number;
  startingPrice: number;
  endTime: Date;
  seller: string;
  bids: Bid[];
}

export interface Bid {
  id: string;
  auctionId: string;
  amount: number;
  bidder: string;
  timestamp: Date;
}

export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  brand: string;
  isDefault: boolean;
}

export interface PaymentFormData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}