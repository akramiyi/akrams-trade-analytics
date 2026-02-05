'use client';

import { useState } from 'react';

interface AIAssistantProps {
  trades: any[];
}

const AIAssistant = ({ trades }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);

  const generateInsights = () => {
    const totalTrades = trades.length;
    if (totalTrades === 0) {
      setInsights(["No trades yet. Add some trades to get insights."]);
      return;
    }

    const winningTrades = trades.filter(trade => trade.type === 'win').length;
    const winRate = (winningTrades / totalTrades) * 100;

    const newInsights: string[] = [];

    if (winRate < 50) {
      newInsights.push("Your win rate is below 50%. Consider reviewing your trading strategy.");
    } else {
      newInsights.push("Your win rate is above 50%. Keep up the good work!");
    }

    const losingTrades = trades.filter(trade => trade.type === 'loss');
    if (losingTrades.length > 0) {
        const largestLoss = Math.max(...losingTrades.map(trade => trade.amount));
        newInsights.push(`Your largest loss was $${largestLoss.toFixed(2)}. Consider using a stop-loss to limit your downside.`);
    }


    setInsights(newInsights);
  };

  const toggleAssistant = () => {
    if (!isOpen) {
      generateInsights();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button onClick={toggleAssistant} className="bg-blue-500 text-white p-4 rounded-full shadow-lg">
        AI Assistant
      </button>
      {isOpen && (
        <div className="bg-gray-800 text-white p-4 rounded-md shadow-lg mt-2 max-w-sm">
          <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
