import { useState } from 'react';
import { motion } from 'framer-motion';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

interface DesktopNavigationProps {
  className?: string;
  initialActiveId?: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'sobre-mi', label: 'SOBRE MÍ', href: '#sobre-mi' },
  { id: 'experiencia', label: 'EXPERIENCIA', href: '#experiencia' },
  { id: 'proyectos', label: 'PROYECTOS', href: '#proyectos' },
  { id: 'servicios', label: 'SERVICIOS', href: '#servicios' },
  { id: 'contactos', label: 'CONTACTOS', href: '#contactos' },
];

// Colores del tema
const colors = {
  muted: '#94A3B8',
  light: '#F4F4F4',
};

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ 
  className = "mt-8 xl:mt-12",
  initialActiveId = 'sobre-mi'
}) => {
  const [activeId, setActiveId] = useState<string>(initialActiveId);

  const handleItemClick = (id: string, href: string) => {
    setActiveId(id);
    // Opcional: manejar navegación
    // window.location.hash = href;
  };

  return (
    <nav className={`desktop-nav ${className}`}>
      <motion.ul 
        className="space-y-3 xl:space-y-2"
        initial="hidden"
        animate="visible"
      >
        {navigationItems.map((item, index) => {
          const isActive = activeId === item.id;
          
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: {
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              className="relative"
            >
              <motion.a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.id, item.href);
                }}
                className="nav-link-enhanced relative flex items-center text-sm font-bold py-3 cursor-pointer select-none overflow-hidden"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                {/* Línea animada */}
                <motion.div
                  className="nav-line flex-shrink-0 mr-4"
                  style={{
                    height: '1px',
                    minHeight: '1px',
                    maxHeight: '1px',
                  }}
                  initial={{
                    width: 40,
                    backgroundColor: colors.muted
                  }}
                  animate={{
                    width: isActive ? 80 : 40,
                    backgroundColor: isActive ? colors.light : colors.muted,
                    transition: {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                  whileHover={!isActive ? {
                    width: 80,
                    backgroundColor: colors.light,
                    transition: {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  } : {}}
                />
                
                {/* Texto animado */}
                <motion.span
                  className="nav-text whitespace-nowrap"
                  initial={{
                    color: colors.muted,
                    x: 0
                  }}
                  animate={{
                    color: isActive ? colors.light : colors.muted,
                    x: isActive ? 12 : 0,
                    transition: {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                  whileHover={!isActive ? {
                    color: colors.light,
                    x: 12,
                    transition: {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  } : {}}
                >
                  {item.label}
                </motion.span>
              </motion.a>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
};

export default DesktopNavigation; 