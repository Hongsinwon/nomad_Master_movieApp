import React, { useState, useEffect } from 'react';
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
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchConins);
  console.log(isLoading, data);

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
      <Header>
        <Title>코인</Title>
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
