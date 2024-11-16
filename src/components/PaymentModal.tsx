import React, { useState } from 'react';
import { Modal } from './Modal';
import { PaymentForm } from './PaymentForm';
import { PaymentMethodList } from './PaymentMethodList';
import { PaymentFormData, PaymentMethod } from '../types';
import { PlusCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentMethodId: string) => void;
}

export function PaymentModal({ isOpen, onClose, onConfirm }: PaymentModalProps) {
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '24',
      brand: 'Visa',
      isDefault: true
    }
  ]);

  const handleAddCard = (data: PaymentFormData) => {
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: 'credit',
      last4: data.cardNumber.slice(-4),
      expiryMonth: data.expiryMonth,
      expiryYear: data.expiryYear,
      brand: 'Visa', // In a real app, this would be determined by the card number
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods(prev => [...prev, newMethod]);
    setShowAddCard(false);
  };

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    if (selectedMethodId === id) {
      setSelectedMethodId(null);
    }
  };

  const handleConfirm = () => {
    if (selectedMethodId) {
      onConfirm(selectedMethodId);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          {showAddCard ? 'Add Payment Method' : 'Select Payment Method'}
        </h2>

        {showAddCard ? (
          <div>
            <PaymentForm onSubmit={handleAddCard} />
            <button
              onClick={() => setShowAddCard(false)}
              className="mt-4 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <PaymentMethodList
              paymentMethods={paymentMethods}
              selectedId={selectedMethodId}
              onSelect={setSelectedMethodId}
              onDelete={handleDeleteMethod}
            />

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => setShowAddCard(true)}
                className="flex items-center justify-center gap-2 btn border border-gray-300 hover:border-blue-500 hover:text-blue-600 w-full"
              >
                <PlusCircle size={20} />
                <span>Add New Card</span>
              </button>

              <button
                onClick={handleConfirm}
                disabled={!selectedMethodId}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}