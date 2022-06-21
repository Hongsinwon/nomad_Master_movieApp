import { motion } from 'framer-motion';
import styled from 'styled-components';

// 슬라이드
export const SliderWrapper = styled.div`
  margin-top: 120px;
`;

export const Slider = styled.div`
  display: block;
  position: relative;
  /* top: -120px; */
  padding: 0 60px;
`;

export const SliderTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  text-shadow: 0 0 15px #555, 0 0 7px #333, 0 0 5px #000;
`;

export const Overlay = styled(motion.div)`
  position: fixed;

  top: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 65vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-bottom: 40px;
  overflow-y: scroll;
  background-color: #000;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
  opacity: 0.4;
`;

export const BigMain = styled.div`
  position: relative;
  top: -300px;
  width: 100%;
  padding: 0 30px;
`;

export const BigImg = styled.div`
  position: absolute;
  top: -20px;
  right: 60px;
  width: 250px;
  height: 350px;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 0 20px #444, 0 0 10px #222, 0 0 4px #000;
  border-radius: 6px;
`;

export const BigTitle = styled.h3`
  position: absolute;
  width: 400px;
  line-height: 1.4;
  top: 200px;
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 36px;
`;

export const BigText = styled.p`
  position: absolute;
  width: 440px;
  top: 310px;
  padding: 20px 10px;
  span {
    margin-left: 16px;
    margin-right: 10px;
    font-size: 12px;
    padding: 2px 6px 1px;
    border-radius: 4px;
    background-color: #333;
  }
  span:first-child {
    margin-left: 0;
  }
`;

export const BigOverbiew = styled.p`
  position: relative;
  top: 60px;
  line-height: 1.6;
  padding: 20px 40px 40px;
  color: ${(props) => props.theme.white.lighter};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
