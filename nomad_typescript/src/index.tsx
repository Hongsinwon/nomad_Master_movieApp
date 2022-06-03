import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';

import App from './App';

const rootElement = document.getElementById('root');
// ⛔️ Argument of type 'HTMLElement | null' is not
// assignable to parameter of type 'Element | DocumentFragment'.
// Type 'null' is not assignable to type 'Element | DocumentFragment'.ts(2345)
const root = createRoot(rootElement as Element);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// npm i styled-components
// npm i --save-dev @types/styled-components
// Typescript 플레이그라운드 (타입스크립트 테스트) https://www.typescriptlang.org/play
// npm install --save typescript @types/node @types/react @types/react-dom @types/jest
