# 🪄 React Query는 비동기 로직을 쉽게 다루게 해주는 라이브러리.

</br>

> `React Query` https://react-query.tanstack.com/ </br>
> server state를 아주 효율적으로 관리할 수 있다. </br>
> 기존에 isLoading, isError, refetch, 데이터 캐싱 등 개발자가 직접 구현하려면 꽤 귀찮거나 까다로웠던 기능을 제공해준다.

</br>

### React query에서 제공하는 것

1. 캐싱
2. 중복 요청 제거
3. 백그라운드 상태에서의 업데이트
4. 데이터의 유효시간을 설정하고 유효 시간이 지난 것을 아는것
5. 병렬적 요청 수행
6. GC(가비지 컬렉션/Garbage Collection)
7. 페이지 네이션, lazy loading
8. 편리한 디버깅 툴
9. SSR, Next.js 지원

</br>

<b>⭐⭐ React Query을 이용하면 비동기 관련한 코드가 간결하고 간편해 집니다. ⭐⭐</b>

</br>

<b>👍 장점 </b>

1. 전역 상태를 관리하기 위한 복잡한 코드들이 생략되어 `개발 속도`가 빨라진다.
2. 코드가 간소화되어 `유지보수가 편리`하다.
3. 캐싱, 병렬 요청, 데이터 자동 리패치 등 처리하기 어려운 기능들이 잘 구현되어 있어 좋은 개발자 경험을 제공한다.
4. provider에서 query key로 해싱하여 데이터를 관리하고, GC가 제공되는 등 `최적화`가 잘 되어있다.
5. context, state등 리액트 `내부 최적화의 지원`을 받도록 설계되어 있다.
6. server state, client state를 `나누어 관리`하기 때문에 redux와 같은 전역 상태에서 서버 캐싱 데이터를 들어내고, ui와 테마 같은 상태만 남길 수 있게 된다.

</br>

<b>👎 단점 </b>

1. 프로젝트 규모가 아주 작은 경우 라이브러리에서 제공하는 컨텍스트를 유지하는 비용이 효용보다 더 커질 수 있다.
2. 컴포넌트 내부에서 사용되기 때문에 프로젝트 내 규칙을 미리 설립하지 않으면 컴포넌트 종속적인 코드가 될 우려가 있다.

</br>

## 설치

</br>

```javascript
// npm
npm install react-query

//CDN
<script src="https://unpkg.com/react-query/dist/react-query.production.min.js"></script>
```

</br>

## 1. React query 설정 및 api

</br>

1. 최상단 컴포넌트에서 React-Query 준비 </br>
   `상위`에서 QueryClient를 생성 후 넣어줍니다.</br>
   React Query는 캐시를 관리하기 위해 `QueryClient` 인스턴스를 사용합니다. </br>컴포넌트가 useQuery 훅 안에서 `QueryClient 인스턴스에 접근`할 수 있도록 `QueryClientProvider`를 컴포넌트 트리 `상위에 추가`해줘야 한다.

</br>

`index.tsx`

```javascript
import { QueryClient, QueryClientProvider } from 'react-query';

// ... 이하생략

const queryClient = new QueryClient(); // 인스턴스 생성

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

</br>

2.  ReactQueryDevtools 설정 </br>
    `ReactQueryDevtools`는 React-Query의 `개발도구`입니다. </br>
    React Query를 시작할 때 이러한 devTools가 필요합니다. 그들은 React Query의 모든 내부 작업을 시각화하는 데 도움이되며 문제가 발생할 경우 다시 디버깅을 `시간을 절약`할 수 잇습니다.

</br>

`App.tsx`

```javascript
// devtools는 react-query/devtools 패키지에 포함되어 있습니다. (추가설치X)
import { ReactQueryDevtools } from 'react-query/devtools';

// ... 이하생략

