import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import styles from '../style/Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success('Inicio de sesión exitoso');
        navigate('/admin');
      } else {
        toast.error(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      toast.error(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <div className={styles.logoContainer}>
          <img src="/src/assets/logo-icpna.png" alt="ICPNA" className={styles.logoIcpna} />
          <h1>Panel Administrativo</h1>
          <p>Ingresa tus credenciales para continuar</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              <i className="fas fa-user"></i>
              Usuario
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Ingresa tu usuario"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className={styles.input}
              autoComplete="username"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              <i className="fas fa-lock"></i>
              Contraseña
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className={styles.input}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Iniciando sesión...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Iniciar sesión
              </>
            )}
          </button>
        </form>
        
        <div className={styles.credentials}>
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Usuario: admin</p>
          <p>Contraseña: 1234</p>
        </div>
      </div>
    </div>
  );
};

export default Login;