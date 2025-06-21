'use client';

import LanguageSelector from './LanguageSelector';

const LanguageSelectorWrapper = () => {
  const handleLanguageChange = (language: 'es' | 'en') => {
    console.log('Language changed to:', language);
    // Aquí puedes implementar lógica adicional como:
    // - Cambiar el idioma de la aplicación
    // - Guardar en localStorage
    // - Hacer una llamada a la API
    // - Redirigir a la versión del idioma
  };

  return (
    <LanguageSelector 
      defaultLanguage="es"
      onLanguageChange={handleLanguageChange}
    />
  );
};

export default LanguageSelectorWrapper; 