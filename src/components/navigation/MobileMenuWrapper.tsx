'use client';

import MobileMenu from '../navigation/MobileMenu';
import { useMobileMenu } from '../hooks/useMobileMenu';

const MobileMenuWrapper = () => {
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <MobileMenu 
      isOpen={isOpen} 
      onToggle={toggle} 
      onClose={close} 
    />
  );
};

export default MobileMenuWrapper; 