import styled from "styled-components";
import { motion } from "framer-motion";

export const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  max-width: 100vw;
  width: 100%;
  top: 0;
  font-size: 16px;
  padding: 16px 60px 16px;
  color: white;

  z-index: 999;
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 120px;
  height: 30px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 8;
    stroke: white;
  }
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

export const Circle = styled(motion.span)`
  display: flex;
  justify-self: center;
  flex-direction: column;
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.red};
`;

export const Search = styled.form`
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  svg {
    padding-right: 6px;
    height: 24px;
    cursor: pointer;
  }
`;

export const Input = styled(motion.input)`
  position: absolute;
  transform-origin: right center;
  right: 0px;
  padding: 8px 14px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

export const LoginBtn = styled.button`
  margin-left: 24px;
  padding: 6px 24px 8px;
  letter-spacing: 1px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  background-color: red;
  color: #fff;
  cursor: pointer;
  transition: all 0.8s;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
