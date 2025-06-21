'use client';

import MobileMenu from './MobileMenu';
import { useMobileMenu } from './useMobileMenu';

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