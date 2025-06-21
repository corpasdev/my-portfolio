import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReadMoreToggleProps {
  children: React.ReactNode;
  buttonClassName?: string;
}

const ReadMoreToggle: React.FC<ReadMoreToggleProps> = ({ 
  children, 
  buttonClassName = "mt-4 text-sm text-primary hover:text-primary/80 hover:underline focus:outline-none transition-colors duration-200 font-medium cursor-pointer"
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ 
              opacity: 0, 
              height: 0, 
              marginTop: 0 
            }}
            animate={{ 
              opacity: 1, 
              height: "auto", 
              marginTop: 16,
              transition: {
                duration: 0.5,
                ease: [0.04, 0.62, 0.23, 0.98] as const,
                height: { duration: 0.4 },
                opacity: { duration: 0.3, delay: 0.15 },
                marginTop: { duration: 0.4 }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0, 
              marginTop: 0,
              transition: {
                duration: 0.4,
                ease: [0.04, 0.62, 0.23, 0.98] as const,
                opacity: { duration: 0.2 },
                height: { duration: 0.3, delay: 0.1 },
                marginTop: { duration: 0.3, delay: 0.1 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="space-y-4 xl:space-y-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={toggleExpanded}
        className={buttonClassName}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2, ease: "easeOut" } 
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <motion.span
          key={isExpanded ? 'less' : 'more'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isExpanded ? 'Leer menos' : 'Leer más'}
        </motion.span>
      </motion.button>
    </div>
  );
};

export default ReadMoreToggle; 