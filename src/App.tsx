import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchPage from './pages/SearchPage';
import WatchlistPage from './pages/WatchlistPage';
import FavoritesPage from './pages/FavoritesPage';
import TrendingPage from './pages/TrendingPage';
export default function App() {  
const location = useLocation();
  return (    
<div className="min-h-screen bg-[#0d0d0d] flex flex-col">      
<Navbar />      
<main className="flex-1">        
<AnimatePresence mode="wait">          
<Routes location={location} key={location.pathname}>            
<Route path="/" element={<HomePage />} />            
<Route path="/movie/:id" element={<MovieDetailPage />} />            
<Route path="/search" element={<SearchPage />} />            
<Route path="/trending" element={<TrendingPage />} />            
<Route path="/watchlist" element={<WatchlistPage />} />            
<Route path="/favorites" element={<FavoritesPage />} />          
</Routes>        
</AnimatePresence>      
</main>      
<Footer />    
</div>  
);
}