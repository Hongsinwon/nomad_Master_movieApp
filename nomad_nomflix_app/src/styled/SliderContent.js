import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 540px;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  right: 60px;
  left: 60px;

  &.none {
    position: relative;
    right: 0px;
    left: 0px;
  }
`;

export const LeftArrowBtn = styled.button`
  position: absolute;
  height: 450px;
  width: 60px;
  left: 0px;

  border: none;
  background-color: transparent;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.3);

  transition: all 0.8s;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
`;

export const RightArrowBtn = styled.button`
  position: absolute;
  height: 450px;
  width: 60px;
  right: 0px;

  border: none;
  background-color: transparent;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.3);

  transition: all 0.8s;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
`;

export const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 16px 16px 12px;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px 10px 0 0;
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    h4 {
      text-align: 20px;
    }
    p {
      span {
        margin-left: 10px;
        font-size: 10px;
        color: #ccc;
        transition: all 0.5s;

        &:hover {
          color: #fff;
        }
      }
    }
  }

  p {
    font-size: 12px;
    span.mini {
      margin-right: 8px;
      padding: 1px 5px 2px;
      font-size: 10px;
      background-color: #333;
      border-radius: 4px;
    }
    span.mini:last-child {
      margin-left: 20px;
    }
  }
`;
