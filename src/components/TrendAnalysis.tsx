import React from 'react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types/finance';
import { calculateMonthlyTrends } from '../utils/trendUtils';

interface TrendAnalysisProps {
  transactions: Transaction[];
}

export const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ transactions }) => {
  const monthlyTrends = calculateMonthlyTrends(transactions);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Spending Trends</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tickFormatter={(value) => format(new Date(value), 'MMM yy')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => format(new Date(value), 'MMMM yyyy')}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#ef4444" 
              name="Expenses"
            />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#22c55e" 
              name="Income"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};