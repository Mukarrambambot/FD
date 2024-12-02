export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  type: 'income' | 'expense';
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
}

export interface SpendingByCategory {
  category: string;
  amount: number;
  percentage: number;
}