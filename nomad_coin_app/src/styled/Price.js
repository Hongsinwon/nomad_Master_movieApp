import styled from 'styled-components';

export const PriceUl = styled.ul``;

export const PriceLi = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  span {
    color: ${(props) => props.theme.accentColor};
    font-weight: bold;
  }
`;
