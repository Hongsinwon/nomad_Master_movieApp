import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Coin, Coins, Chart, Price } from './index';

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Coins />} />
        {/* 
        라우터에서 coinId이름을 정의해줌 useParams에서 추적할 수 있음 {coinId : api id값}
        💥 coinId는 어떻게 받아오는가? 
        items 컴포넌트에서 <Link to={`/${map돌린값.id}`} ....> 로 주소에 id값 삽입
        */}
        <Route path='/:coinId' element={<Coin />}>
          <Route path='price' element={<Price />} />
          <Route path='chart' element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
