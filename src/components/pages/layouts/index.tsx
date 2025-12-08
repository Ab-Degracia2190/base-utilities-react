import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import AnimatedBackground from "@/components/partials/background/animation";
import ThemeToggle from "@/components/partials/buttons/default/theme-toggle";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Navigation Buttons - Fixed Position - Available on all pages */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Home Button - Only show if not on home page */}
        {!isHomePage && (
          <Link 
            to="/" 
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700"
            aria-label="Go to home page"
          >
            <Home className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors duration-200" />
          </Link>
        )}
        
        {/* Theme Toggle Button */}
        <ThemeToggle />
      </div>

      {/* This is where child routes will render */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;