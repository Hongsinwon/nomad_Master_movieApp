import React from 'react';
import styled, { keyframes } from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Btn = styled.button`
  color: #fff;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

// input.attrs에 required  minLength: "10" 공통으로 넣기
const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: #ddd;
  border: 0;
  margin-right: 10px;
`;

// ---------------------------------------------------------------------------

const Emoji = styled.span`
  font-size: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const rotateAnimation = keyframes`
  0% {
    transform : rotate(0deg);
    border-radius : 0px;
  } 50% {
    border-radius : 50%;
  } 100% {
    transform : rotate(360deg);
    border-radius : 0px;
  }
`;

const BoxWeapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  background-color: blue;

  animation: ${rotateAnimation} 5s linear infinite;

  span {
    font-size: 100px;
    &:hover {
      opacity: 0.5;
    }
  }
  span:hover {
    font-size: 150px;
  }

  ${Emoji} {
    &:hover {
      font-size: 100px;
    }
  }
`;

// ---------------------------------------------------------------------------

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <>
      {/*as 속성변경 div 👉 header 로 변경된걸 알 수 있음. */}
      <Father as='header'>
        <Box bgColor='teal' />
        <Circle bgColor='tomato' />
        <div>
          <Input />
          <Input />
          <Btn>로그인</Btn>
          <Btn as='a' href='/'>
            로그인
          </Btn>
        </div>
      </Father>

      {/* Animations & pseudo Selectors */}
      <Wrapper>
        <BoxWeapper>
          <span>🏰</span>
          <Emoji as='b'>💥</Emoji>
        </BoxWeapper>
        <Emoji>🧷</Emoji>
      </Wrapper>

      <Wrapper>
        <Title>안녕하세요</Title>
      </Wrapper>
    </>
  );
}

export default App;
