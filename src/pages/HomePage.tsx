import { motion } from 'framer-motion';
import { useTrending, useNowPlaying, usePopular, useTopRated, useUpcoming } from '../hooks/useMovies';
import HeroSection from '../components/HeroSection';
import MovieRow from '../components/MovieRow';
import MovieGrid from '../components/MovieGrid';
import { SkeletonHero, SkeletonRow } from '../components/SkeletonCard';

export default function HomePage() {
  const { data: trending, isLoading: loadingTrending } = useTrending();
  const { data: nowPlaying, isLoading: loadingNow } = useNowPlaying();
  const { data: popular } = usePopular();
  const { data: topRated } = useTopRated();
  const { data: upcoming } = useUpcoming();

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Hero */}
      {loadingTrending ? (
        <SkeletonHero />
      ) : trending?.results && trending.results.length > 0 ? (
        <HeroSection movies={trending.results} />
      ) : null}

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12">

        {/* Trending Now */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {loadingTrending ? (
            <>
              <div className="h-8 bg-gray-800 rounded w-48 mb-4 animate-pulse" />
              <SkeletonRow />
            </>
          ) : trending?.results ? (
            <MovieRow
              title="Trending Now"
              movies={trending.results}
              viewAllLink="/trending"
            />
          ) : null}
        </motion.section>

        {/* New Release / Now Playing */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {loadingNow ? (
            <>
              <div className="h-8 bg-gray-800 rounded w-40 mb-4 animate-pulse" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[2/3] bg-gray-800 rounded-xl" />
                    <div className="mt-2 h-3.5 bg-gray-800 rounded w-4/5" />
                  </div>
                ))}
              </div>
            </>
          ) : nowPlaying?.results ? (
            <MovieGrid title="New Release" movies={nowPlaying.results.slice(0, 12)} />
          ) : null}
        </motion.section>

        {/* Popular */}
        {popular?.results && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MovieRow title="Popular Movies" movies={popular.results} viewAllLink="/popular" />
          </motion.section>
        )}

        {/* Top Rated */}
        {topRated?.results && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MovieRow title="Top Rated" movies={topRated.results} viewAllLink="/top-rated" />
          </motion.section>
        )}

        {/* Upcoming */}
        {upcoming?.results && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MovieRow title="Coming Soon" movies={upcoming.results} viewAllLink="/upcoming" />
          </motion.section>
        )}
      </div>
    </div>
  );
}
