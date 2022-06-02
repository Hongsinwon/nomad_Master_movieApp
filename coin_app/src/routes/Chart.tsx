import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface CharParams {
  coinId: string;
}
const Chart = () => {
  const { coinId } = useParams<keyof CharParams>() as CharParams;

  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        '차트 로딩중...'
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: '가격',
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            theme: { mode: 'dark' },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: 'transparent',
            },
            stroke: { curve: 'smooth', width: 4 },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { show: false },
              type: 'datetime',
              categories: data?.map((price) => price.time_close) as string[],
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
            colors: ['#0fbcf9'],
            tooltip: { y: { formatter: (value) => `$${value.toFixed(2)}` } },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
