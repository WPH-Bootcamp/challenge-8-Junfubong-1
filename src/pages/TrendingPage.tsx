import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTrending } from '../hooks/useMovies';
import MovieGrid from '../components/MovieGrid';
import { SkeletonGrid } from '../components/SkeletonCard';
export default function TrendingPage() {  
const { data, isLoading, error } = useTrending();
  return (    
<motion.div      
initial={{ opacity: 0 }}      
animate={{ opacity: 1 }}      
className="min-h-screen bg-[#0d0d0d] pt-24 pb-16"    
>      
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
<div className="flex items-center gap-3 mb-8">          
<div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">            
<TrendingUp className="w-5 h-5 text-red-400" />          
</div>          
<div>            
<h1 className="text-white text-3xl font-bold">Trending This Week</h1>            
<p className="text-gray-400 text-sm">Most popular movies right now</p>          
</div>        
</div>
        {error && (          
<div className="text-center py-16">            
<p className="text-gray-400">Failed to load trending movies. Please try again.</p>          
</div>        
)}
        {isLoading ? (          
<SkeletonGrid count={20} />        
) : data?.results ? (          
<MovieGrid movies={data.results} />        
) : null}      
</div>    
</motion.div>  
);
}