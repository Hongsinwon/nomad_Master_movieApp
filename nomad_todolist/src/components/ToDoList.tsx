import { useRecoilValue } from 'recoil';
import { toDoSelector, toDoState } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  // 1은 2-1, 2-2 를 합친것
  // 1. const [toDos, setToDos] = useRecoilState(toDoState);
  // 2-1. const value = useRecoilValue(toDoState);
  // 2-2. const modFn = useSetRecoilState(toDoState);

  // const toDos = useRecoilValue(toDoState);
  const [toDo, doing, done] = useRecoilValue(toDoSelector);

  return (
    <div>
      <h1>나의 ToDo List</h1>
      <CreateToDo />
      <h2>To Do</h2>
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
