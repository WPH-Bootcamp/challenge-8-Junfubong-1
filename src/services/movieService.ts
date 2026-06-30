// import api from '@/lib/axios';
import { tmdbAxios } from '../lib/axios';
//import { MovieResponse, MovieDetail } from '../types';
import { MovieDetail, MovieResponse } from '@/types/movie';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started



export const movieService = {
  // TODO: Implement getPopularMovies function
  // Endpoint: GET /movie/popular
  getPopular: (page = 1) =>
    tmdbAxios.get<MovieResponse>('/movie/popular', { params: { page } }),

  // TODO: Implement getNowPlayingMovies function
  // Endpoint: GET /movie/now_playing
  getNowPlaying: (page = 1) =>
    tmdbAxios.get<MovieResponse>('/movie/now_playing', { params: { page } }),

  // TODO: Implement getMovieDetails function
  // Endpoint: GET /movie/{movie_id}

  getMovieDetails: (movieId: number) =>
    tmdbAxios.get<MovieDetail>(`/movie/${movieId}`, {
      params: { append_to_response: 'videos,credits' }
    }),

  // TODO: Implement searchMovies function
  // Endpoint: GET /search/movie
  searchMovies: (query: string, page = 1) =>
    tmdbAxios.get<MovieResponse>('/search/movie', {
      params: { query, page }
    }),

  // TODO: Add more endpoints as needed
getSimilarMovies: (movieId: number) =>
    tmdbAxios.get<MovieResponse>(`/movie/${movieId}/similar`),

};
