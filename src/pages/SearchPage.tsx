import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchMovies, useDiscoverMovies, useGenres } from '../hooks/useMovies';
import MovieGrid from '../components/MovieGrid';
import { SkeletonGrid } from '../components/SkeletonCard';

const searchSchema = z.object({
  query: z.string().min(1, 'Please enter a search term'),
});
type SearchForm = z.infer<typeof searchSchema>;

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'release_date.desc', label: 'Newest First' },
  { value: 'revenue.desc', label: 'Highest Grossing' },
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data: genres } = useGenres();
  const { data: searchResults, isLoading: loadingSearch } = useSearchMovies(activeQuery);
  const { data: discovered, isLoading: loadingDiscover } = useDiscoverMovies(1, sortBy, genre, year);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: initialQuery },
  });

  useEffect(() => {
    setValue('query', initialQuery);
    setActiveQuery(initialQuery);
  }, [initialQuery, setValue]);

  const onSearch = ({ query }: SearchForm) => {
    const trimmed = query.trim();
    setActiveQuery(trimmed);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const clearSearch = () => {
    setValue('query', '');
    setActiveQuery('');
    navigate('/search');
  };

  const isSearching = activeQuery.length > 0;
  const results = isSearching ? searchResults?.results ?? [] : discovered?.results ?? [];
  const isLoading = isSearching ? loadingSearch : loadingDiscover;
  const total = isSearching
    ? searchResults?.total_results
    : discovered?.total_results;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0d0d0d] pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-6">
            {isSearching ? `Results for "${activeQuery}"` : 'Discover Movies'}
          </h1>

          <form onSubmit={handleSubmit(onSearch)} className="flex gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('query')}
                placeholder="Search for movies..."
                className="w-full bg-gray-800/80 border border-white/10 text-white placeholder-gray-500 rounded-full pl-11 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
              />
              {activeQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-medium text-sm transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-3 rounded-full border font-medium text-sm transition-colors ${
                filtersOpen ? 'bg-white/20 border-white/30 text-white' : 'bg-white/10 border-white/10 text-gray-300 hover:bg-white/15'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </form>
          {errors.query && (
            <p className="text-red-400 text-xs mt-2 ml-4">{errors.query.message}</p>
          )}

          {/* Filters Panel */}
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-gray-800/60 border border-white/10 rounded-2xl p-5 flex flex-wrap gap-4"
            >
              <div className="flex flex-col gap-1.5 min-w-48">
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 min-w-44">
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Genre</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="bg-gray-700 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="">All Genres</option>
                  {genres?.genres.map((g) => (
                    <option key={g.id} value={g.id.toString()}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 min-w-36">
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Year</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. 2024"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="bg-gray-700 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-gray-500"
                />
              </div>

              {(genre || year) && (
                <button
                  onClick={() => { setGenre(''); setYear(''); }}
                  className="self-end text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Results count */}
        {!isLoading && total !== undefined && (
          <p className="text-gray-400 text-sm mb-6">
            {total.toLocaleString()} movies found
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <SkeletonGrid count={12} />
        ) : results.length > 0 ? (
          <MovieGrid movies={results} />
        ) : (
          <div className="text-center py-24">
            <Search className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No movies found</p>
            {isSearching && (
              <p className="text-gray-600 text-sm mt-2">Try a different search term</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
