import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import type { Movie } from '../types/movie';
import { getImageUrl } from '../services/tmdb';
import { useMovieStore } from '../store/movieStore';
import { formatRating, formatYear } from '../utils/helpers';

interface MovieCardProps {
  movie: Movie;
  compact?: boolean;
}

export default function MovieCard({ movie, compact = false }: MovieCardProps) {
  const [imgError, setImgError] = useState(false);
  const { isFavorite, addFavorite, removeFavorite, isInWatchlist, addToWatchlist, removeFromWatchlist } =
    useMovieStore();

  const favorite = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    favorite ? removeFavorite(movie.id) : addFavorite(movie);
  };

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <div className={`relative overflow-hidden rounded-xl bg-gray-800 ${compact ? 'aspect-[2/3]' : 'aspect-[2/3]'}`}>
          <img
            src={imgError ? 'https://images.pexels.com/photos/7234256/pexels-photo-7234256.jpeg?auto=compress&cs=tinysrgb&w=500' : getImageUrl(movie.poster_path)}
            alt={movie.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={toggleFavorite}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
                favorite ? 'bg-red-600 text-white' : 'bg-black/60 text-white hover:bg-red-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={toggleWatchlist}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
                inWatchlist ? 'bg-blue-600 text-white' : 'bg-black/60 text-white hover:bg-blue-600'
              }`}
            >
              {inWatchlist ? <BookmarkCheck className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 left-2">
            <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold">{formatRating(movie.vote_average)}</span>
            </div>
          </div>

          {/* Bottom info on hover */}
          {!compact && (
            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xs line-clamp-2 leading-relaxed">{movie.overview}</p>
            </div>
          )}
        </div>

        <div className="mt-2 px-0.5">
          <h3 className="text-white text-sm font-medium line-clamp-1">{movie.title}</h3>
          <p className="text-gray-400 text-xs mt-0.5">{formatYear(movie.release_date)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
