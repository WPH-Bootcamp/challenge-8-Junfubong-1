import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Star, Heart, BookmarkPlus, BookmarkCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie } from '../types/movie';
import { getBackdropUrl } from '../services/tmdb';
import { useMovieStore } from '../store/movieStore';
import { formatRating, formatYear } from '../utils/helpers';

interface HeroSectionProps {
  movies: Movie[];
}

export default function HeroSection({ movies }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const featured = movies.slice(0, 5);
  const movie = featured[current];
  const { isFavorite, addFavorite, removeFavorite, isInWatchlist, addToWatchlist, removeFromWatchlist } =
    useMovieStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (!movie) return null;

  const favorite = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div className="relative w-full h-[85vh] min-h-140 overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={getBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  Featured
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">{formatRating(movie.vote_average)}</span>
                </div>
                <span className="text-gray-400 text-sm">{formatYear(movie.release_date)}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {movie.title}
              </h1>

              <p className="text-gray-300 text-base leading-relaxed mb-8 line-clamp-3">
                {movie.overview}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={`/movie/${movie.id}`}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch Trailer
                </Link>
                <Link
                  to={`/movie/${movie.id}`}
                  className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-full border border-white/20 transition-all duration-200"
                >
                  <Info className="w-4 h-4" />
                  See Detail
                </Link>
                <button
                  onClick={() => favorite ? removeFavorite(movie.id) : addFavorite(movie)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    favorite
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'bg-white/10 border-white/20 text-white hover:bg-red-600/30 hover:border-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    inWatchlist
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white/10 border-white/20 text-white hover:bg-blue-600/30 hover:border-blue-500'
                  }`}
                >
                  {inWatchlist ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + featured.length) % featured.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % featured.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-6 h-2 bg-red-500' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
