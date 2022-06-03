import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import {
  useLocation,
  useParams,
  Outlet,
  useMatch,
  useNavigate,
} from 'react-router-dom';

import { fetchCoinInfo, fetchCoinTickers } from '../api/api';

// styled components
import styled from 'styled-components';
import {
  Container,
  Header,
  BackBtn,
  Title,
  Loader,
  Overview,
  OverviewItem,
  Description,
  Tabs,
} from '../styled/Coin';

import { RouteParams, LocationParams, PriceData, InfoData } from '../type/Coin';

// 타입 설정된 styled => props
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Coin = () => {
  const { coinId } = useParams<keyof RouteParams>() as RouteParams;
  const { state } = useLocation() as LocationParams;
  const navigate = useNavigate();

  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId)
  );

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 10000 }
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <BackBtn onClick={() => navigate('/')}>⬅️</BackBtn>
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price :</span>
              <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
      <Tabs>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>Chart</Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>Price</Link>
        </Tab>
      </Tabs>
      <div className='tab'>
        <Outlet />
      </div>
    </Container>
  );
};

export default Coin;

// 💥💥💥useParams설명과 type 지정💥💥💥
// useParams는 URL 인자들의 key/value(키/값) 짝들의 객체를 반환한다.
// 현재 <Route> 의 match.params에 접근하기 위해 사용한다.

//react-router-dom v6 이상인 경우, useParams() 만 쓰더라도 타입이 string | undefined 일 거라고 알아서 예상해 줍니다.
//const { coinId } = useParams<keyof RouteParams>() as RouteParams;

// 💥💥💥기존 api 호출💥💥💥
// const [loading, setLoading] = useState(true);
// const [info, setInfo] = useState<InfoData>();
// const [priceInfo, setPriceInfo] = useState<PriceData>();

/*   
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceDate = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceDate);
      setLoading(false);
    })();
  }, [coinId]);
   */

// 💥💥💥useQuery 사용설명💥💥💥
// argument가 필요 없을때 👉 fetchCoinTickers
// argument가 필요 있을때 👉 익명함수 실행 () => fetchCoinTickers(coinId)

// key값은 reqct query캐시시스템에서 저장되고 작동하기 위한 고유한 값 (중복 X)
// 배열을 만들어 첫번째 key값이 카테고리의 역활을 진행 두번째 key값은 URL에 있는 coinId가 되어 고유한 부분이 된다.
// const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
//   ['tickers', coinId],
//   () => fetchCoinTickers(coinId),
//   { refetchInterval: 10000 }
// );
