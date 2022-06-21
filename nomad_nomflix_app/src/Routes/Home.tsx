import styled from 'styled-components';

import { useQuery } from 'react-query';
import { getMovies, getUpcoming, getTopRated, IGetMoviesResult } from '../api';
import { makeImgagePath } from '../utils';

import { PathMatch, useMatch, useNavigate } from 'react-router-dom';

import { MovieSlider, MovieModal } from '../Components/index';

// styled
import {
  Wrapper,
  Loader,
  Title,
  MoviInfo,
  Overview,
  MainMovie,
} from '../styled/MainBanner';

import { Slider, SliderTitle } from '../styled/MainConent';

const Home = () => {
  const history = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch('movies/:movieId');

  // 개봉한 영화
  const { isLoading: movieLoding, data: movieData } =
    useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);

  // 최고의 영화
  const { isLoading: topRatedLoding, data: topRatedData } =
    useQuery<IGetMoviesResult>(['movies', 'topRated'], getTopRated);

  // 곧 개봉 예정 영화
  const { isLoading: upcomingLoding, data: upcomingData } =
    useQuery<IGetMoviesResult>(['movies', 'upcoming'], getUpcoming);

  // 영화 리스트 상세정보
  const onBoxClicked = (movieId: number) => {
    history(`/movies/${movieId}`);
  };

  const loading = movieLoding || topRatedLoding || upcomingLoding;
  return (
    <Wrapper>
      {loading ? (
        <Loader>로딩중 ...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImgagePath(movieData?.results[0].backdrop_path || '')}
          >
            <Title>{movieData?.results[0].title}</Title>
            <MoviInfo>
              <span>개봉일</span>
              {movieData?.results[0].release_date}
              <span>평점</span>⭐ {movieData?.results[0].vote_average} 점
              <span>언어</span>
              {movieData?.results[0].original_language.toUpperCase()}
            </MoviInfo>
            <Overview>{movieData?.results[0].overview}</Overview>

            <MainMovie
              onClick={() => {
                const id = movieData?.results[0].id;
                if (id === undefined) return;
                onBoxClicked(id);
              }}
            >
              자세히 보기
            </MainMovie>
          </Banner>
          <Slider>
            <SliderTitle>극장 동시상영</SliderTitle>
            <MovieSlider movies={movieData?.results!} />
          </Slider>
          <Slider>
            <SliderTitle>개봉 예정</SliderTitle>
            <MovieSlider movies={upcomingData?.results!} />
          </Slider>
          <Slider>
            <SliderTitle>최고의 평점</SliderTitle>
            <MovieSlider movies={topRatedData?.results!} />
          </Slider>
          <MovieModal modal={bigMovieMatch?.params.movieId!} />
        </>
      )}
    </Wrapper>
  );
};

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export default Home;
