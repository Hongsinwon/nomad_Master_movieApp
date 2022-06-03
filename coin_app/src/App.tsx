import Router from './routes/Router';
import { createGlobalStyle } from 'styled-components';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';

import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atom';

const GlocalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Song+Myung&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

html {
  font-size: 10px;
 
}
body {
  line-height: 1;
  font-family: 'Song Myung', serif;
  font-size : 1.4rem;
  background-color: ${(props) => props.theme.bgColor};
  
}
body,
input,
button,
select,
textarea,
th,
td {
  color: ${(props) => props.theme.textColor};
}
a {
  text-decoration: none;
  color: inherit;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
`;

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
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
