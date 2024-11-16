import React from 'react';
import { Header } from './components/Header';
import { AuctionCard } from './components/AuctionCard';
import { AuctionDetails } from './components/AuctionDetails';
import { Modal } from './components/Modal';
import { Filter, TrendingUp } from 'lucide-react';
import { useAuctions } from './hooks/useAuctions';
import { Toaster } from 'react-hot-toast';

function App() {
  const {
    auctions,
    selectedAuction,
    handlePlaceBid,
    handleSelectAuction,
    handleCloseModal
  } = useAuctions();

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Active Auctions</h1>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 border border-gray-300 rounded-lg hover:border-blue-600">
              <Filter size={20} />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 border border-gray-300 rounded-lg hover:border-blue-600">
              <TrendingUp size={20} />
              <span>Sort</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onClick={handleSelectAuction}
            />
          ))}
        </div>
      </main>

      <Modal isOpen={!!selectedAuction} onClose={handleCloseModal}>
        {selectedAuction && (
          <AuctionDetails
            auction={selectedAuction}
            onPlaceBid={handlePlaceBid}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;