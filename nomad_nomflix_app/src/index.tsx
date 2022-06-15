import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { GlocalStyle } from './styled/GlocalStyle';
import { theme } from './theme';

import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOMClient.createRoot(rootElement);

const client = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlocalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
