'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

interface LanguageSelectorProps {
  defaultLanguage?: 'es' | 'en';
  onLanguageChange?: (language: 'es' | 'en') => void;
}

const languages = [
  { code: 'es' as const, label: 'ES', flag: '🇪🇸' },
  { code: 'en' as const, label: 'EN', flag: '🇺🇸' },
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
        className="flex items-center space-x-2 border rounded-full px-4 py-2 text-sm cursor-pointer relative z-10 bg-dark text-white border-gray-600 hover:border-primary transition-colors min-w-[80px]"
        whileHover={{ 
          scale: 1.02,
          borderColor: 'rgb(6 182 212)', // primary color
        }}
        whileTap={{ scale: 0.98 }}
        animate={{
          borderColor: isOpen ? 'rgb(6 182 212)' : 'rgb(75 85 99)', // primary : gray-600
        }}
        transition={{
          type: 'spring' as const,
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Flag and Language Code - SIN rotación */}
        <span className="flex items-center space-x-1">
          <span className="text-xs">{currentLanguage?.flag}</span>
          <span className="font-medium">{currentLanguage?.label}</span>
        </span>

        {/* Dropdown Arrow - CON rotación */}
        <motion.svg
          className="w-3 h-3 text-gray-400"
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
              className="absolute top-full right-0 mt-2 bg-dark border border-gray-600 rounded-lg shadow-xl z-[15] min-w-[100px] overflow-hidden"
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center space-x-2 px-4 py-3 text-sm text-left transition-colors ${
                    selectedLanguage === language.code
                      ? 'bg-primary/10 text-primary'
                      : 'text-white hover:bg-gray-800'
                  }`}
                  variants={itemVariants}
                  whileHover={{ 
                    backgroundColor: selectedLanguage === language.code 
                      ? 'rgba(6, 182, 212, 0.2)' 
                      : 'rgba(55, 65, 81, 1)',
                    x: 4,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm">{language.flag}</span>
                  <span className="font-medium">{language.label}</span>
                  
                  {/* Selected Indicator */}
                  {selectedLanguage === language.code && (
                    <motion.div
                      className="ml-auto"
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