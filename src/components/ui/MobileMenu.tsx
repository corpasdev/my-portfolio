'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const menuItems = [
  { href: '#about', label: 'SOBRE MÍ' },
  { href: '#experience', label: 'EXPERIENCIA' },
  { href: '#projects', label: 'PROYECTOS' },
  { href: '#services', label: 'SERVICIOS' },
  { href: '#contact', label: 'CONTACTOS' },
];

// Animaciones personalizadas con tipos correctos
const menuVariants: Variants = {
  closed: {
    x: '100%',
    opacity: 0,
    transition: {
      type: 'tween' as const,
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween' as const,
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  closed: {
    x: 50,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const overlayVariants: Variants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const MobileMenu = ({ isOpen, onToggle, onClose }: MobileMenuProps) => {
  return (
    <>
      {/* Hamburger Button - Solo visible cuando el menú está cerrado */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={onToggle}
            className="flex flex-col justify-center items-center w-8 h-8 cursor-pointer relative z-10 lg:hidden"
            aria-label="Toggle menu"
            type="button"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.2 }
            }}
          >
            {/* Line 1 */}
            <motion.span
              className="block w-6 h-0.5 bg-white"
              initial={{ y: -2 }}
            />

            {/* Line 2 */}
            <motion.span
              className="block w-6 h-0.5 bg-white mt-1"
              initial={{ y: 2 }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[70] lg:hidden"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={onClose}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-dark z-[75] lg:hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Menu Content */}
              <div className="flex flex-col h-full">
                {/* Header con botón de cerrar - ÚNICO botón X */}
                <div className="flex justify-end p-6">
                  <motion.button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 0.2 }
                    }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col justify-center px-8">
                  <motion.div
                    className="space-y-8"
                    variants={menuVariants}
                    initial="closed"
                    animate="open"
                  >
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        variants={itemVariants}
                        custom={index}
                      >
                        <motion.a
                          href={item.href}
                          className="block text-2xl font-light text-white hover:text-primary transition-colors"
                          onClick={onClose}
                          whileHover={{
                            x: 10,
                            transition: { type: 'spring' as const, stiffness: 300, damping: 20 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.label}
                        </motion.a>
                      </motion.div>
                    ))}
                  </motion.div>
                </nav>

                {/* Footer */}
                <div className="p-8">
                  <motion.div
                    className="flex items-center space-x-2 py-3"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="status-badge inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-primary text-sm font-medium">Disponible para trabajar</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu; 