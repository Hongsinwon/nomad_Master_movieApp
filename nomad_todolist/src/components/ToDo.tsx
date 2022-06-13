import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Categories, IToDo, toDoState } from '../atoms';

import { TodoLi, TodoListText, TodoBtnList } from '../styled/styled';

export const TodoListButton = styled.button`
  height: 25px;
  width: 60px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.color || '#000'};
`;

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.name);
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      //const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  // 버튼 삭제하기
  const DeleteBtn = () => {
    setToDos((oldToDos) => {
      /* 
      간략하게 작성
      const newToDo = oldToDos.filter((todo)=> todo.id !== id)
      return newToDo
      */

      // 배운 내용을 이용해서 작성
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <TodoLi>
      <TodoListText>{text}</TodoListText>
      <TodoBtnList>
        {category !== Categories.DOING && (
          <TodoListButton name={Categories.DOING} onClick={onClick}>
            Doing
          </TodoListButton>
        )}
        {category !== Categories.TO_DO && (
          <TodoListButton name={Categories.TO_DO} onClick={onClick}>
            To Do
          </TodoListButton>
        )}
        {category !== Categories.DONE && (
          <TodoListButton name={Categories.DONE} onClick={onClick}>
            Done
          </TodoListButton>
        )}
        <TodoListButton color='red' onClick={DeleteBtn}>
          삭제
        </TodoListButton>
      </TodoBtnList>
    </TodoLi>
  );
};

export default ToDo;
