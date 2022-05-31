import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Coin, Coins, Chart, Price } from './index';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Coins />} />

        <Route path='/:coinId' element={<Coin />}>
          <Route path='price' element={<Price />} />
          <Route path='chart' element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
