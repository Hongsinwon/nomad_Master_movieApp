import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// localStorage = https://www.npmjs.com/package/recoil-persist

//type category = 'TO_DO' | 'DOING' | 'DONE';

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface IToDo {
  text: string;
  category: Categories;
  id: number;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    //1차
    // return [
    //   toDos.filter((toDo) => toDo.category === 'TO_DO'),
    //   toDos.filter((toDo) => toDo.category === 'DOING'),
    //   toDos.filter((toDo) => toDo.category === 'DONE'),
    // ];

    //2차
    // if (category === 'TO_DO')
    //   return toDos.filter((toDo) => toDo.category === 'TO_DO');
    // if (category === 'DOING')
    //   return toDos.filter((toDo) => toDo.category === 'DOING');
    // if (category === 'DONE')
    //   return toDos.filter((toDo) => toDo.category === 'DONE');

    return toDos.filter((toDo) => toDo.category === category);
  },
});
