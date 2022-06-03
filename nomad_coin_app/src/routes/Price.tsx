import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinTickers } from '../api/api';
import { PriceUl, PriceLi } from '../styled/Price';

import { PriceData, PriceParams } from '../type/Price';

const Price = () => {
  const { coinId } = useParams<keyof PriceParams>() as PriceParams;
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId)
  );

  return (
    <div>
      {tickersLoading ? (
        '가격 로딩중...'
      ) : (
        <PriceUl>
          <PriceLi>
            percent_change_1h:
            <span>{tickersData?.quotes.USD.percent_change_1h}</span>
          </PriceLi>
          <PriceLi>
            percent_change_6h:
            <span>{tickersData?.quotes.USD.percent_change_6h}</span>
          </PriceLi>
          <PriceLi>
            percent_change_12h :
            <span>{tickersData?.quotes.USD.percent_change_12h}</span>
          </PriceLi>
          <PriceLi>
            percent_change_24h :
            <span>{tickersData?.quotes.USD.percent_change_24h}</span>
          </PriceLi>
          <PriceLi>
            percent_change_7d :
            <span>{tickersData?.quotes.USD.percent_change_7d}</span>
          </PriceLi>
        </PriceUl>
      )}
    </div>
  );
};

export default Price;
