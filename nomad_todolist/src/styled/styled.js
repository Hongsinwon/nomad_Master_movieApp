import styled from 'styled-components';

export const WrapDiv = styled.div`
  width: 480px;
  margin: 0 auto;
`;

export const TodoTitle = styled.h1`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

export const TodoSelect = styled.select`
  height: 30px;
  width: 100px;
  margin-bottom: 8px;
  border: none;
  border-radius: 5px;
  background-color: #ddd;
  text-align: center;
`;

export const TodoOption = styled.option``;

export const TodoForm = styled.form`
  display: flex;
`;

export const TodoInput = styled.input`
  display: flex;
  flex-grow: 1;
  height: 40px;
  margin-right: 10px;
  padding: 0 10px;
  border: none;
  border-radius: 5px;
`;

export const TodoBtn = styled.button`
  height: 40px;
  width: 80px;
  border: none;
  border-radius: 5px;
  background-color: #00249b;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;

export const TodoLi = styled.li`
  margin-top: 20px;
  padding: 16px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  list-style: none;
`;

export const TodoListText = styled.p`
  font-size: 16px;
  padding: 10px 0;
`;

export const TodoBtnList = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  border-top: 1px solid #555;
  padding-top: 10px;
`;
