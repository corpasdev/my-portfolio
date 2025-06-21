'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';
import PageLoader from './PageLoader';

interface PageLoaderWrapperProps {
  children: ReactNode;
  showText?: boolean;
  text?: string;
  minDuration?: number;
  maxDuration?: number;
  onLoadingComplete?: () => void;
}

const PageLoaderWrapper = ({
  children,
  showText = true,
  text = "Brandon Corpas",
  minDuration = 5000,
  maxDuration = 5000,
  onLoadingComplete
}: PageLoaderWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // COMENTADO: Check if user has seen loader in this session
    // const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    
    // if (hasSeenLoader) {
    //   setIsLoading(false);
    //   return;
    // }

    // Duración fija de 5 segundos
    const loadingTime = 5000;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      // sessionStorage.setItem('hasSeenLoader', 'true'); // COMENTADO
      onLoadingComplete?.();
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [minDuration, maxDuration, onLoadingComplete]);

  // Prevent hydration issues
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark">
        <div className="animate-pulse">
          <img src="/images/logo/logo.png" alt="Logo" className="h-16 w-auto opacity-50" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && (
          <PageLoader
            onComplete={() => setIsLoading(false)}
            showText={showText}
          />
        )}
      </AnimatePresence>
      
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};

export default PageLoaderWrapper; 