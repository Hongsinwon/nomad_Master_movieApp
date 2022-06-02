import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from './api';
import styled from 'styled-components';

const PriceUl = styled.ul``;

const PriceLi = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  span {
    color: ${(props) => props.theme.accentColor};
    font-weight: bold;
  }
`;

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface PriceParams {
  coinId: string;
}

const Price = () => {
  const { coinId } = useParams<keyof PriceParams>() as PriceParams;
  const { isLoading, data } = useQuery<IHistorical[]>(['price', coinId], () =>
    fetchCoinHistory(coinId)
  );

  console.log(data);

  return (
    <div>
      {isLoading ? (
        '가격 로딩중...'
      ) : (
        <PriceUl>
          <PriceLi>
            Open Price: <span>123</span>
          </PriceLi>
          <PriceLi>
            High Price: <span>123</span>
          </PriceLi>
          <PriceLi>
            Low Price : <span>123</span>
          </PriceLi>
          <PriceLi>
            Close Price : <span>123</span>
          </PriceLi>
        </PriceUl>
      )}
    </div>
  );
};

export default Price;
