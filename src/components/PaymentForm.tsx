import React, { useState } from 'react';
import { PaymentFormData } from '../types';

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  isProcessing?: boolean;
}

export function PaymentForm({ onSubmit, isProcessing = false }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input w-full"
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          className="input w-full"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="expiryMonth"
              value={formData.expiryMonth}
              onChange={handleChange}
              className="input"
              placeholder="MM"
              maxLength={2}
              required
            />
            <input
              type="text"
              name="expiryYear"
              value={formData.expiryYear}
              onChange={handleChange}
              className="input"
              placeholder="YY"
              maxLength={2}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
            CVC
          </label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            className="input w-full"
            placeholder="123"
            maxLength={4}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="btn btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : 'Add Payment Method'}
      </button>
    </form>
  );
}