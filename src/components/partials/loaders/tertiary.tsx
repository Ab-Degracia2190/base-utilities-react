import React, { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/partials/background/animation';

interface TertiaryLoaderProps {
  overlay?: boolean;
  color?: string;
}

const TertiaryLoader: React.FC<TertiaryLoaderProps> = ({ overlay = false, color }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    // Initial check
    setIsDark(document.documentElement.classList.contains('dark'));

    // Create a MutationObserver to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    // Start observing the html element for class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Also listen for storage events (in case theme is changed in another tab)
    const handleStorageChange = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const barColor = color || (isDark ? "bg-white" : "bg-black");

  const BarsLoader = () => (
    <div className="flex space-x-1 items-end h-10">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-1.5 ${barColor} rounded-full`}
          style={{
            animation: 'scaleY 1s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
            transformOrigin: 'bottom'
          }}
        ></div>
      ))}
      <style>{`
        @keyframes scaleY {
          0%, 100% { height: 12px; }
          50% { height: 32px; }
        }
      `}</style>
    </div>
  );

  return overlay ? (
    <div className={`fixed inset-0 flex justify-center items-center z-50 ${isDark ? 'dark' : ''}`}>
      <AnimatedBackground />
      <div className="relative z-10">
        <BarsLoader />
      </div>
    </div>
  ) : (
    <BarsLoader />
  );
};

export default TertiaryLoader;