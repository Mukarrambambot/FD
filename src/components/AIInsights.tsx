import React from 'react';
import { AlertTriangle, TrendingUp, CheckCircle, Info } from 'lucide-react';
import { Transaction } from '../types/finance';
import { generateSpendingInsights, predictNextMonthSpending } from '../utils/aiUtils';

interface AIInsightsProps {
  transactions: Transaction[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ transactions }) => {
  const insights = generateSpendingInsights(transactions);
  const predictions = predictNextMonthSpending(transactions);

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          AI Insights
        </h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border flex items-start space-x-3
                ${insight.type === 'warning' ? 'bg-amber-50 border-amber-200' :
                  insight.type === 'success' ? 'bg-green-50 border-green-200' :
                  'bg-blue-50 border-blue-200'}`}
            >
              {getIcon(insight.type)}
              <p className="text-sm">{insight.message}</p>
            </div>
          ))}
          {insights.length === 0 && (
            <p className="text-center text-gray-500">
              Add more transactions to receive AI-powered insights
            </p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Next Month Predictions
        </h3>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{prediction.category}</p>
                <p className="text-sm text-gray-500">
                  Predicted: ${prediction.predictedAmount.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm font-medium
                    ${prediction.trend === 'up' ? 'text-red-600' :
                      prediction.trend === 'down' ? 'text-green-600' :
                      'text-gray-600'}`}
                >
                  {prediction.trend === 'up' ? '↑' :
                   prediction.trend === 'down' ? '↓' : '→'}
                  {Math.abs(prediction.percentage)}%
                </span>
              </div>
            </div>
          ))}
          {predictions.length === 0 && (
            <p className="text-center text-gray-500">
              Add more transactions to see spending predictions
            </p>
          )}
        </div>
      </div>
    </div>
  );
};