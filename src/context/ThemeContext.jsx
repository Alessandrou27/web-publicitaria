import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [modoOscuro, setModoOscuro] = useState(() => {
    // Intenta obtener el tema guardado, si no existe usa la preferencia del sistema
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado) {
      return temaGuardado === 'oscuro';
    }
    // Usa la preferencia del sistema como valor inicial
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Aplica el tema inicial
    if (modoOscuro) {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.remove('dark-mode');
    }

    // Guarda la preferencia
    localStorage.setItem('tema', modoOscuro ? 'oscuro' : 'claro');
  }, [modoOscuro]);

  const toggleTema = () => {
    setModoOscuro(prevMode => !prevMode);
  };

  // Escucha cambios en la preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Solo cambia automáticamente si no hay preferencia guardada
      if (!localStorage.getItem('tema')) {
        setModoOscuro(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ modoOscuro, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
};