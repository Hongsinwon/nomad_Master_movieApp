import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from '../api/api';
import ApexChart from 'react-apexcharts';
import { isDarkAtom } from '../atom';
import { useRecoilValue } from 'recoil';
import { CharParams, IHistorical } from '../type/Chart';

const Chart = () => {
  const isDark = useRecoilValue(isDarkAtom);

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
          type='candlestick'
          // series={[
          //   {data?.map((price) => {
          //       return [
          //         Date.parse(price.time_close),
          //         price.open,
          //         price.high,
          //         price.low,
          //         price.close,
          //       ];
          //     }),
          //   },
          // ]}
          options={{
            theme: { mode: isDark ? 'dark' : 'light' },
            chart: {
              type: 'candlestick',
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: 'transparent',
            },
            stroke: { curve: 'smooth', width: 2 },
            // grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { show: false },
              type: 'datetime',
              categories: [1, 2, 3, 4, 5, 6],
              //categories: data?.map((price) => price.time_close) as string[],
            },
            colors: ['#0fbcf9'],
          }}
        />
      )}
    </div>
  );
};

export default Chart;

/*  
// 차트
*/
