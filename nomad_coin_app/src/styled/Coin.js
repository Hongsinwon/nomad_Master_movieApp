import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 2rem;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
`;

export const BackBtn = styled.button`
  position: fixed;
  font-size: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  max-width: 480px;
  width: 100%;
  font-size: 4rem;
  color: ${(props) => props.theme.accentColor};
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 10px;
`;

export const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
export const Description = styled.p`
  margin: 20px 0px;
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
