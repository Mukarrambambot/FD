import { Budget, Transaction } from '../types/finance';
import { startOfMonth, endOfMonth } from 'date-fns';

export const calculateBudgetProgress = (budgets: Budget[], transactions: Transaction[]): Budget[] => {
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  return budgets.map(budget => {
    const spent = transactions
      .filter(t => 
        t.type === 'expense' &&
        t.category === budget.category &&
        t.date >= monthStart &&
        t.date <= monthEnd
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      ...budget,
      spent
    };
  });
};