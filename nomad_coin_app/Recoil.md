# ๐ช recoil์ ๋ฆฌ์กํธ ์ ์ฉ์ผ๋ก ๋์จ state(์ํ) ๊ด๋ฆฌ ๋ผ์ด๋ธ๋ฌ๋ฆฌ.

</br>

> `Recoil.js` https://recoiljs.org/ </br>
> Recoil์ React ํ๋ก์ ํธ๋ฅผ ์ํ ๋ง์ ์ ์ญ ์ํ๊ด๋ฆฌ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ค ์ค ํ๋๋ก, 2020๋ 5์ Facebook์์ ์ถ์ํ์๋ค. </br>
> ๊ทธ๋ ๊ธฐ์, ๋ค๋ฅธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ(Redux, Mobx)์๋ ๋ฌ๋ฆฌ React ์ ์ฉ์ด๋ฉฐ React์ ์ต์ ํ๋์ด ์๋ค๊ณ  ํ  ์ ์๋ค.

</br>

<b>โญโญ recoil์ ์ด์ฉํด์ ๊ธ๋ก๋ฒ๋ฅผ ๊ด๋ฆฌํ๋ฉด ์ํ๊ด๋ฆฌํ๋ ์ฝ๋๊ฐ ๋งค์ฐ ๊ฐ๊ฒฐํด์ง๋๋ค. โญโญ</b>

</br>

<b>๐ ์ฅ์  </b>

1. ๋ฐฐ์ฐ๊ธฐ ์ฝ์ต๋๋ค.
2. ๋น๋๊ธฐ๋ฐ์ดํฐ, ์ํ์ง์์ฑ, ๋งค๊ฐ๋ณ์ํ๋ selector๋ฅผ ์ฒ๋ฆฌํ  ์ ์๋ ์๋ฃป.
3. ์บ์ฑ์ง์.
4. try catch ์ฌ์ฉ์ ์ํด๋ ๋๋ ๋ถ๋ถ์ด ์์ต๋๋ค.

</br>

<b>๐ ๋จ์  </b>

1. `์บ์ฑ์ ์ง์ํ๋ ๋ถ๋ถ์ด์์ต๋๋ค.` </br>
   ๊ฒ์์ ํ๊ฑฐ๋ ์ค์๊ฐ ๋ฐ์ดํฐ๋ฅผ ์กฐํํด์ผํ๋ ๋ถ๋ถ๋ค์ด ๋ง์์ต๋๋ค.
   ๊ทธ๋ด๋๋ง๋ค ์บ์ฑ์ฒ๋ฆฌ๋ฅผ ์ํด atom๊ฐ์ ๋ถํ์ํ๊ฒ ์๋ฐ์ดํธํด์ฃผ๋ฉด์ ์์์ ์งํํ์์ต๋๋ค.
2. `์๋ฌ ํธ๋ค๋ง?` </br>
   recoil์ค๋ฅ๋ผ๋ ๊ฒ์ ์๋ ค์ฃผ์ง ์๊ณ  ์ฉ๋ฑ๋ง์ ๋ค๋ฅธ ์ปดํฌ๋ํธ์์ ์๋ฌ๊ฐ ๋ฐ์ํ๋ค๊ณ  ์๋ ค์ฃผ๋ ์  ๋ฑ
3. `์ง๊ด์ ์ด์ง ์๋ค?` </br>
   ์๋ฅผ ๋ค์ด redux์ ๊ฒฝ์ฐ์๋ ๋ฒํผ ํด๋ฆญ์์ dipatch๋ฅผ ํตํด reducer๋ฅผ ์คํํ๋ค ์ด๋ฌํ ๊ตฌ์กฐ์ธ๋ฐ ๋ฐํด,
   recoil์ ๊ฒฝ์ฐ ๋ฒํผ ํด๋ฆญ์์ atom๊ฐ์ ์๋ฐ์ดํธํ์ฌ selector๋ด๋ถ์์ atom๊ฐ์ ์ฐธ์กฐํ๋ ๊ฒฝ์ฐ ์๋ฐ์ดํธ๋๋ ๊ตฌ์กฐ์๋๋ค.

</br>

## ์ค์น

</br>

> npm(yarn) ํน์ CDN 2๊ฐ์ง ๋ฐฉ์์ผ๋ก ์ ์ฉํ  ์ ์๋ค.

Recoil์ Webpack๊ณผ ๊ฐ์ ๋ชจ๋ ๋ฒ๋ค๋ฌ์ ํธํ์ด ๋๋ฉฐ, ES6 โก๏ธ 5๋ก๋ ํธ๋์คํ์ผ๋ง ๋์ง ์๊ธฐ ๋๋ฌธ์ ํฌ๋ก์ค ๋ธ๋ผ์ฐ์ง์ ์ํด Babel์ ํตํ ์ฝ๋ ์ปดํ์ผ ๊ณผ์ ์ด ์๊ตฌ๋๋ค.

</br>

```javascript
// npm ๐ npm install recoil (typescript ์๋์ง์)
npm install recoil

// CDN
<script src="https://cdn.jsdelivr.net/npm/recoil@0.0.11/umd/recoil.production.js"></script>
```

</br>

## 1. Recoil์ ์ด์ฉํด ์ด๋ป๊ฒ ๊ธ๋ก๋ฒ ์ํ๊ด๋ฆฌ๋ฅผ ์ ์ธ๋ฐฉ๋ฒ

</br>

1. `Recoil ์ ์ฉ๋ฐฉ๋ฒ` ๐ RecoilRoot ์ ์ฉ</br>
   Recoil์ ํ์ฉํ๊ธฐ ์ํด index.tsx ์ต์๋จ์ <App /> ์ปดํฌ๋ํธ๋ฅผ `<RecoilRoot>` ๋ก ๊ฐ์ธ์ฃผ๊ธฐ๋ง ํ๋ฉด ๋๋ค!

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

