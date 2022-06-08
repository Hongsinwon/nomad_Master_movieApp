import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Categories, categoryState, toDoSelector } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

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
    <div>
      <h1>나의 ToDo List</h1>
      <form>
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}> To Do</option>
          <option value={Categories.DOING}> Doing</option>
          <option value={Categories.DONE}> Done</option>
        </select>
      </form>
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
    </div>
  );
}
export default ToDoList;
