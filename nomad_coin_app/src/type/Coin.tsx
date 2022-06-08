// useParams 타입지정
export interface RouteParams {
  coinId: string;
}

export interface LocationParams {
  state: { name: string; rank?: number };
}

// info data 타입지정
export interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;

  first_data_at: string;
  last_data_at: string;
}

// price data 타입지정
export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

/* 
console.log에서 데이터 정리하기 (노마드 코드  4-6강)
1. console.log 안에 있는 console => 오른쪽 마우스 => Store object as global varible
2. object 데이터 저장 출력 확인 (temp1 ...)
3. key 배열 받아오기 => Object.keys(temp1).join()
4. value 배열 받아오기 => Object.values(temp1).map((v)=> typeof v).join();
*/
