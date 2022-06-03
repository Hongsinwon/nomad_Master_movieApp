import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from '../atom';
import { fetchCoins } from './api';

const Container = styled.div`
  padding: 0 2rem;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: ${(props) => props.theme.accentColor};
`;

const DarkModeBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 2rem;
  background-color: transparent;
  border: none;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid #fff;
  margin-bottom: 1rem;
  border-radius: 1rem;
  line-height: 1.6;

  a {
    display: flex;
    align-items: center;
    padding: 2rem;
    transition: color 0.3s;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 1rem;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {
    setDarkAtom((current) => !current);
    return null;
  };

  //isLoading 👉 함수를 불렀는지 아닌지 알려준다. 함수가 끝났을때 결과를 fetchConins에 넣어줍니다.
  //fetchConins에 넣은데이터를 data에 쉬운 방법으로 접근 할 수 있도록 도와줍니다.

  //'allCoins'이라는 고유의 key값을 react query에 넘겨주면 이미 캐시가 있는 data는 바로 화면이 보여준다.
  // const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

  const [data, setCoins] = useState<ICoin[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
      const josn = await response.json();
      setCoins(josn.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>코인 트레커</title>
      </Helmet>
      <Header>
        <Title>코인 트레커</Title>
        <DarkModeBtn onClick={toggleDarkAtom}>다크모드 ⭐</DarkModeBtn>
      </Header>
      {isLoading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <CoinList>
          {data?.map((coin) => {
            console.log(coin);
            return (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                    alt={coin.name}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            );
          })}
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;
