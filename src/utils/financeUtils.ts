import { Transaction, SpendingByCategory } from '../types/finance';

export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getSpendingByCategory = (transactions: Transaction[]): SpendingByCategory[] => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpenses = calculateTotalExpenses(transactions);
  
  const categoryMap = new Map<string, number>();
  expenses.forEach(t => {
    categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
  });
  
  return Array.from(categoryMap.entries()).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / totalExpenses) * 100
  }));
};