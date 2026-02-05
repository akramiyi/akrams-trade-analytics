'use client'

import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export const Chart = (props: any) => {
	const {
		data,
		volumeData,
    movingAverageData,
    title,
		seriesType = 'area', // default to area
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef<HTMLDivElement>(null);

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
			};

			const chart = createChart(chartContainerRef.current as any, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current?.clientWidth,
				height: 400, // Increased height for better view with volume
        rightPriceScale: {
          scaleMargins: {
            top: 0.3,
            bottom: 0.25,
          },
        },
			});
			chart.timeScale().fitContent();

			let series;
      if (seriesType === 'candlestick') {
          series = chart.addCandlestickSeries({
              upColor: '#26a69a',
              downColor: '#ef5350',
              borderDownColor: '#ef5350',
              borderUpColor: '#26a69a',
              wickDownColor: '#ef5350',
              wickUpColor: '#26a69a',
          });
      } else { // 'area'
			    series = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
      }
			series.setData(data);

      if (volumeData) {
        const volumeSeries = chart.addHistogramSeries({
          color: '#26a69a',
          priceFormat: {
            type: 'volume',
          },
          priceScaleId: '',
        });
        volumeSeries.priceScale().applyOptions({
          scaleMargins: {
            top: 0.7, // 70% of the chart height for the main series
            bottom: 0,
          },
        });
        volumeSeries.setData(volumeData);
      }

      if (movingAverageData) {
        const maSeries = chart.addLineSeries({ color: 'blue', lineWidth: 2 });
        maSeries.setData(movingAverageData);
      }

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, volumeData, movingAverageData, seriesType, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
		  <div
			  ref={chartContainerRef}
		  />
    </div>
	);
};
