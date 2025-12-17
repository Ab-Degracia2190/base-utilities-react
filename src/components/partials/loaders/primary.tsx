import React, { useEffect, useState } from "react";
import AnimatedBackground from "../background/animation";

interface PrimaryLoaderProps {
  overlay?: boolean;
  color?: string;
}

const PrimaryLoader: React.FC<PrimaryLoaderProps> = ({ overlay = false, color }) => {
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

  const spinnerColor = color || (isDark ? "white" : "black");

  return overlay ? (
    <div className={`fixed inset-0 flex justify-center items-center z-50 ${isDark ? 'dark' : ''}`}>
      <AnimatedBackground />
      
      <svg className="w-10 h-10 animate-spin relative z-10" viewBox="0 0 40 40" height="40" width="40">
        <circle className="track" cx="20" cy="20" r="17.5" pathLength="100" strokeWidth="5" fill="none"
          style={{ stroke: spinnerColor, opacity: 0.1 }} />
        <circle className="car" cx="20" cy="20" r="17.5" pathLength="100" strokeWidth="5" fill="none"
          style={{
            stroke: spinnerColor,
            strokeDasharray: "25, 75",
            strokeDashoffset: 0,
            strokeLinecap: "round"
          }} />
      </svg>
    </div>
  ) : (
    <svg className="w-10 h-10 animate-spin" viewBox="0 0 40 40" height="40" width="40">
      <circle className="track" cx="20" cy="20" r="17.5" pathLength="100" strokeWidth="5" fill="none"
        style={{ stroke: spinnerColor, opacity: 0.1 }} />
      <circle className="car" cx="20" cy="20" r="17.5" pathLength="100" strokeWidth="5" fill="none"
        style={{
          stroke: spinnerColor,
          strokeDasharray: "25, 75",
          strokeDashoffset: 0,
          strokeLinecap: "round"
        }} />
    </svg>
  );
};

export default PrimaryLoader;