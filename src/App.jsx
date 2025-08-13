import { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import styles from './style/App.module.css';

function App() {
  // Detectar preferencia del sistema al inicio
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('tema');
    
    if (savedTheme === 'oscuro' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className={styles.app}>
          <AppRouter />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--color-bg)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
              },
              success: {
                iconTheme: {
                  primary: 'var(--color-success)',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: 'var(--color-error)',
                  secondary: 'white',
                },
              },
            }}
          />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;