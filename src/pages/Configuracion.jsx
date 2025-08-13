import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import styles from '../style/Configuracion.module.css';

const Configuracion = () => {
  const { modoOscuro, toggleTema } = useContext(ThemeContext);

  return (
    <div className={styles.configContainer}>
      <div className={styles.configCard}>
        <h2 className={styles.configTitle}>Configuración</h2>
        
        <div className={styles.configSection}>
          <h3>Apariencia</h3>
          
          <div className={styles.themeToggleContainer}>
            <div className={styles.themeInfo}>
              <div className={styles.themeIcon}>
                <i className={`fas ${modoOscuro ? 'fa-moon' : 'fa-sun'}`}></i>
              </div>
              <div className={styles.themeDetails}>
                <h4>Tema de la aplicación</h4>
                <p>Modo actual: <strong>{modoOscuro ? 'Oscuro' : 'Claro'}</strong></p>
              </div>
            </div>
            
            <button 
              className={styles.themeToggleButton}
              onClick={toggleTema}
            >
              <span>Cambiar a {modoOscuro ? 'Claro' : 'Oscuro'}</span>
              <i className={`fas ${modoOscuro ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </div>

        <div className={styles.configSection}>
          <h3>Preferencias de notificaciones</h3>
          <div className={styles.notificationPrefs}>
            <div className={styles.notificationOption}>
              <label className={styles.switch}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
              <div className={styles.optionDetails}>
                <h4>Notificaciones por correo</h4>
                <p>Recibe actualizaciones importantes por email</p>
              </div>
            </div>

            <div className={styles.notificationOption}>
              <label className={styles.switch}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
              <div className={styles.optionDetails}>
                <h4>Notificaciones del sistema</h4>
                <p>Notificaciones en tiempo real en la plataforma</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.configSection}>
          <h3>Información del sistema</h3>
          <div className={styles.systemInfo}>
            <div className={styles.infoItem}>
              <i className="fas fa-code-branch"></i>
              <div>
                <h4>Versión</h4>
                <p>1.0.0</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <i className="fas fa-server"></i>
              <div>
                <h4>Estado del servidor</h4>
                <p className={styles.statusOnline}>Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;