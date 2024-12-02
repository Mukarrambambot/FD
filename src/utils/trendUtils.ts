import { Transaction } from '../types/finance';
import { startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

interface MonthlyTrend {
  month: Date;
  income: number;
  expenses: number;
}

export const calculateMonthlyTrends = (transactions: Transaction[]): MonthlyTrend[] => {
  const endDate = new Date();
  const startDate = subMonths(endDate, 11); // Last 12 months
  
  const months = eachMonthOfInterval({ start: startDate, end: endDate });
  
  return months.map(month => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    const monthTransactions = transactions.filter(t => 
      t.date >= monthStart && t.date <= monthEnd
    );
    
    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      month: monthStart,
      income,
      expenses
    };
  });
};