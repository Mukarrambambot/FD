import React, { useState } from 'react';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { Budget, Transaction } from '../types/finance';
import { calculateBudgetProgress } from '../utils/budgetUtils';

interface BudgetManagerProps {
  transactions: Transaction[];
  onAddBudget: (budget: Budget) => void;
  budgets: Budget[];
}

export const BudgetManager: React.FC<BudgetManagerProps> = ({ transactions, onAddBudget, budgets }) => {
  const [newBudget, setNewBudget] = useState({ category: '', limit: '' });
  const budgetProgress = calculateBudgetProgress(budgets, transactions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBudget({
      category: newBudget.category,
      limit: parseFloat(newBudget.limit),
      spent: 0
    });
    setNewBudget({ category: '', limit: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Budget Management</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={newBudget.category}
              onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Limit</label>
            <input
              type="number"
              value={newBudget.limit}
              onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Budget
        </button>
      </form>

      <div className="space-y-4">
        {budgetProgress.map((budget) => (
          <div key={budget.category} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{budget.category}</h3>
              <span className="text-sm text-gray-500">
                ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    {((budget.spent / budget.limit) * 100).toFixed(0)}%
                  </span>
                </div>
                {budget.spent > budget.limit && (
                  <div className="flex items-center text-red-500 text-xs">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Over budget
                  </div>
                )}
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${Math.min((budget.spent / budget.limit) * 100, 100)}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    budget.spent > budget.limit ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};