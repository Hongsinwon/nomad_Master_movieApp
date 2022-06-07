import { atom } from 'recoil';

export interface IToDo {
  text: string;
  category: 'To_Do' | 'DOING' | 'DONE';
  id: number;
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});
