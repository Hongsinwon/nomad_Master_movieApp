import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #000;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: 'Black Han Sans';
  width: 50%;
  line-height: 1.2;
  font-size: 48px;
  margin-bottom: 14px;
  text-shadow: 0 0 15px #555, 0 0 7px #333, 0 0 5px #000;
`;

export const MoviInfo = styled.p`
  margin-bottom: 40px;
  color: #ccc;
  span {
    margin-left: 14px;
    margin-right: 6px;
    padding: 1px 6px 2px;
    border-radius: 4px;
    font-size: 12px;
    background-color: #000;
    color: #999;

    &:first-child {
      margin-left: 0px;
    }
  }
`;

export const Overview = styled.p`
  line-height: 1.4;
  font-size: 14px;
  width: 50%;
  color: #ccc;
`;

export const MainMovie = styled(motion.button)`
  margin-top: 32px;
  width: 140px;
  height: 30px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.8s;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    color: red;
  }
`;
