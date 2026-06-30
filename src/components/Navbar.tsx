/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Film, Menu, X } from 'lucide-react';
import { useMovieStore } from '../store/movieStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const searchSchema = z.object({
  query: z.string().min(1, 'Enter a search term'),
});
type SearchForm = z.infer<typeof searchSchema>;

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { favorites, watchlist } = useMovieStore();

  const { register, handleSubmit, reset } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  const onSearch = ({ query }: SearchForm) => {
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    reset();
    setSearchOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/trending', label: 'Trending' },
    { to: '/watchlist', label: 'Watchlist' },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0d0d0d]/95 backdrop-blur-md shadow-lg' : 'bg-linear-to-b from-black/70 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Movie</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {link.to === '/watchlist' && watchlist.length > 0 && (
                  <span className="ml-1.5 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {watchlist.length}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.form
                  key="search-form"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit(onSearch)}
                  className="flex items-center bg-white/10 border border-white/20 rounded-full overflow-hidden"
                >
                  <input
                    {...register('query')}
                    autoFocus
                    placeholder="Search movies..."
                    className="bg-transparent text-white text-sm px-4 py-2 outline-none placeholder-gray-400 flex-1 min-w-0"
                  />
                  <button type="submit" className="p-2 text-gray-400 hover:text-white">
                    <Search className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.button
                  key="search-btn"
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-4 py-2 text-white text-sm transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search Movies</span>
                </motion.button>
              )}
            </AnimatePresence>

            <Link to="/favorites" className="relative hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </Link>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0d0d]/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/favorites"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Heart className="w-4 h-4" />
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
