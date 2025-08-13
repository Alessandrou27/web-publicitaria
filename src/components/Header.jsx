import { useState, useEffect } from 'react';
import styles from '../style/Header.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    closeMenu();
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className={`${styles.mainHeader} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logoContainer}>
            <img src="/src/assets/logo-icpna.png" alt="ICPNA Logo" className={styles.headerLogo} />
          </Link>
          
          <nav className={`${styles.navLinks} ${isMenuOpen ? styles.navOpen : ''}`}>
            <a href="#inicio" className={styles.navLink} onClick={closeMenu}>
              <i className="fas fa-home"></i>
              <span>Inicio</span>
            </a>
            
            <a href="#contacto" className={styles.navLink} onClick={closeMenu}>
              <i className="fas fa-envelope"></i>
              <span>Contacto</span>
            </a>
            
            {isAuthenticated ? (
              <Link to="/admin" className={styles.navLink} onClick={closeMenu}>
                <i className="fas fa-user-circle"></i>
                <span>Cuenta</span>
              </Link>
            ) : (
              <Link to="/login" className={styles.navLink} onClick={closeMenu}>
                <i className="fas fa-sign-in-alt"></i>
                <span>Acceso</span>
              </Link>
            )}
            
            {isAuthenticated && (
              <button 
                onClick={handleLogoutClick} 
                className={`${styles.navLink} ${styles.logoutButton}`}
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Cerrar Sesión</span>
              </button>
            )}
          </nav>

          <button 
            className={`${styles.menuToggle} ${isMenuOpen ? styles.menuOpen : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Modal de confirmación de logout */}
      {showLogoutModal && (
        <div className={styles.modalOverlay} onClick={handleLogoutCancel}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <i className="fas fa-sign-out-alt"></i>
              <h3>Confirmar Cierre de Sesión</h3>
            </div>
            <div className={styles.modalBody}>
              <p>¿Estás seguro de que quieres cerrar sesión?</p>
            </div>
            <div className={styles.modalActions}>
              <button 
                onClick={handleLogoutCancel}
                className={styles.modalButtonCancel}
              >
                Cancelar
              </button>
              <button 
                onClick={handleLogoutConfirm}
                className={styles.modalButtonConfirm}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
