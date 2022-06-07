import { getValue } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

/*
  // 라이브러리 미사용 todo list
  const ToDoListText = () => {
  const [todo, setTodo] = useState('');
  const [todoError, setTodoError] = useState('');

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodoError('');
    setTodo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo.length < 10) {
      return setTodoError('todo list가 너무 짧습니다.');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder='일정을 적어주세요'
          value={todo}
          onChange={onChange}
        />
        <button>저장</button>
        {todoError !== '' ? todoError : null}
      </form>
    </div>
  );
}; */

interface IForm {
  firstName: string;
  name: string;
  email: string;
  todo: string;
  password: string;
  password1: string;
  extraError?: string;
}

const ToDoListText = () => {
  // register 를 사용하면 onChange 이벤트 핸들러가 필요가 없다. (= 동일한 기능 제공)
  // register( 'key값')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: { email: '@naver.com' },
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: '패스워드가 다릅니다.' },
        { shouldFocus: true }
      );
    }
    //setError('extraError', { message: '서버가 오프라인입니다.' });
  };
  console.log(errors);

  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{ display: 'flex', flexDirection: 'column', padding: '10vw' }}
      >
        <input
          {...register('firstName', {
            required: '성을 작성해주세요.',
            minLength: 2,
            validate: {
              noHong: (value) =>
                value.includes('신원') ? "'Hong'은 중복된 성입니다" : true,
              noNick: (value) =>
                value.includes('nick') ? "'Nick'은 중복된 성입니다" : true,
            },
          })}
          placeholder='성을 작성해 주세요.'
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register('name', {
            required: '이름을 작성해주세요',
            validate: (value) =>
              value.includes('신원') ? "'신원'은 중복된 이름입니다" : true,
          })}
          placeholder='이름을 작성해 주세요.'
        />
        <span>{errors?.name?.message}</span>
        <input
          {...register('email', {
            required: '이메일을 작성해 주세요',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: '@naver.com만 가능합니다',
            },
          })}
          placeholder='이메일을 작성해 주세요.'
        />
        <span>{errors?.email?.message}</span>

        <input
          {...register('password', {
            required: '패스워드를 입력해주세요',
            minLength: { value: 10, message: '10자 이상 작성해주세요' },
          })}
          placeholder='패스워드를 입력해주세요'
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register('password1', {
            required: '패스워드를 입력해주세요',
            minLength: { value: 10, message: '10자 이상 작성해주세요' },
          })}
          placeholder='패스워드를 입력해주세요.'
        />
        <span>{errors?.password1?.message}</span>

        <input
          {...register('todo', {
            required: '일정을 작성해주세요',
          })}
          placeholder='일정을 작성해 주세요.'
        />
        <span>{errors?.todo?.message}</span>
        <button>입력</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </>
  );
};

export default ToDoListText;
