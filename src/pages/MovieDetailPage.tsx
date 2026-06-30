import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Clock, Calendar, Heart, BookmarkPlus, BookmarkCheck,
  Play, X, ChevronLeft, Globe, BarChart2,
} from 'lucide-react';
import { useMovieDetail, useMovieCredits, useMovieVideos, useSimilarMovies } from '../hooks/useMovies';
import { getImageUrl, getBackdropUrl } from '../services/tmdb';
import { useMovieStore } from '../store/movieStore';
import { formatRating, formatYear, formatRuntime, getRatingColor } from '../utils/helpers';
import MovieRow from '../components/MovieRow';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);

  const { data: movie, isLoading, error } = useMovieDetail(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videosData } = useMovieVideos(movieId);
  const { data: similar } = useSimilarMovies(movieId);

  const { isFavorite, addFavorite, removeFavorite, isInWatchlist, addToWatchlist, removeFromWatchlist } =
    useMovieStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] pt-16">
        <div className="h-96 bg-gray-800 animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="h-10 bg-gray-800 rounded w-2/3 animate-pulse" />
          <div className="h-5 bg-gray-800 rounded w-1/3 animate-pulse" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => <div key={i} className="h-4 bg-gray-800 rounded animate-pulse" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Movie not found</p>
          <Link to="/" className="text-red-400 hover:text-red-300">Back to Home</Link>
        </div>
      </div>
    );
  }

  const trailers = videosData?.results.filter(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  ) ?? [];

  const director = credits?.crew.find((c) => c.job === 'Director');
  const cast = credits?.cast.slice(0, 12) ?? [];

  const favorite = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);

  const openTrailer = (key: string) => {
    setActiveTrailer(key);
    setTrailerOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0d0d0d]"
    >
      {/* Backdrop */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/20 to-transparent" />

        {/* Back button */}
        <div className="absolute top-20 left-4 sm:left-8">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0 w-48 sm:w-56 lg:w-64"
          >
            <img
              src={getImageUrl(movie.poster_path, 'w342')}
              alt={movie.title}
              className="w-full rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 pt-2"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {movie.genres.map((g) => (
                <span key={g.id} className="text-xs bg-white/10 text-gray-300 px-2.5 py-1 rounded-full border border-white/10">
                  {g.name}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-gray-400 italic text-base mb-4">{movie.tagline}</p>
            )}

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-4 mb-5 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className={`w-4 h-4 fill-current ${getRatingColor(movie.vote_average)}`} />
                <span className={`font-bold text-base ${getRatingColor(movie.vote_average)}`}>
                  {formatRating(movie.vote_average)}
                </span>
                <span className="text-gray-500">/ 10</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{formatYear(movie.release_date)}</span>
              </div>
              {movie.runtime && (
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-gray-400">
                <BarChart2 className="w-4 h-4" />
                <span className="uppercase">{movie.status}</span>
              </div>
            </div>

            <p className="text-gray-300 text-base leading-relaxed mb-6">{movie.overview}</p>

            {director && (
              <p className="text-gray-400 text-sm mb-6">
                <span className="text-gray-500">Director: </span>
                <span className="text-white font-medium">{director.name}</span>
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {trailers.length > 0 && (
                <button
                  onClick={() => openTrailer(trailers[0].key)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch Trailer
                </button>
              )}
              <button
                onClick={() => favorite ? removeFavorite(movie.id) : addFavorite(movie as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border font-medium text-sm transition-all duration-200 ${
                  favorite
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'bg-white/10 border-white/20 text-white hover:bg-red-600/30'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
                {favorite ? 'Favorited' : 'Favorite'}
              </button>
              <button
                onClick={() => inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border font-medium text-sm transition-all duration-200 ${
                  inWatchlist
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white/10 border-white/20 text-white hover:bg-blue-600/30'
                }`}
              >
                {inWatchlist ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
                {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 font-medium text-sm transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14"
          >
            <h2 className="text-white text-xl font-bold mb-5">Cast & Crew</h2>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {cast.map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{ y: -4 }}
                  className="flex-shrink-0 w-24 text-center"
                >
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gray-800 ring-2 ring-white/10">
                    <img
                      src={member.profile_path
                        ? getImageUrl(member.profile_path, 'w185')
                        : 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=185'
                      }
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=185';
                      }}
                    />
                  </div>
                  <p className="text-white text-xs font-medium mt-2 line-clamp-1">{member.name}</p>
                  <p className="text-gray-500 text-xs line-clamp-1">{member.character}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Trailers */}
        {trailers.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14"
          >
            <h2 className="text-white text-xl font-bold mb-5">Trailers & Videos</h2>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {trailers.slice(0, 6).map((video) => (
                <motion.button
                  key={video.id}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => openTrailer(video.key)}
                  className="flex-shrink-0 relative w-60 sm:w-72 aspect-video rounded-xl overflow-hidden group"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    alt={video.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-xs font-medium line-clamp-1">{video.name}</p>
                    <p className="text-gray-400 text-xs">{video.type}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {/* Similar Movies */}
        {similar?.results && similar.results.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14"
          >
            <MovieRow title="Similar Movies" movies={similar.results} />
          </motion.section>
        )}
      </div>

      {/* Trailer Modal */}
      {trailerOpen && activeTrailer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setTrailerOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeTrailer}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              onClick={() => setTrailerOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 bg-black/70 hover:bg-black rounded-full flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
