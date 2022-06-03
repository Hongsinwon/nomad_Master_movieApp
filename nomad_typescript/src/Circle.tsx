import { useState } from 'react';
import styled from 'styled-components';

// ContainerProps styled-component 전용 타입설정
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
  //state typescript 방법
  const [counter, setCounter] = useState<number | string>(1);

  return (
    <div>
      <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text} {counter}
      </Container>
    </div>
  );
}

// interface PlayerShape {
//   name: string;
//   age: number;
// }

// const sayHello = (playObj: PlayerShape) =>
//   `Hello ${playObj.name} you are ${playObj.age} years old.`;

// sayHello({ name: 'nico', age: 30 });
// sayHello({ name: 'hi', age: 12, hello: 1 });

export default Circle;
