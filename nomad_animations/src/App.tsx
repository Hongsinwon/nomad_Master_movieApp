import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from 'framer-motion';

// 기본 animation props
const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transiton: { type: 'spring', delay: 0.5 } },
};

// variants
const boxVariants = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.5,
      bounce: 0.5,
      // 자식들에게 따로 delay와 시간을 줄수있다. 👉 delayChildren, staggerChildren
      // staggerChildren : 1번째자식 0.2 2번째자식 0.4 3번째자식 0.6 4번째자식 0.8
      //https://www.framer.com/docs/transition/#orchestration
      delayChildren: 0.5,
      staggerChildren: 0.2,
      delay: 0.5,
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

const gestures = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: '50%' },
  drag: { backgroundColor: 'rgb(46, 204, 113)', transition: { duration: 10 } },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0); //MotionValues는 애니메이션 값의 상태(state)와 속도(velocity)를 추적합니다
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);

  const gradient = useTransform(
    x,
    [-800, 800],
    [
      'linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))',
      'linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))',
    ]
  );

  //https://www.framer.com/docs/motionvalue/##useviewportscroll
  const { scrollY, scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  // useEffect(() => {
  //   scrollY.onChange(() => console.log(scrollY.get(), scrollYProgress.get()));
  // }, [scrollY, scrollYProgress]);

  // useEffect(() => {
  //   x.onChange(() => console.log(x.get()));
  //   rotateZ.onChange(() => console.log(rotateZ.get()));
  // }, [x]);

  return (
    <Wrapper style={{ background: gradient }}>
      {/* 기본 animation */}
      <Box
        transition={{ type: 'spring', stiffness: 10, damping: 5 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
      >
        박스 1
      </Box>
      {/* 기본 animation props*/}
      <Box variants={myVars} initial='start' animate='end'>
        박스 2
      </Box>

      {/* variants */}
      <Box1 variants={boxVariants} initial='start' animate='end'>
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box1>

      {/* gestures */}
      <Box2
        whileHover={{ scale: 1.5, rotateZ: 90 }}
        whileTap={{ scale: 1, borderRadius: '50%' }}
      >
        gestures 1
      </Box2>
      <Box2 variants={gestures} whileHover='hover' whileTap='click'>
        gestures 2
      </Box2>

      {/* drag */}
      <Box2
        drag //움직이게 만들 수 있음
        variants={gestures}
        whileHover='hover'
        whileDrag='drag'
        whileTap='click'
      >
        drag 1
      </Box2>

      <Box2
        drag
        // dragConstraints -> 허용된 드래그 가능 영역에 제약 조건을 적용합니다.
        dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
        variants={gestures}
        whileHover='hover'
        whileDrag='drag'
        whileTap='click'
      >
        drag 2
      </Box2>
      {/* 계산하지 않고 ureRef 로 이동제약 */}
      <BiggerBox ref={biggerBoxRef}>
        <Box3
          drag
          dragSnapToOrigin //원래 기본위치로 돌아옴
          dragElastic={0.5}
          dragConstraints={biggerBoxRef}
          variants={gestures}
          whileHover='hover'
          whileDrag='drag'
          whileTap='click'
        />
      </BiggerBox>

      {/* motionValues  */}
      <div>
        <button onClick={() => x.set(200)}>클릭</button>
        <Box3 style={{ x, rotateZ, scale }} drag='x' dragSnapToOrigin />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: ; */
`;

// 기본 animation
const Box = styled(motion.div)`
  margin: 20px;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

//variants
const Box1 = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #fff;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

//gestures
const BiggerBox = styled.div`
  margin: 20px;
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box2 = styled(motion.div)`
  margin: 20px;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-weight: bold;
  background-color: rgba(255, 255, 255);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Box3 = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

export default App;
