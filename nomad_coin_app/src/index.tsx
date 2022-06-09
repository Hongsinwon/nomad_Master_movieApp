import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,

  document.getElementById('root')
);

/*
CoinPaprika
https://api.coinpaprika.com/#tag/Tickers

React Query
https://react-query.tanstack.com 

CSS 재설정
https://github.com/zacanger/styled-reset/blob/master/src/index.ts

Google 글꼴
https://fonts.google.com

JSON데이터를 타입스크립트 타입으로 빠르게 변환시켜주는 사이트
https://app.quicktype.io/?l=ts

현대적이고 인터랙티브한 오픈 소스 차트
npm install --save react-apexcharts apexcharts
https://apexcharts.com
*/
