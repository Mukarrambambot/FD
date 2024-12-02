import React from 'react';
import { format } from 'date-fns';
import { Transaction } from '../types/finance';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {transaction.category} • {format(transaction.date, 'MMM d, yyyy')}
                </p>
              </div>
              <p
                className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
            </div>
          ))}
          {transactions.length === 0 && (
            <p className="text-center text-gray-500">No transactions yet</p>
          )}
        </div>
      </div>
    </div>
  );
};