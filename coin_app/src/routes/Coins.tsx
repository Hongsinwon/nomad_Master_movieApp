import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchConins } from './api';

const Container = styled.div`
  padding: 0 2rem;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: ${(props) => props.theme.accentColor};
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: #fff;
  color: ${(props) => props.theme.bgColor};
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
  //isLoading 👉 함수를 불렀는지 아닌지 알려준다. 함수가 끝났을때 결과를 fetchConins에 넣어줍니다.
  //fetchConins에 넣은데이터를 data에 쉬운 방법으로 접근 할 수 있도록 도와줍니다.

  //'allCoins'이라는 고유의 key값을 react query에 넘겨주면 이미 캐시가 있는 data는 바로 화면이 보여준다.
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchConins);

  /*   
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
      const josn = await response.json();
      setCoins(josn.slice(0, 100));
      setLoading(false);
    })();
  }, []);
   */

  return (
    <Container>
      <Helmet>
        <title>코인 트레커</title>
      </Helmet>
      <Header>
        <Title>코인 트레커</Title>
      </Header>
      {isLoading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <CoinList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  alt={coin.name}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;
