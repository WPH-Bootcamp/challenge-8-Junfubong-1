import { useQuery } from '@tanstack/react-query';
import {  
fetchGenres,  
fetchMovieCredits,  
fetchMovieDetail,  
fetchMovieVideos,  
fetchNowPlaying,  
fetchPopular,  
fetchSimilarMovies,  
fetchTopRated,  
fetchTrending,  
fetchUpcoming,  
searchMovies,  
discoverMovies,
} from '../services/tmdb';



//import { movieService } from '@/services/movieService';

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// Example: Hook to fetch popular movies
export const usePopularMovies = () => {
  // TODO: Implement useQuery hook
  // Hint: Use movieService.getPopularMovies as queryFn
  return useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => {
      // TODO: Call your movie service function
      throw new Error('Not implemented');
    },
  });
};

// TODO: Add more hooks for different endpoints
// Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies
export const useTrending = (page = 1) =>  
useQuery({ queryKey: ['trending', page], queryFn: () => fetchTrending(page) });
export const useNowPlaying = (page = 1) =>  
useQuery({ queryKey: ['nowPlaying', page], queryFn: () => fetchNowPlaying(page) });
export const usePopular = (page = 1) =>  
useQuery({ queryKey: ['popular', page], queryFn: () => fetchPopular(page) });
export const useTopRated = (page = 1) =>  
useQuery({ queryKey: ['topRated', page], queryFn: () => fetchTopRated(page) });
export const useUpcoming = (page = 1) =>  
useQuery({ queryKey: ['upcoming', page], queryFn: () => fetchUpcoming(page) });
export const useMovieDetail = (id: number) =>  
useQuery({ queryKey: ['movie', id], queryFn: () => fetchMovieDetail(id), enabled: !!id });
export const useMovieCredits = (id: number) =>  
useQuery({ queryKey: ['credits', id], queryFn: () => fetchMovieCredits(id), enabled: !!id });
export const useMovieVideos = (id: number) =>  
useQuery({ queryKey: ['videos', id], queryFn: () => fetchMovieVideos(id), enabled: !!id });
export const useSimilarMovies = (id: number) =>  
useQuery({ queryKey: ['similar', id], queryFn: () => fetchSimilarMovies(id), enabled: !!id });
export const useSearchMovies = (query: string, page = 1) =>  
useQuery({    
queryKey: ['search', query, page],    
queryFn: () => searchMovies(query, page),    
enabled: query.length > 0,  
});
export const useDiscoverMovies = (page = 1, sortBy = 'popularity.desc', genre = '', year = '') =>  
useQuery({    
queryKey: ['discover', page, sortBy, genre, year],    
queryFn: () => discoverMovies(page, sortBy, genre || undefined, year || undefined),  
});
export const useGenres = () =>  
useQuery({ queryKey: ['genres'], queryFn: fetchGenres, staleTime: Infinity });