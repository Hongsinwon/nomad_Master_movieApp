import React, { useState } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  border: 3px solid ${(props) => props.borderColor};
`;

//타입설정
interface CircleProps {
  bgColor: string;
  borderColor?: string; //옵션
  text?: string;
}
//props: CircleProps도 가능하다
function Circle({ bgColor, borderColor, text = 'default text' }: CircleProps) {
  const [counter, setCounter] = useState<number | string>(1);
  setCounter(2);
  setCounter('2');

  return (
    <div>
      <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text}
      </Container>
    </div>
  );
}

export default Circle;

// interface PlayerShape {
//   name: string;
//   age: number;
// }

// const sayHello = (playObj: PlayerShape) =>
//   `Hello ${playObj.name} you are ${playObj.age} years old.`;

// sayHello({ name: 'nico', age: 30 });
// sayHello({ name: 'hi', age: 12, hello: 1 });
