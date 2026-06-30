import { motion } from 'framer-motion';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

export default function MovieGrid({ movies, title }: MovieGridProps) {
  return (
    <section>
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-white text-xl sm:text-2xl font-bold mb-4"
        >
          {title}
        </motion.h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie, i) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
