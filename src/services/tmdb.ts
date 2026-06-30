import tmdbClient from '../lib/axios';
import type { Credits, MovieDetail, MovieResponse, VideosResponse } from '../types/movie';

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string | null, size = 'w500'): string => {
  if (!path) return 'https://images.pexels.com/photos/7234256/pexels-photo-7234256.jpeg?auto=compress&cs=tinysrgb&w=500';
  return `${IMAGE_BASE}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null): string => {
  if (!path) return 'https://images.pexels.com/photos/7234256/pexels-photo-7234256.jpeg?auto=compress&cs=tinysrgb&w=1280';
  return `${IMAGE_BASE}/original${path}`;
};

export const fetchTrending = async (page = 1): Promise<MovieResponse> => {
  const { data } = await tmdbClient.get<MovieResponse>('/trending/movie/week', {
    params: { page },
  });
  return data;
};

export const fetchNowPlaying = async (page = 1): Promise<MovieResponse> => {
  const { data } = await tmdbClient.get<MovieResponse>('/movie/now_playing', {
    params: { page },
  });
  return data;
};

export const fetchPopular = async (page = 1): Promise<MovieResponse> => {
  const { data } = await tmdbClient.get<MovieResponse>('/movie/popular', {
    params: { page },
  });
  return data;
};

export const fetchTopRated = async (page = 1): Promise<MovieResponse> => {
  const { data } = await tmdbClient.get<MovieResponse>('/movie/top_rated', {
    params: { page },
  });
  return data;
};

export const fetchUpcoming = async (page = 1): Promise<MovieResponse> => {
  const { data } = await tmdbClient.get<MovieResponse>('/movie/upcoming', {
    params: { page },
  });
  return data;
};

export const fetchMovieDetail = async (id: number): Promise<MovieDetail> => {
  const { data } = await tmdbClient.get<MovieDetail>(`/movie/${id}`);
  return data;
};

export const fetchMovieCredits = async (id: number): Promise<Credits> => {
  const { data } = await tmdbClient.get<Credits>(`/movie/${id}/credits`);
  return data;
};

export const fetchMovieVideos = async (id: number): Promise<VideosResponse> => {
  const { data } = await tmdbClient.get<VideosResponse>(`/movie/${id}/videos`);
  return data;
};

export const fetchSimilarMovies = async (id: number): Promise<MovieResponse> => {
  const { data } = await tmdbClient.get<MovieResponse>(`/movie/${id}/similar`);
  return data;
};

export const searchMovies = async (query: string, page = 1): Promise<MovieResponse> => {
  const { data } = await tmdbClient.get<MovieResponse>('/search/movie', {
    params: { query, page },
  });
  return data;
};

export const discoverMovies = async (
  page = 1,
  sortBy = 'popularity.desc',
  genreId?: string,
  year?: string
): Promise<MovieResponse> => {
  const params: Record<string, string | number> = { page, sort_by: sortBy };
  if (genreId) params.with_genres = genreId;
  if (year) params.primary_release_year = year;
  const { data } = await tmdbClient.get<MovieResponse>('/discover/movie', { params });
  return data;
};

export const fetchGenres = async (): Promise<{ genres: { id: number; name: string }[] }> => {
  const { data } = await tmdbClient.get('/genre/movie/list');
  return data;
};
