'use client';

import Card from '../../components/Card';
import CandlestickChart from '../../components/CandlestickChart';

const MutualFundAnalytics = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mutual Fund Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Average XIRR" value="12%" />
        <Card title="Average CAGR" value="10%" />
        <Card title="3-Year Return" value="30%" />
        <Card title="5-Year Return" value="60%" />
      </div>
      <div className="mt-8 bg-gray-800 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Mutual Fund Performance</h2>
        <div className="h-96 bg-gray-700 rounded-md">
          <CandlestickChart />
        </div>
      </div>
    </div>
  );
};

export default MutualFundAnalytics;
