import { motion } from 'framer-motion';
import { BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMovieStore } from '../store/movieStore';
import MovieGrid from '../components/MovieGrid';
export default function WatchlistPage() {  
const { watchlist } = useMovieStore();
  return (    
<motion.div      
initial={{ opacity: 0 }}      
animate={{ opacity: 1 }}      
className="min-h-screen bg-[#0d0d0d] pt-24 pb-16"    
>      
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
<div className="flex items-center justify-between mb-8">          
<div>            
<h1 className="text-white text-3xl font-bold mb-1">My Watchlist</h1>            
<p className="text-gray-400 text-sm">{watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved</p>          
</div>          
{watchlist.length > 0 && (            
<div className="flex items-center gap-2 text-gray-400">              
<BookmarkCheck className="w-5 h-5 text-blue-400" />              
<span className="text-sm">{watchlist.length} saved</span>            
</div>          
)}        
</div>
        {watchlist.length === 0 ? (          
<div className="text-center py-24">            
<BookmarkCheck className="w-16 h-16 text-gray-700 mx-auto mb-5" />            
<h2 className="text-white text-xl font-semibold mb-2">Your watchlist is empty</h2>            
<p className="text-gray-500 text-sm mb-6">Save movies to watch later by clicking the bookmark icon</p>            
<Link              
to="/"              
className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-3 rounded-full transition-colors"            
>              
Explore Movies            
</Link>          
</div>        
) : (          
<MovieGrid movies={watchlist} />        
)}      
</div>    
</motion.div>  
);
}
