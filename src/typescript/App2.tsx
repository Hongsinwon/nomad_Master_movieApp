import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  width: 100vw;
  height: 100vh;
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const App2 = () => {
  return (
    <Container>
      <H1>안녕하세요 App2 입니다.</H1>
    </Container>
  );
};

export default App2;
