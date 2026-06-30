import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FavoriteMovie } from './types/';
import { WatchlistMovie } from './types/';




// TODO: Define your store state interface
interface MovieStore {
  // TODO: Add state properties
  // Examples: favorites, watchlist, selectedMovie, etc.
  
  // TODO: Add action methods
  // Examples: addToFavorites, removeFromFavorites, etc.
  favorites: FavoriteMovie[];  
  watchlist: WatchlistMovie[];  
  addFavorite: (movie: FavoriteMovie) => void;  
  removeFavorite: (id: number) => void;  
  isFavorite: (id: number) => boolean;  
  addToWatchlist: (movie: WatchlistMovie) => void;  
  removeFromWatchlist: (id: number) => void;  
  isInWatchlist: (id: number) => boolean;

}

// TODO: Create Zustand store
// Reference: https://zustand.docs.pmnd.rs/getting-started/introduction

// export const useMovieStore = create<MovieStore>((set) => ({
  // TODO: Initialize state and implement actions

export const useMovieStore = create<MovieStore>()(  
persist(    
(set, get) => ({      
favorites: [],      
watchlist: [],
      addFavorite: (movie) =>        
set((state) => ({          
favorites: state.favorites.some((f) => f.id === movie.id)            
? state.favorites            
: [...state.favorites, movie],        
})),
      removeFavorite: (id) =>        
set((state) => ({          
favorites: state.favorites.filter((f) => f.id !== id),        
})),
      isFavorite: (id) => get().favorites.some((f) => f.id === id),
      addToWatchlist: (movie) =>        
set((state) => ({          
watchlist: state.watchlist.some((m) => m.id === movie.id)            
? state.watchlist            
: [...state.watchlist, movie],        
})),
      removeFromWatchlist: (id) =>        
set((state) => ({          
watchlist: state.watchlist.filter((m) => m.id !== id),        
})),
      isInWatchlist: (id) => get().watchlist.some((m) => m.id === id),    
}),    
{      
name: 'movie-store',    
}  
)
);
