# 🪄 recoil은 리액트 전용으로 나온 state(상태) 관리 라이브러리.

</br>

> `Recoil.js` https://recoiljs.org/ </br>
> Recoil은 React 프로젝트를 위한 많은 전역 상태관리 라이브러리들 중 하나로, 2020년 5월 Facebook에서 출시하였다. </br>
> 그렇기에, 다른 라이브러리(Redux, Mobx)와는 달리 React 전용이며 React에 최적화되어 있다고 할 수 있다.

</br>

<b>⭐⭐ recoil을 이용해서 글로벌를 관리하면 상태관리하는 코드가 매우 간결해집니다. ⭐⭐</b>

</br>

<b>👍 장점 </b>

1. 배우기 쉽습니다.
2. 비동기데이터, 상태지속성, 매개변수화된 selector를 처리할 수 있는 솔룻.
3. 캐싱지원.
4. try catch 사용을 안해도 되는 부분이 있습니다.

</br>

<b>👎 단점 </b>

1. `캐싱을 지원하는 부분이었습니다.` </br>
   검색을 하거나 실시간 데이터를 조회해야하는 부분들이 많았습니다.
   그럴때마다 캐싱처리를 위해 atom값을 불필요하게 업데이트해주면서 작업을 진행하였습니다.
2. `에러 핸들링?` </br>
   recoil오류라는 것을 알려주지 않고 쌩뚱맞은 다른 컴포넌트에서 에러가 발생했다고 알려주는 점 등
3. `직관적이지 않다?` </br>
   예를 들어 redux의 경우에는 버튼 클릭시에 dipatch를 통해 reducer를 실행한다 이러한 구조인데 반해,
   recoil의 경우 버튼 클릭시에 atom값을 업데이트하여 selector내부에서 atom값을 참조하는 경우 업데이트되는 구조입니다.

</br>

## 설치

</br>

> npm(yarn) 혹은 CDN 2가지 방식으로 적용할 수 있다.

Recoil은 Webpack과 같은 모듈 번들러와 호환이 되며, ES6 ➡️ 5로는 트랜스파일링 되지 않기 때문에 크로스 브라우징을 위해 Babel을 통한 코드 컴파일 과정이 요구된다.

</br>

```javascript
// npm 👉 npm install recoil (typescript 자동지원)
npm install recoil

// CDN
<script src="https://cdn.jsdelivr.net/npm/recoil@0.0.11/umd/recoil.production.js"></script>
```

</br>

## 1. Recoil을 이용해 어떻게 글로벌 상태관리를 선언방법

</br>

1. `Recoil 적용방법` 👉 RecoilRoot 적용</br>
   Recoil을 활용하기 위해 index.tsx 최상단의 <App /> 컴포넌트를 `<RecoilRoot>` 로 감싸주기만 하면 된다!

</br>

```javascript
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

```

</br>

2. 글로벌 State 만들기 👉 atom.ts 폴더를 만들어 Atoms 설정

> `Atoms` 👉 Recoil의 atom() 메서드를 통해 변수에 할당 </br>
> Atoms는 Recoil 상태의 단위를 의미한다. 컴포넌트간에 이 상태는 공유되며, 구독 및 업데이트가 가능하다.
>
> 특히, atom의 상태가 업데이트되면, 이를 구독하던 컴포넌트들이 모두 리렌더링된다.
>
> `key` : 고유한 key 값 (보통 해당 atom을 생성하는 변수 명으로 지정합니다.) </br> `default` : atom 의 초기값을 정의합니다. 정적인 값(int, string...), promise, 다른 atom 의 값으로 설정할 수 있습니다.

</br>

```javascript
import { atom } from 'recoil';

export const counterAtom = atom({
  // key는 중첩되지 않게 설정
  key: 'counter',
  // default 값은 Promise 객체도 설정가능하나, atom에서 바로 비동기 요청을 할 순 없다.
  default: 1,
});
```

</br>

## 2. 선언한 글로벌 상태관리를 어떻게 컴포넌트 안에서 사용하는지

</br>

1. useRecoilState()</br>
   - `useRecoilState()` : useState() 와 유사하다. `[state, setState] 튜플에 할당`하며, 인자에 Atoms(혹은 Selector)를 넣어준다.

```javascript
import { useRecoilState } from 'recoil';
import { counterAtom } from '../atom.ts';

function ReadWriteCount() {
  // useRecoilState 을 통한 value, setter 반환 👉 useState와 동일한 사용법
  const [count, setCount] = useRecoilState(counterAtom);

  return (
    <>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>
    </>
  );
}
```

</br>

2. useRecoilValue(), useRecoilValue(), useResetRecoilState() 한번에 정리 </br>

   - `useRecoilValue()` : 전역상태의 `state 상태값만을 참조`하기 위해 사용된다. 선언된 변수에 할당하여 사용하면 된다.

    </br>

   - `useSetRecoilState()` : 전역상태의 `setter 함수만을 활용`하기 위해 사용된다. 선언된 함수변수에 할당하여 사용하면 된다.

    </br>

   - `useResetRecoilState()` : 전역상태를 `default(초기값)으로 Reset 하기 위해 사용`된다. 선언된 함수변수에 할당하여 사용하면 된다.

  </br>
  
```javascript
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { counterAtom } from '../atom.ts';

function ReadWriteCount() {
const countValue = useRecoilValue(countState); // 구독하는 atom 의 값만 반환
const setCountValue = useSetRecoilState(countState); // 값을 변경하는 함수만 반환
const resetCount = useResetRecoilState(countState); // 설정된 기본값으로 리셋

return (
<>

<h2>{countValue}</h2>
<button onClick={() => setCountValue(count + 1)}>증가</button>
<button onClick={() => setCountValue(count - 1)}>감소</button>
<button onClick={resetCount}>리셋 버튼</button>
</>
);
}
```
