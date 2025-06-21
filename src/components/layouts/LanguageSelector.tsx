'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

interface LanguageSelectorProps {
  defaultLanguage?: 'es' | 'en';
  onLanguageChange?: (language: 'es' | 'en') => void;
}

// Componentes de banderas SVG
const SpainFlag = () => (
  <svg className="w-5 h-4 rounded-sm overflow-hidden" viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#AA151B"/>
    <rect y="4" width="24" height="8" fill="#F1BF00"/>
    <rect y="6" width="24" height="4" fill="#AA151B"/>
  </svg>
);

const USFlag = () => (
  <svg className="w-5 h-4 rounded-sm overflow-hidden" viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#B22234"/>
    <rect y="1" width="24" height="1" fill="white"/>
    <rect y="3" width="24" height="1" fill="white"/>
    <rect y="5" width="24" height="1" fill="white"/>
    <rect y="7" width="24" height="1" fill="white"/>
    <rect y="9" width="24" height="1" fill="white"/>
    <rect y="11" width="24" height="1" fill="white"/>
    <rect y="13" width="24" height="1" fill="white"/>
    <rect y="15" width="24" height="1" fill="white"/>
    <rect width="10" height="8" fill="#3C3B6E"/>
  </svg>
);

const languages = [
  { 
    code: 'es' as const, 
    label: 'ES', 
    name: 'Español',
    flag: <SpainFlag />
  },
  { 
    code: 'en' as const, 
    label: 'EN', 
    name: 'English',
    flag: <USFlag />
  },
];

const dropdownVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -10,
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

const LanguageSelector = ({ 
  defaultLanguage = 'es', 
  onLanguageChange 
}: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageChange = (languageCode: 'es' | 'en') => {
    setSelectedLanguage(languageCode);
    setIsOpen(false);
    onLanguageChange?.(languageCode);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Language Selector Button */}
      <motion.button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 border rounded-full px-4 py-2.5 text-sm cursor-pointer relative z-10 bg-dark/80 backdrop-blur-sm text-white border-gray-600/50 hover:border-primary/60 transition-all duration-200 min-w-[90px] shadow-lg"
        whileHover={{ 
          scale: 1.02,
          borderColor: 'rgba(6, 182, 212, 0.6)',
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
        }}
        whileTap={{ scale: 0.98 }}
        animate={{
          borderColor: isOpen ? 'rgba(6, 182, 212, 0.8)' : 'rgba(75, 85, 99, 0.5)',
          backgroundColor: isOpen ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0.8)',
        }}
        transition={{
          type: 'spring' as const,
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Flag and Language Code */}
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0">
            {currentLanguage?.flag}
          </div>
          <span className="font-medium text-white/90">{currentLanguage?.label}</span>
        </div>

        {/* Dropdown Arrow */}
        <motion.svg
          className="w-3 h-3 text-gray-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[5]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Panel */}
            <motion.div
              className="absolute top-full right-0 mt-2 bg-dark/95 backdrop-blur-sm border border-gray-600/50 rounded-xl shadow-2xl z-[15] min-w-[120px] overflow-hidden"
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm text-left transition-all duration-200 ${
                    selectedLanguage === language.code
                      ? 'bg-primary/15 text-primary border-l-2 border-primary'
                      : 'text-white/90 hover:bg-gray-800/60'
                  }`}
                  variants={itemVariants}
                  whileHover={{ 
                    backgroundColor: selectedLanguage === language.code 
                      ? 'rgba(6, 182, 212, 0.2)' 
                      : 'rgba(55, 65, 81, 0.6)',
                    x: selectedLanguage === language.code ? 0 : 4,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-shrink-0">
                    {language.flag}
                  </div>
                  
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium">{language.name}</span>
                  </div>
                  
                  {/* Selected Indicator */}
                  {selectedLanguage === language.code && (
                    <motion.div
                      className="flex-shrink-0"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring' as const, stiffness: 500, damping: 30 }}
                    >
                      <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector; 