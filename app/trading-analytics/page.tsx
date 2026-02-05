'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import CandlestickChart from '../../components/CandlestickChart';
import AIAssistant from '../../components/AIAssistant';

interface Trade {
  type: 'win' | 'loss';
  amount: number;
  userId: string;
}

const TradingAnalytics = () => {
  const { user } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [tradeType, setTradeType] = useState<'win' | 'loss'>('win');
  const [tradeAmount, setTradeAmount] = useState('');

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'trades'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tradesData: Trade[] = [];
        querySnapshot.forEach((doc) => {
          tradesData.push(doc.data() as Trade);
        });
        setTrades(tradesData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const addTrade = async () => {
    if (tradeAmount && user) {
      await addDoc(collection(db, 'trades'), {
        type: tradeType,
        amount: parseFloat(tradeAmount),
        userId: user.uid,
      });
      setTradeAmount('');
    }
  };

  const totalTrades = trades.length;
  const winningTrades = trades.filter(trade => trade.type === 'win').length;
  const losingTrades = trades.filter(trade => trade.type === 'loss').length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const totalGain = trades.filter(trade => trade.type === 'win').reduce((sum, trade) => sum + trade.amount, 0);
  const totalLoss = trades.filter(trade => trade.type === 'loss').reduce((sum, trade) => sum + trade.amount, 0);
  const averageGain = winningTrades > 0 ? totalGain / winningTrades : 0;
  const averageLoss = losingTrades > 0 ? totalLoss / losingTrades : 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Trading Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Trades" value={totalTrades.toString()} />
        <Card title="Win Rate" value={`${winRate.toFixed(2)}%`} />
        <Card title="Average Gain" value={`$${averageGain.toFixed(2)}`} />
        <Card title="Average Loss" value={`$${averageLoss.toFixed(2)}`} />
      </div>

      <div className="mt-8 bg-gray-800 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Add New Trade</h2>
        <div className="flex space-x-4">
          <select value={tradeType} onChange={(e) => setTradeType(e.target.value as 'win' | 'loss')} className="bg-gray-700 text-white p-2 rounded-md">
            <option value="win">Win</option>
            <option value="loss">Loss</option>
          </select>
          <input type="number" value={tradeAmount} onChange={(e) => setTradeAmount(e.target.value)} placeholder="Amount" className="bg-gray-700 text-white p-2 rounded-md" />
          <button onClick={addTrade} className="bg-blue-500 text-white p-2 rounded-md">Add Trade</button>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Trade History</h2>
        <ul className="space-y-2">
          {trades.map((trade, index) => (
            <li key={index} className={`flex justify-between p-2 rounded-md ${trade.type === 'win' ? 'bg-green-500' : 'bg-red-500'}`}>
              <span>{trade.type.charAt(0).toUpperCase() + trade.type.slice(1)}</span>
              <span>${trade.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 bg-gray-800 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Trade Performance</h2>
        <div className="h-96 bg-gray-700 rounded-md">
          <CandlestickChart />
        </div>
      </div>
      <AIAssistant trades={trades} />
    </div>
  );
};

export default TradingAnalytics;
