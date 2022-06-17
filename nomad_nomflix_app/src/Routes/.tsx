//임시파일

import { useQuery } from 'react-query';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImgagePath } from '../utils';
import { useState } from 'react';
import { useMatch, useNavigate, PathMatch } from 'react-router-dom';

import { SliderContent } from '../Components/index';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faHeart,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';

// styled
import {
  Wrapper,
  Loader,
  Title,
  MoviInfo,
  Overview,
  MainMovie,
} from '../styled/MovieBanner';

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

// 영화 List hover시 animations
const boxVariants = {
  normal: {
    scale: 1,
    boxShadow: '0px 0px 5px rgba(0,0,0,0)',
  },
  hover: {
    scale: 1.3,
    boxShadow: '0px 0px 30px rgba(0,0,0,1), 0px 0px 15px rgba(0,0,0,1)',
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: 'tween',
    },
  },
};

// 영화 List hover시 하단 설명 animations
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: 'tween',
    },
  },
};

// 영화 List click modal창 on/off animations
const itemVariants = {
  hidden: { opacity: 0 },
  active: {
    opacity: 1,
    transition: {
      duration: 1,
      type: 'tween',
    },
  },
};

const offset = 6;

const Home = () => {
  const history = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch('movies/:movieId');
  const { scrollY } = useViewportScroll();

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies
  );

  // 영화 리스트 애니메이션
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [movement, setMovement] = useState(false); //좌우이동

  //오른쪽으로 이동
  const incraseRight = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      console.log(maxIndex);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setMovement(true);
    }
  };

  // 왼쪽으로 이동
  const incraseLeft = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      setMovement(false);
    }
  };

  const toggleLeaving = () => setLeaving((perv) => !perv);

  // 영화 리스트 상세정보
  const onBoxClicked = (movieId: number) => {
    history(`/movies/${movieId}`);
  };

  const onOverlayClick = () => history('/'); // home으로 이동
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + '' === bigMovieMatch.params.movieId
    );
  console.log(clickedMovie);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>로딩중 ...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImgagePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <MoviInfo>
              <span>개봉일</span>
              {data?.results[0].release_date}
              <span>평점</span>⭐ {data?.results[0].vote_average} 점
              <span>언어</span>
              {data?.results[0].original_language.toUpperCase()}
            </MoviInfo>
            <Overview>{data?.results[0].overview}</Overview>

            <MainMovie
              // layoutId={
              //   data?.results[0].id === undefined
              //     ? undefined
              //     : data?.results[0].id + ''
              // }
              onClick={() => {
                const Id = data?.results[0].id;
                if (Id === undefined) return;
                onBoxClicked(Id);
              }}
            >
              자세히 보기
            </MainMovie>
          </Banner>
          <Slider>
            <SliderTitle>극장 동시상영</SliderTitle>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={movement}
            >
              <Row
                custom={movement}
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ type: 'tween', duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ''}
                      key={movie.id}
                      whileHover='hover'
                      initial='normal'
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: 'tween' }}
                      bgPhoto={makeImgagePath(movie.poster_path, 'w500')}
                    >
                      <Info variants={infoVariants}>
                        <div>
                          <h4>{movie.title}</h4>
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
                          <span className='mini'>개봉일</span>
                          {movie.release_date}
                          <span className='mini'>평점</span>⭐{' '}
                          {movie.vote_average} 점
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
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  variants={itemVariants}
                  onClick={onOverlayClick}
                  initial='hidden'
                  animate='active'
                  transition={{ type: 'tween', duration: 1 }}
                />

                <BigMovie
                  layoutId={bigMovieMatch.params.movieId}
                  style={{ top: scrollY.get() + 200 }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImgagePath(
                            clickedMovie.backdrop_path,
                            'w500'
                          )})`,
                        }}
                      />
                      <BigMain>
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigText>
                          <span>개봉일</span>
                          {clickedMovie.release_date}
                          <span>평점</span>⭐ {clickedMovie.vote_average} 점
                          <span>언어</span>
                          {clickedMovie.original_language.toUpperCase()}
                        </BigText>
                        <BigImg
                          style={{
                            backgroundImage: `url(${makeImgagePath(
                              clickedMovie.poster_path,
                              'w200'
                            )})`,
                          }}
                        />
                      </BigMain>
                      <BigOverbiew>{clickedMovie.overview}</BigOverbiew>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
          <SliderContent />
        </>
      )}
    </Wrapper>
  );
};

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

// 슬라이드
const Slider = styled.div`
  position: relative;
  top: -120px;
  padding: 0 60px;
`;

const SliderTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  text-shadow: 0 0 15px #555, 0 0 7px #333, 0 0 5px #000;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  right: 60px;
  left: 60px;
`;

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

const LeftArrowBtn = styled.button`
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

const RightArrowBtn = styled.button`
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

const Info = styled(motion.div)`
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

const Overlay = styled(motion.div)`
  position: fixed;

  top: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
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

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
  opacity: 0.4;
`;

const BigMain = styled.div`
  position: relative;
  top: -300px;
  width: 100%;
  padding: 0 30px;
`;

const BigImg = styled.div`
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

const BigTitle = styled.h3`
  position: absolute;
  width: 400px;
  line-height: 1.4;
  top: 200px;
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 36px;
`;

const BigText = styled.p`
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

const BigOverbiew = styled.p`
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

export default Home;
