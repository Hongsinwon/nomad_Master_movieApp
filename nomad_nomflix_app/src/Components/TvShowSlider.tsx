import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { makeImgagePath } from "../utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

//styled
import {
  Wrapper,
  Row,
  Info,
  LeftArrowBtn,
  RightArrowBtn,
} from "../styled/SliderContent";

interface IShow {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface SlideContentProps {
  tvshow: IShow[];
}

// 영화 List 슬라이드 animations
const rowVariants = {
  hidden: (movement: boolean) => ({
    x: movement ? window.outerWidth - 10 : -window.outerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (movement: boolean) => ({
    x: movement ? -window.outerWidth + 10 : window.outerWidth - 10,
  }),
};

// Tv List hover시 animations
const boxVariants = {
  normal: {
    scale: 1,
    boxShadow: "0px 0px 5px rgba(0,0,0,0)",
  },
  hover: {
    scale: 1.3,
    boxShadow: "0px 0px 30px rgba(0,0,0,1), 0px 0px 15px rgba(0,0,0,1)",
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

// Tv List hover시 하단 설명 animations
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

const TvShowSlider = ({ tvshow }: SlideContentProps) => {
  const history = useNavigate();

  // 영화 리스트 애니메이션
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [movement, setMovement] = useState(false); //좌우이동
  //오른쪽으로 이동
  const incraseRight = () => {
    if (tvshow) {
      if (leaving) return;
      toggleLeaving();
      const totalTvShow = tvshow.length - 1;
      const maxIndex = Math.floor(totalTvShow / offset) - 1;
      console.log(maxIndex);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setMovement(true);
    }
  };

  // 왼쪽으로 이동
  const incraseLeft = () => {
    if (tvshow) {
      if (leaving) return;
      toggleLeaving();
      const totalTvShow = tvshow.length - 1;
      const maxIndex = Math.floor(totalTvShow / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      setMovement(false);
    }
  };

  const toggleLeaving = () => setLeaving((perv) => !perv);

  // 영화 리스트 상세정보
  const onBoxClicked = (tvId: number) => {
    history(`/tv/${tvId}`);
  };

  return (
    <Wrapper>
      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
        custom={movement}
      >
        <Row
          custom={movement}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {tvshow &&
            tvshow
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((tv) => (
                <Box
                  layoutId={tv.id + ""}
                  key={tv.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  onClick={() => onBoxClicked(tv.id)}
                  transition={{ type: "tween" }}
                  bgPhoto={makeImgagePath(tv.poster_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <div>
                      <h4>{tv.name}</h4>
                      <p>
                        <span>
                          <FontAwesomeIcon icon={faHeart} />
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faShareNodes} />
                        </span>
                      </p>
                    </div>

                    <p>
                      <span>첫방영</span>
                      {tv.first_air_date}
                      <span className="mini">평점</span>⭐ {tv.vote_average} 점
                    </p>
                  </Info>
                </Box>
              ))}
        </Row>
      </AnimatePresence>
      <LeftArrowBtn onClick={incraseLeft}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </LeftArrowBtn>
      <RightArrowBtn onClick={incraseRight}>
        <FontAwesomeIcon icon={faAngleRight} />
      </RightArrowBtn>
    </Wrapper>
  );
};

const Box = styled(motion.div)<{ bgPhoto: string }>`
  margin-bottom: 60px;
  height: 450px;
  background-color: #fff;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 6px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export default TvShowSlider;
