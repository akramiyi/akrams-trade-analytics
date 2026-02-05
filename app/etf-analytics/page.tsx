'use client';

import Card from '../../components/Card';
import CandlestickChart from '../../components/CandlestickChart';

const ETFAnalytics = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ETF Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Average CAGR" value="8%" />
        <Card title="3-Year Return" value="25%" />
        <Card title="5-Year Return" value="50%" />
        <Card title="Expense Ratio" value="0.25%" />
      </div>
      <div className="mt-8 bg-gray-800 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">ETF Performance</h2>
        <div className="h-96 bg-gray-700 rounded-md">
          <CandlestickChart />
        </div>
      </div>
    </div>
  );
};

export default ETFAnalytics;