function App() {
  return (
    <>
      <Router />
      {/* react query툴인데 캐시에 어떤 query가 있는지 보여줌 + 결과 data 출력 */}
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
```

</br>

3. api 작성

</br>

`api.js`

```javascript
const BASE_URL = `https://api.coinpaprika.com/v1`;

// 코인 데이터(모든)
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

// 해당 Id와 동일한 코인 데이터
export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}
```

</br>

## useQuery 사용설명

`useQuery사용 공식문서` https://react-query.tanstack.com/reference/useQuery

</br>

```javascript
// useQuery로 문법
const { data, isLoading } = useQuery(queryKey, queryFunction, options);
```

</br>

✅ <b>리턴 데이터</b> </br>

1.  `data` : 쿼리 함수가 리턴한 Promise에서 resolve된 데이터 </br>
2.  `isLoading` : 저장된 캐시가 없는 상태에서 데이터를 요청중일 때 true </br>
3.  `isFetching` : 캐시가 있거나 없거나 데이터가 요청중일 때 true </br>

</br></br>

> `queryKey` : 문자열과 배열을 넣을 수 있습니다. 쿼리 키가 가지는 유연함이 곧 캐싱을 처리를 쉽게 만들어준다. `쿼리 키가 다르면 캐싱도 별도로 관리`하기 때문입니다.
>
> key는 꼭 string일 필요는 없고, 배열과 객체도 들어갈 수 있는데, 이 경우 `여러가지 데이터`들을 담을 수 있다.

</br>

💥 queryKey 사용 예시

```javascript
// useQuery로 문법
useQuery(['todo', 1], ...)
useQuery(['todo', 2], ...)
```

</br>

```javascript
// 객체 필드의 값이 달라도 다른 키로 취급한다
useQuery(['todo', { preview: true }], ...)
useQuery(['todo', { preview: false }], ...)
```

</br>

```javascript
// 객체 필드의 순서가 달라도 내용이 같으면 같은 키로 취급한다
useQuery(['todo', { preview: true, status: 'done' }], ...)
useQuery(['todo', { status: 'done', preview: true }], ...)
```

</br>

> `queryFunction` : 서버에서 데이터를 요청하고 Promise를 리턴하는 함수를 전달합니다. </br>
> 즉 axios.get(...), fetch(...) 등을 리턴하는 함수입니다.

</br>

📌 <b>옵션</b>

1. `cacheTime` : unused 또는 inactive 캐시 데이터가 메모리에서 유지될 시간. 기본값은 5분이며 설정한 시간을 초과하면 메모리에서 제거됩니다. `Infinity`로 설정하면 쿼리 데이터는 캐시에서 제거되지 않는다.

2. `staleTime` : 쿼리 데이터가 fresh 에서 stale로 전환되는데 걸리는 시간. 기본값은 `0`입니다 .`Infinity`로 설정하면 쿼리 데이터는 직접 캐시를 무효화할 때까지 fresh 상태로 유지된다.
   캐시는 메모리에서 관리되므로 브라우저 새로고침 후에는 다시 가져온다.

3. `enabled` : `false` 값이 전달되면 쿼리가 비활성화된다. 데이터 요청에 사용할 파라미터가 유효한 값일 때만 true를 할당하는 식으로 활용할 수 있다.

4. `onSuccess` : 쿼리 함수가 성공적으로 데이터를 가져왔을 때 호출되는 함수.

5. `onError` : 쿼리 함수에서 오류가 발생했을 때

6. `onSettled` : 쿼리 함수의 성공, 실패 두 경우 모두 실행된다.

7. `keepPreviousData` : 쿼리 키(ex.페이지 번호)가 변경되어서 새로운 데이터를 요청하는 동안에도 마지막 `data`값을 유지한다. 페이지네이션을 구현할 때 유용하다. 캐시되지 않은 페이지를 가져올 때 화면에서 목록이 사라지는 깜빡임 현상을 방지할 수 있다. `isPreviousData` 값으로 현재의 쿼리 키에 해당하는 값인지 확인할 수 있다.

8. `initialData` : 캐시된 데이터가 없을 때 표시할 초기값. `placeholder`로 전달한 데이터와 달리 캐싱이 된다. 브라우저 로컬 스토리지에 저장해 둔 값으로 데이터를 초기화할 때 사용할 수 있을 것이다.

9. `refetchOnWindowFocus` : 윈도우가 다시 포커스되었을 때 데이터를 호출할 것인지 여부. 기본값은 `true`이므로 필요없다고 판단되면 끄면 된다.

</br>

## React Query 사용(서버 데이터 가져오기) 및 설명

</br>
1. api useQuery를 이용해 불러오기

`Coins.tsx`

```javascript
import { useQuery } from 'react-query';

const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

console.log(isLoading, data)
```

</br></br>

`Coin.tsx`

```javascript
import { useQuery } from 'react-query';

const { isLoading: infoLoading, data: infoData } =
  useQuery < InfoData > (['info', coinId], () => fetchCoinInfo(coinId));

console.log(infoLoading, infoData); 

const { isLoading: tickersLoading, data: tickersData } =
  useQuery < PriceData > (['tickers', coinId], () => fetchCoinTickers(coinId), { enabled: !!coinId });

console.log(tickersLoading, infoDtickersDataata); 
```
