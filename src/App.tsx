import React, { useState } from 'react';
import { Transaction, Budget } from './types/finance';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { AIInsights } from './components/AIInsights';
import { BudgetManager } from './components/BudgetManager';
import { TrendAnalysis } from './components/TrendAnalysis';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const handleAddBudget = (budget: Budget) => {
    setBudgets([...budgets, budget]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Personal Finance Tracker</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Dashboard transactions={transactions} />
          </div>
          
          <div>
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>

          <div className="lg:col-span-3">
            <TrendAnalysis transactions={transactions} />
          </div>

          <div className="lg:col-span-2">
            <BudgetManager 
              transactions={transactions}
              budgets={budgets}
              onAddBudget={handleAddBudget}
            />
          </div>

          <div className="lg:col-span-1">
            <AIInsights transactions={transactions} />
          </div>
          
          <div className="lg:col-span-3">
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;