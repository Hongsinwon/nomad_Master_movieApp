import Router from "./routes/Router";
//import { ReactQueryDevtools } from "react-query/devtools";

import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";

import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";

import { GlocalStyle } from "./styled/GlocalStyle"; //styled-components

function App() {
  // const [isDark, setIsDark] = useState(true);
  // const toggleDark = () => setIsDark((current) => !current);

  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlocalStyle />
        <Router />
        {/* react query툴인데 캐시에 어떤 query가 있는지 보여줌 + 결과 data 출력 */}
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </ThemeProvider>
    </>
  );
}

export default App;
