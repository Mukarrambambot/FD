import { Transaction } from '../types/finance';

export interface SpendingInsight {
  type: 'warning' | 'success' | 'info';
  message: string;
  category?: string;
}

export interface SpendingPrediction {
  category: string;
  predictedAmount: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

export const generateSpendingInsights = (transactions: Transaction[]): SpendingInsight[] => {
  const insights: SpendingInsight[] = [];
  const categorySpending = new Map<string, number[]>();
  
  // Group transactions by category and month
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const month = new Date(t.date).getMonth();
      if (!categorySpending.has(t.category)) {
        categorySpending.set(t.category, Array(12).fill(0));
      }
      categorySpending.get(t.category)![month] += t.amount;
    });

  // Analyze spending patterns
  categorySpending.forEach((spending, category) => {
    const lastThreeMonths = spending.slice(-3);
    const average = lastThreeMonths.reduce((a, b) => a + b, 0) / 3;
    const lastMonth = lastThreeMonths[2] || 0;

    if (lastMonth > average * 1.5) {
      insights.push({
        type: 'warning',
        category,
        message: `Your ${category} spending increased by ${((lastMonth/average - 1) * 100).toFixed(0)}% compared to your 3-month average`
      });
    }

    if (lastMonth < average * 0.5 && average > 0) {
      insights.push({
        type: 'success',
        category,
        message: `Great job! Your ${category} spending decreased by ${((1 - lastMonth/average) * 100).toFixed(0)}% compared to your 3-month average`
      });
    }
  });

  // Add general financial health insights
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const savingsRate = (totalIncome - totalExpenses) / totalIncome;
  
  if (savingsRate < 0.2 && totalIncome > 0) {
    insights.push({
      type: 'warning',
      message: 'Your savings rate is below 20%. Consider reducing non-essential expenses to increase your savings.'
    });
  } else if (savingsRate > 0.3) {
    insights.push({
      type: 'success',
      message: 'Great job! You\'re saving more than 30% of your income.'
    });
  }

  return insights;
};

export const predictNextMonthSpending = (transactions: Transaction[]): SpendingPrediction[] => {
  const predictions: SpendingPrediction[] = [];
  const categorySpending = new Map<string, number[]>();

  // Group transactions by category and month
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const month = new Date(t.date).getMonth();
      if (!categorySpending.has(t.category)) {
        categorySpending.set(t.category, Array(12).fill(0));
      }
      categorySpending.get(t.category)![month] += t.amount;
    });

  categorySpending.forEach((spending, category) => {
    const lastThreeMonths = spending.slice(-3);
    const average = lastThreeMonths.reduce((a, b) => a + b, 0) / 3;
    const trend = lastThreeMonths[2] > lastThreeMonths[0] ? 'up' : 
                 lastThreeMonths[2] < lastThreeMonths[0] ? 'down' : 'stable';
    
    // Simple prediction based on trend
    let predictedAmount = average;
    if (trend === 'up') {
      predictedAmount *= 1.1; // Assume 10% increase
    } else if (trend === 'down') {
      predictedAmount *= 0.9; // Assume 10% decrease
    }

    predictions.push({
      category,
      predictedAmount,
      trend,
      percentage: trend === 'up' ? 10 : trend === 'down' ? -10 : 0
    });
  });

  return predictions;
};