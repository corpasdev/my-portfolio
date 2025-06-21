import { useState, useEffect } from 'react';

interface UsePageLoaderOptions {
  minDuration?: number;
  maxDuration?: number;
  autoHide?: boolean;
}

export const usePageLoader = ({
  minDuration = 2000,
  maxDuration = 4000,
  autoHide = true
}: UsePageLoaderOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Check if it's the first load in this session
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    
    if (hasLoadedBefore && !autoHide) {
      setIsLoading(false);
      setIsFirstLoad(false);
      return;
    }

    // Simulate realistic loading time
    const loadingTime = Math.random() * (maxDuration - minDuration) + minDuration;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsFirstLoad(false);
      sessionStorage.setItem('hasLoadedBefore', 'true');
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [minDuration, maxDuration, autoHide]);

  const hideLoader = () => {
    setIsLoading(false);
  };

  const showLoader = () => {
    setIsLoading(true);
  };

  return {
    isLoading,
    isFirstLoad,
    hideLoader,
    showLoader
  };
}; 