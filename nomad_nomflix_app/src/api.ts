const API_KEY = 'd3778288044eae23cc3907f31a4fdd6f';
const BASE_PATH = 'https://api.themoviedb.org/3';

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string; // 개봉일
  vote_average: string; // 평점
  original_language: string; //언어
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: [IMovie];
  total_pages: number;
  total_results: number;
}

export async function getMovies() {
  return (
    await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`)
  ).json();
}
