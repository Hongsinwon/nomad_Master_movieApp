import React, { useState } from 'react';

const ToDoList = () => {
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
};

export default ToDoList;
