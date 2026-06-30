import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
}

export default function MovieRow({ title, movies, viewAllLink }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-white text-xl sm:text-2xl font-bold"
        >
          {title}
        </motion.h2>
        <div className="flex items-center gap-2">
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-gray-400 hover:text-red-400 text-sm font-medium transition-colors mr-2"
            >
              See All
            </Link>
          )}
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie, i) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.06, 0.4) }}
            className="shrink-0 w-36 sm:w-44"
          >
            <MovieCard movie={movie} compact />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
