import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../pages/Admin/Dashboard';
import Profile from '../pages/Admin/Profile';
import Users from '../pages/Admin/Users';
import RegisterUser from '../pages/Admin/RegisterUser';
import Settings from '../pages/Admin/Settings';
import styles from '../style/AdminLayout.module.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { modoOscuro, toggleTema } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/admin', icon: 'fas fa-chart-line', label: 'Dashboard' },
    { path: '/admin/profile', icon: 'fas fa-user', label: 'Perfil' },
    { path: '/admin/users', icon: 'fas fa-users', label: 'Usuarios' },
    { path: '/admin/register', icon: 'fas fa-user-plus', label: 'Registrar Usuario' },
    { path: '/admin/settings', icon: 'fas fa-cog', label: 'Configuración' }
  ];

  return (
    <div className={styles.adminLayout}>
      {/* Menú lateral */}
      <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <img src="/src/assets/logo-icpna.png" alt="Logo ICPNA" className={styles.sidebarLogo} />
          <h3>Panel Admin</h3>
        </div>
        
        <nav className={styles.sidebarNav}>
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              onClick={closeMenu}
              className={`${styles.navItem} ${isActiveRoute(item.path) ? styles.active : ''}`}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          ))}
          
          <div className={styles.navDivider}></div>
          
          <Link to="/" onClick={closeMenu} className={styles.navItem}>
            <i className="fas fa-home"></i>
            <span>Ir al sitio público</span>
          </Link>
          
          <button 
            onClick={(e) => { handleLogout(e); closeMenu(); }} 
            className={`${styles.navItem} ${styles.logoutButton}`}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className={styles.mainContainer}>
        {/* Header */}
        <header className={styles.adminHeader}>
          <div className={styles.headerLeft}>
            <button className={styles.menuToggle} onClick={toggleMenu}>
              <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
            
            <div className={styles.breadcrumb}>
              <span>Panel Administrativo</span>
              {location.pathname !== '/admin' && (
                <>
                  <i className="fas fa-chevron-right"></i>
                  <span>{menuItems.find(item => item.path === location.pathname)?.label || 'Página'}</span>
                </>
              )}
            </div>
          </div>
          
          <div className={styles.headerActions}>
            {user && (
              <div className={styles.userInfo}>
                <i className="fas fa-user-circle"></i>
                <span>{user.email}</span>
              </div>
            )}
            
            <button 
              className={styles.themeToggle} 
              onClick={toggleTema}
              title={`Cambiar a modo ${modoOscuro ? 'claro' : 'oscuro'}`}
            >
              <i className={`fas ${modoOscuro ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </header>

        {/* Contenido dinámico del panel */}
        <main className={styles.adminContent}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>

      {/* Overlay para cerrar menú en móvil */}
      {menuOpen && (
        <div className={styles.overlay} onClick={closeMenu} />
      )}
    </div>
  );
};

export default AdminLayout;