'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface PageLoaderProps {
  onComplete?: () => void;
  showText?: boolean;
}

const PageLoader = ({ 
  onComplete, 
  showText = true
}: PageLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let isPageLoaded = false;

    // Simular progreso inicial más rápido
    const startProgress = () => {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90 && !isPageLoaded) {
            // Mantener en 90% hasta que la página se cargue
            return 90;
          }
          if (isPageLoaded && prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          // Progreso más rápido al inicio
          const increment = isPageLoaded ? 5 : Math.random() * 8 + 3;
          return Math.min(prev + increment, isPageLoaded ? 100 : 90);
        });
      }, 100);
    };

    // Detectar cuando la página se ha cargado completamente
    const handlePageLoad = () => {
      isPageLoaded = true;
      // Completar el progreso cuando la página se carga
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 300);
      }, 200);
    };

    // Iniciar progreso inmediatamente
    startProgress();

    // Escuchar eventos de carga
    if (document.readyState === 'complete') {
      // Si ya está cargado
      handlePageLoad();
    } else {
      // Esperar a que se complete la carga
      window.addEventListener('load', handlePageLoad);
      
      // Fallback: si toma más de 3 segundos, completar de todas formas
      const fallbackTimer = setTimeout(handlePageLoad, 3000);
      
      return () => {
        window.removeEventListener('load', handlePageLoad);
        clearInterval(progressInterval);
        clearTimeout(fallbackTimer);
      };
    }

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            transition: { 
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark overflow-hidden"
        >
          {/* Logo with floating animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1]
              }
            }}
            className="mb-8 relative z-10"
          >
            <motion.img
              src="/images/logo/logo.png"
              alt="Logo"
              className="h-20 w-auto filter drop-shadow-lg"
              animate={{
                y: [0, -8, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            
            {/* Logo glow effect */}
            <motion.div
              className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </motion.div>

          {/* Loading Text */}
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.6, duration: 0.8 }
              }}
              className="mb-8 relative z-10"
            >
              <motion.p
                className="text-muted text-lg text-center"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 1, duration: 0.6 }
                }}
              >
                Loading {Math.round(progress)}%
              </motion.p>
            </motion.div>
          )}

          {/* Enhanced Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { delay: 0.8, duration: 1 }
            }}
            className="px-4 w-full max-w-md relative z-10 mx-8 sm:mx-0 sm:w-96"
          >
            {/* Progress Container */}
            <div className="relative w-full h-1.5 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/30">
              {/* Progress Fill */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg"
                initial={{ width: "0%" }}
                animate={{ 
                  width: `${progress}%`,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
              />
              
              {/* Animated Shimmer */}
              <motion.div
                className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: [-96, 384],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5
                  }
                }}
              />
            </div>
            
            {/* Progress Bar Glow */}
            <motion.div
              className="absolute inset-0 bg-primary/20 blur-sm rounded-full"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader; 