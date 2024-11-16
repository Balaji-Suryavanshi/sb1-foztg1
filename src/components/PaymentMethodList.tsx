import React from 'react';
import { CreditCard, Check, Trash2 } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentMethodListProps {
  paymentMethods: PaymentMethod[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PaymentMethodList({
  paymentMethods,
  selectedId,
  onSelect,
  onDelete
}: PaymentMethodListProps) {
  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedId === method.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => onSelect(method.id)}
        >
          <div className="flex items-center gap-3">
            <CreditCard className={`h-6 w-6 ${method.isDefault ? 'text-blue-600' : 'text-gray-400'}`} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{method.brand}</span>
                <span className="text-gray-500">•••• {method.last4}</span>
                {method.isDefault && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    Default
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Expires {method.expiryMonth}/{method.expiryYear}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedId === method.id && (
              <Check className="h-5 w-5 text-blue-600" />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(method.id);
              }}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}