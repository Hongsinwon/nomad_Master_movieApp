import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));

const rootElement = document.getElementById('root');
// ⛔️ Argument of type 'HTMLElement | null' is not
// assignable to parameter of type 'Element | DocumentFragment'.
// Type 'null' is not assignable to type 'Element | DocumentFragment'.ts(2345)
const root = createRoot(rootElement as Element);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
