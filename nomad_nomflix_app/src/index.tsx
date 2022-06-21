import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { GlocalStyle } from "./styled/GlocalStyle";
import { theme } from "./theme";

// 컴포넌트가 useQuery 훅 안에서 QueryClient 인스턴스에 접근할 수 있도록
//QueryClientProvider를 컴포넌트 트리 상위에 추가해줘야 한다.
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
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