2. ๊ธ๋ก๋ฒ State ๋ง๋ค๊ธฐ ๐ atom.ts ํด๋๋ฅผ ๋ง๋ค์ด Atoms ์ค์ 

> `Atoms` ๐ Recoil์ atom() ๋ฉ์๋๋ฅผ ํตํด ๋ณ์์ ํ ๋น </br>
> Atoms๋ Recoil ์ํ์ ๋จ์๋ฅผ ์๋ฏธํ๋ค. ์ปดํฌ๋ํธ๊ฐ์ ์ด ์ํ๋ ๊ณต์ ๋๋ฉฐ, ๊ตฌ๋ ๋ฐ ์๋ฐ์ดํธ๊ฐ ๊ฐ๋ฅํ๋ค.
>
> ํนํ, atom์ ์ํ๊ฐ ์๋ฐ์ดํธ๋๋ฉด, ์ด๋ฅผ ๊ตฌ๋ํ๋ ์ปดํฌ๋ํธ๋ค์ด ๋ชจ๋ ๋ฆฌ๋ ๋๋ง๋๋ค.
>
> `key` : ๊ณ ์ ํ key ๊ฐ (๋ณดํต ํด๋น atom์ ์์ฑํ๋ ๋ณ์ ๋ช์ผ๋ก ์ง์ ํฉ๋๋ค.) </br> `default` : atom ์ ์ด๊ธฐ๊ฐ์ ์ ์ํฉ๋๋ค. ์ ์ ์ธ ๊ฐ(int, string...), promise, ๋ค๋ฅธ atom ์ ๊ฐ์ผ๋ก ์ค์ ํ  ์ ์์ต๋๋ค.

</br>

```javascript
import { atom } from 'recoil';

export const counterAtom = atom({
  // key๋ ์ค์ฒฉ๋์ง ์๊ฒ ์ค์ 
  key: 'counter',
  // default ๊ฐ์ Promise ๊ฐ์ฒด๋ ์ค์ ๊ฐ๋ฅํ๋, atom์์ ๋ฐ๋ก ๋น๋๊ธฐ ์์ฒญ์ ํ  ์ ์๋ค.
  default: 1,
});
```

</br>

## 2. ์ ์ธํ ๊ธ๋ก๋ฒ ์ํ๊ด๋ฆฌ๋ฅผ ์ด๋ป๊ฒ ์ปดํฌ๋ํธ ์์์ ์ฌ์ฉํ๋์ง

</br>

1. useRecoilState()</br>
   - `useRecoilState()` : useState() ์ ์ ์ฌํ๋ค. `[state, setState] ํํ์ ํ ๋น`ํ๋ฉฐ, ์ธ์์ Atoms(ํน์ Selector)๋ฅผ ๋ฃ์ด์ค๋ค.

```javascript
import { useRecoilState } from 'recoil';
import { counterAtom } from '../atom.ts';

function ReadWriteCount() {
  // useRecoilState ์ ํตํ value, setter ๋ฐํ ๐ useState์ ๋์ผํ ์ฌ์ฉ๋ฒ
  const [count, setCount] = useRecoilState(counterAtom);

  return (
    <>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>์ฆ๊ฐ</button>
      <button onClick={() => setCount(count - 1)}>๊ฐ์</button>
    </>
  );
}
```

</br>

2. useRecoilValue(), useRecoilValue(), useResetRecoilState() ํ๋ฒ์ ์ ๋ฆฌ </br>

   - `useRecoilValue()` : ์ ์ญ์ํ์ `state ์ํ๊ฐ๋ง์ ์ฐธ์กฐ`ํ๊ธฐ ์ํด ์ฌ์ฉ๋๋ค. ์ ์ธ๋ ๋ณ์์ ํ ๋นํ์ฌ ์ฌ์ฉํ๋ฉด ๋๋ค.

    </br>

   - `useSetRecoilState()` : ์ ์ญ์ํ์ `setter ํจ์๋ง์ ํ์ฉ`ํ๊ธฐ ์ํด ์ฌ์ฉ๋๋ค. ์ ์ธ๋ ํจ์๋ณ์์ ํ ๋นํ์ฌ ์ฌ์ฉํ๋ฉด ๋๋ค.

    </br>

   - `useResetRecoilState()` : ์ ์ญ์ํ๋ฅผ `default(์ด๊ธฐ๊ฐ)์ผ๋ก Reset ํ๊ธฐ ์ํด ์ฌ์ฉ`๋๋ค. ์ ์ธ๋ ํจ์๋ณ์์ ํ ๋นํ์ฌ ์ฌ์ฉํ๋ฉด ๋๋ค.

  </br>
  
```javascript
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { counterAtom } from '../atom.ts';

function ReadWriteCount() {
const countValue = useRecoilValue(countState); // ๊ตฌ๋ํ๋ atom ์ ๊ฐ๋ง ๋ฐํ
const setCountValue = useSetRecoilState(countState); // ๊ฐ์ ๋ณ๊ฒฝํ๋ ํจ์๋ง ๋ฐํ
const resetCount = useResetRecoilState(countState); // ์ค์ ๋ ๊ธฐ๋ณธ๊ฐ์ผ๋ก ๋ฆฌ์

return (
<>

<h2>{countValue}</h2>
<button onClick={() => setCountValue(count + 1)}>์ฆ๊ฐ</button>
<button onClick={() => setCountValue(count - 1)}>๊ฐ์</button>
<button onClick={resetCount}>๋ฆฌ์ ๋ฒํผ</button>
</>
);
}
```
