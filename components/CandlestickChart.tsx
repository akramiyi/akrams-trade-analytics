'use client';

import { useState, useEffect } from 'react';
import { getDailyChartData } from '../lib/alphaVantage';
import { Chart } from './Chart';

const CandlestickChart = () => {
  const [chartData, setChartData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [movingAverageData, setMovingAverageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const data = await getDailyChartData('IBM');
      if (data && data['Time Series (Daily)']) {
        const dailyData = Object.entries(data['Time Series (Daily)']).map(([date, values]) => ({
          time: date,
          open: parseFloat(values['1. open']),
          high: parseFloat(values['2. high']),
          low: parseFloat(values['3. low']),
          close: parseFloat(values['4. close']),
          volume: parseFloat(values['5. volume']),
        })).reverse(); // Reverse to have dates in ascending order

        const candlestickData = dailyData.map(d => ({ time: d.time, open: d.open, high: d.high, low: d.low, close: d.close }));
        const volumeChartData = dailyData.map(d => ({ time: d.time, value: d.volume, color: d.open > d.close ? 'rgba(239, 83, 80, 0.5)' : 'rgba(38, 166, 154, 0.5)' }));

        // Calculate 50-day moving average
        const movingAverage = dailyData.map((d, i, arr) => {
          if (i < 49) return null; // Not enough data for 50-day MA
          const sum = arr.slice(i - 49, i + 1).reduce((acc, val) => acc + val.close, 0);
          return { time: d.time, value: sum / 50 };
        }).filter(Boolean);

        setChartData(candlestickData as any);
        setVolumeData(volumeChartData as any);
        setMovingAverageData(movingAverage as any);

      } else {
        setError("Could not fetch chart data. Please check your API key and network connection. The free Alpha Vantage API has a limit of 25 requests per day.");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading chart...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <Chart data={chartData} volumeData={volumeData} movingAverageData={movingAverageData} title="IBM Daily Chart" seriesType="candlestick" />;
};

export default CandlestickChart;
