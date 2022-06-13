import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';

import { WrapDiv, TodoForm, TodoInput, TodoBtn } from '../styled/styled.js';

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };

  return (
    <WrapDiv>
      <TodoForm onSubmit={handleSubmit(handleValid)}>
        <TodoInput
          {...register('toDo', {
            required: 'Please write a To Do',
          })}
          placeholder='오늘의 할일을 적어주세요'
        />
        <TodoBtn>등록</TodoBtn>
      </TodoForm>
    </WrapDiv>
  );
};

export default CreateToDo;
