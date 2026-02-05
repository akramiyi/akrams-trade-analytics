'use client'
import Card from '../components/Card';
import CandlestickChart from '../components/CandlestickChart';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Portfolio Value" value="$125,678" />
        <Card title="Daily Gain/Loss" value="$1,234" />
        <Card title="Total Return" value="$25,678" />
        <Card title="Cash Balance" value="$10,000" />
      </div>
      <div className="mt-8 bg-gray-800 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
        <div className="h-96 bg-gray-700 rounded-md">
            <CandlestickChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
