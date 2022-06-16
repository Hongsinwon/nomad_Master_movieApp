import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import styled from 'styled-components';

const boxBtnVats = {
  start: { scale: 1 },
  animation: { scale: 1.3, color: 'red' },
};

const boxhover = {
  hover: {
    scale: 1.2,
  },
};

const useTask = () => {
  // 하단 버튼 animations
  const [click, setClick] = useState<boolean>(false);

  // circle 이동 animations
  const [circle, setCircle] = useState<boolean>(false);

  const onClick = () => {
    setClick((prev) => !prev);
    setCircle((prev) => !prev);
  };

  //  modal animations
  const [modal, setModal] = useState<boolean>(false);
  const [layoutId, setLayoutId] = useState<null | string>(null);

  return (
    <Wrapper>
      <AnimatePresence>
        <BoxWrapper>
          <Box
            layout
            variants={boxhover}
            whileHover='hover'
            layoutId='1'
            onClick={() => setLayoutId('1')}
          />
          <Box>{circle ? null : <Circle layoutId='circle' />}</Box>
          <Box>{circle ? <Circle layoutId='circle' /> : null}</Box>
          <Box
            layout
            variants={boxhover}
            whileHover='hover'
            layoutId='2'
            onClick={() => setLayoutId('2')}
          />
        </BoxWrapper>
        <BoxBtn
          variants={boxBtnVats}
          animate={click ? 'animation' : 'start'}
          //   whileTap={{ scale: 1.3, color: 'red' }}
          onClick={onClick}
        >
          버튼으로 이동
        </BoxBtn>
      </AnimatePresence>
      <AnimatePresence>
        {layoutId ? (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            onClick={() => setLayoutId(null)}
          >
            <Box layoutId={layoutId + ''}></Box>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e09, #d0e);
`;

const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Box = styled(motion.div)`
  position: relative;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  &:first-child {
    transform-origin: bottom right;
    cursor: pointer;
  }
  &:last-child {
    transform-origin: top left;
    cursor: pointer;
  }
`;

const BoxBtn = styled(motion.button)`
  margin-top: 40px;
  padding: 10px 15px;
  font-weight: bold;
  color: blue;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const Circle = styled(motion.span)`
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #000;
  z-index: 1;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export default useTask;
