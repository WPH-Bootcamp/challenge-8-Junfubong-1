import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Movie</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/trending" className="hover:text-white transition-colors">Trending</Link>
            <Link to="/watchlist" className="hover:text-white transition-colors">Watchlist</Link>
            <Link to="/favorites" className="hover:text-white transition-colors">Favorites</Link>
          </nav>

          <p className="text-gray-500 text-sm">
            Copyright &copy; {new Date().getFullYear()} Movie APP
          </p>
        </div>
      </div>
    </footer>
  );
}