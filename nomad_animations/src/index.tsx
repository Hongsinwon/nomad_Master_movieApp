import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlocalStyle } from './styled/GlocalStyle';
import App from './AnimateBox';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlocalStyle />
    <App />
  </React.StrictMode>
);

/* 
Framer Motion

React용 production-ready 모션 라이브러리 (오픈 소스)

https://www.framer.com/motion
https://github.com/framer/motion

npx create-react-app my-app --template typescript
*/
