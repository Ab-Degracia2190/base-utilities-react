import React, { useEffect, useState } from 'react';
import AnimatedBackground from '../background/animation';

interface SecondaryLoaderProps {
  overlay?: boolean;
  color?: string;
}

const SecondaryLoader: React.FC<SecondaryLoaderProps> = ({ overlay = false, color }) => {
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

  const dotColor = color || (isDark ? "bg-white" : "bg-black");

  const DotsLoader = () => (
    <div className="flex space-x-2">
      <div className={`w-3 h-3 ${dotColor} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`w-3 h-3 ${dotColor} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`w-3 h-3 ${dotColor} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );

  return overlay ? (
    <div className={`fixed inset-0 flex justify-center items-center z-50 ${isDark ? 'dark' : ''}`}>
      <AnimatedBackground />
      <div className="relative z-10">
        <DotsLoader />
      </div>
    </div>
  ) : (
    <DotsLoader />
  );
};

export default SecondaryLoader;