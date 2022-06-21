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

<b>⭐⭐ React Query을 ㅇ용하면 비동기 관련한 코드가 간결하고 간편해 집니다. ⭐⭐</b>

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
   `상위`에서 QueryClient를 생성 후 넣어줍니다. `ReactQueryDevtools`는 React-Query의 `개발도구`입니다.

</br>

```javascript
// npm
import { QueryClient, QueryClientProvider } from 'react-query';

// ... 이하생략

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <ReactQueryDevtools initialIsOpen={true} />
  </React.StrictMode>
);
```
