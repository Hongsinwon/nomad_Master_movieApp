import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { isDarkAtom } from "../atom";
import { fetchCoins } from "../api/api";

// styled components
import {
  Container,
  Header,
  Title,
  DarkModeBtn,
  Loader,
  CoinList,
  Coin,
  Img
} from "../styled/Coins";

import { ICoin } from "../type/Coins";

const Coins = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);

  const [darkBtn, setDarkBtn] = useState(true);

  const toggleDarkAtom = () => {
    setDarkAtom((current) => !current);
    setDarkBtn((current) => !current);
    return null;
  };

  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  // 주석 처리 해야하는 것
  // const [data, setCoins] = useState<ICoin[]>([]);
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
  //     const josn = await response.json();
  //     setCoins(josn.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  // ------ 주석 끝 ------

  return (
    <Container>
      <Helmet>
        <title>코인 트레커</title>
      </Helmet>
      <Header>
        <Title>코인 트레커</Title>
        <DarkModeBtn onClick={toggleDarkAtom}>
          {darkBtn ? "🌃 다크모드" : "🏙️ 라이트모드"}
        </DarkModeBtn>
      </Header>
      {isLoading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => {
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

// 💥💥💥useQuery 사용설명💥💥💥
//isLoading 👉 함수를 불렀는지 아닌지 알려준다. 함수가 끝났을때 결과를 fetchConins에 넣어줍니다.
//fetchConins에 넣은데이터를 data에 쉬운 방법으로 접근 할 수 있도록 도와줍니다.

//'allCoins'이라는 고유의 key값을 react query에 넘겨주면 이미 캐시가 있는 data는 바로 화면이 보여준다.
// const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
