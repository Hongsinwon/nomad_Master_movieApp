import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from 'framer-motion';

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

// ---------------------------------

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

  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);

  const gradient = useTransform(
    x,
    [-800, 800],
    [
      'linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))',
      'linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))',
    ]
  );
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
        drag
        variants={gestures}
        whileHover='hover'
        whileDrag='drag'
        whileTap='click'
      >
        drag 1
      </Box2>

      <Box2
        drag
        dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
        variants={gestures}
        whileHover='hover'
        whileDrag='drag'
        whileTap='click'
      >
        drag 2
      </Box2>

      <BiggerBox ref={biggerBoxRef}>
        <Box3
          drag
          dragSnapToOrigin
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

export default App;
