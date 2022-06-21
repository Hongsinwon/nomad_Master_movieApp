const API_KEY = 'd3778288044eae23cc3907f31a4fdd6f';
const BASE_PATH = 'https://api.themoviedb.org/3';

//영화 목록
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

//영화 세부정보
export interface IGetMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  children: React.ReactNode | React.ReactNode[];
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// Tv Show 목록
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

export interface IGetShowResult {
  page: number;
  results: [IShow];
  total_pages: number;
  total_results: number;
}

// tv 디테일
interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: null;
}

interface TEpisodeToAir {
  air_date: Date;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface Network {
  name: string;
  id: number;
  logo_path: null | string;
  origin_country: string;
}

interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: null | string;
  season_number: number;
}

interface Videos {
  id: number;
  results: [];
}

export interface IGetTvDetail {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TEpisodeToAir;
  name: string;
  next_episode_to_air: TEpisodeToAir;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: Videos;
}

// 검색
export interface IGetSearch {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchResult {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}

//개봉영화
export async function getMovies() {
  return (
    await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`)
  ).json();
}

// 곧 개봉 예정 영화
export async function getUpcoming() {
  return (
    await fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko`)
  ).json();
}

//최고의 영화
export async function getTopRated() {
  return (
    await fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko`)
  ).json();
}

//영화 세부정보 - https://developers.themoviedb.org/3/movies/get-movie-details
export async function getMovieDetail(movieId: string | undefined) {
  return (
    await fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`)
  ).json();
}

// 최신 tv show
export async function getTvlatest() {
  return (
    await fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko`)
  ).json();
}

// 인기 tv show
export async function getTvpopular() {
  return (
    await fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko`)
  ).json();
}

//최고 평점 tv show
export async function getTvTopRated() {
  return (
    await fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko`)
  ).json();
}

//영화 세부정보
export async function getTvDetail(tvId: string | undefined) {
  return (
    await fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=ko`)
  ).json();
}

//검색
export async function getSearch(keyword: string) {
  return (
    await fetch(
      `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko&query=${keyword}&include_adult=true&region=kr`
    )
  ).json();
}

//검색 세부정보
export async function getSearchDetail(
  type: string | undefined,
  id: string | undefined
) {
  return (
    await fetch(`${BASE_PATH}/${type}/${id}?api_key=${API_KEY}&language=ko`)
  ).json();
}
