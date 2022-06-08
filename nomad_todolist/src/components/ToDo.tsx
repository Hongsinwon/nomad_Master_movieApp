import React from 'react';
import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';


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
  return (
    <li>
      <span>{text}</span>
      {category !== 'DOING' && (
        <button name='DOING' onClick={onClick}>
          Doing
        </button>
      )}
      {category !== 'To_Do' && (
        <button name='To_Do' onClick={onClick}>
          To Do
        </button>
      )}
      {category !== 'DONE' && (
        <button name='DONE' onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
};

export default ToDo;
