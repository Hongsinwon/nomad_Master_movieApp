import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 2rem;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 10vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 4rem;
  color: ${(props) => props.theme.accentColor};
`;

export const DarkModeBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 2rem;
  background-color: transparent;
  border: none;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

export const CoinList = styled.ul``;

export const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid #fff;
  margin-bottom: 1rem;
  border-radius: 1rem;
  line-height: 1.6;

  a {
    display: flex;
    align-items: center;
    padding: 2rem;
    transition: color 0.3s;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Img = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 1rem;
`;
