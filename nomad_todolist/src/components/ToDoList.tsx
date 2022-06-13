import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Categories, categoryState, toDoSelector } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

import {
  WrapDiv,
  TodoTitle,
  TodoForm,
  TodoSelect,
  TodoOption,
} from '../styled/styled.js';

function ToDoList() {
  // 1은 2-1, 2-2 를 합친것
  // 1. const [toDos, setToDos] = useRecoilState(toDoState);
  // 2-1. const value = useRecoilValue(toDoState);
  // 2-2. const modFn = useSetRecoilState(toDoState);

  // const toDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);

  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  console.log(toDos);

  return (
    <WrapDiv>
      <TodoTitle>나의 ToDo List</TodoTitle>
      <TodoForm>
        <TodoSelect value={category} onInput={onInput}>
          <TodoOption value={Categories.TO_DO}> To Do</TodoOption>
          <TodoOption value={Categories.DOING}> Doing</TodoOption>
          <TodoOption value={Categories.DONE}> Done</TodoOption>
        </TodoSelect>
      </TodoForm>
      <CreateToDo />
      {toDos?.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}

      {/* {category === 'TO_DO' &&
        toDo.map((todo) => <ToDo key={todo.id} {...todo} />)}
      {category === 'DOING' &&
        doing.map((todo) => <ToDo key={todo.id} {...todo} />)}
      {category === 'DONE' &&
        done.map((todo) => <ToDo key={todo.id} {...todo} />)} */}
    </WrapDiv>
  );
}
export default ToDoList;
