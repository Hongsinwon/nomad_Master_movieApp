import React from 'react';
import { useState } from 'react';
import Circle from './Circle';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  const [value, setValue] = useState('');

  // 'any' 어떤 타입이든 가능하다.
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    //setValue(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;

    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Circle bgColor='teal' text='텍스트입니다' />
      <Circle bgColor='tomato' borderColor='teal' />

      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type='text'
          placeholder='당신의 이름은 무엇입니까?'
        />
        <button> 로그인</button>
      </form>

      <Container>
        <H1>내용입니다.</H1>
      </Container>
    </>
  );
}

export default App;
