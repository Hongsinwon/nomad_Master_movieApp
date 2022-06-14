import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { GlocalStyle } from './styled/GlocalStyle';
import { theme } from './theme';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GlocalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
