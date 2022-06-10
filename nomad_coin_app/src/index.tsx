import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import App from './App';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
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

18버전 업데이트
npm i react@next react-dom@next

createRoot 속성 업데이트
npm i @types/react @types/react-dom
*/
