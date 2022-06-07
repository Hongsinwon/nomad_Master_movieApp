import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

interface IForm {
  toDo: string;
}

function ToDoList() {
  // 1은 2-1, 2-2 를 합친것
  // 1. const [toDos, setToDos] = useRecoilState(toDoState);
  // 2-1. const value = useRecoilValue(toDoState);
  // 2-2. const modFn = useSetRecoilState(toDoState);

  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>나의 ToDo List</h1>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
