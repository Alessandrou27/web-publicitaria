import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import styles from '../style/Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    department: '',
    position: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validaciones específicas por tipo de campo
    if (name === 'firstName' || name === 'lastName' || name === 'department' || name === 'position') {
      // Solo letras, espacios y algunos caracteres especiales
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value) && value !== '') {
        toast.error('Este campo solo permite letras y espacios');
        return;
      }
    }
    
    if (name === 'phone') {
      // Solo números, espacios, guiones y paréntesis
      if (!/^[\d\s\-\(\)]+$/.test(value) && value !== '') {
        toast.error('Este campo solo permite números, espacios, guiones y paréntesis');
        return;
      }
    }
    
    if (name === 'username') {
      // Solo letras, números y guiones bajos
      if (!/^[a-zA-Z0-9_]+$/.test(value) && value !== '') {
        toast.error('El nombre de usuario solo permite letras, números y guiones bajos');
        return;
      }
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona solo archivos de imagen');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen debe ser menor a 5MB');
        return;
      }
      
      setProfileImage(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || 
        !formData.firstName || !formData.lastName) {
      toast.error('Por favor completa todos los campos obligatorios');
      return false;
    }

    if (formData.username.length < 3) {
      toast.error('El nombre de usuario debe tener al menos 3 caracteres');
      return false;
    }

    if (formData.password.length < 4) {
      toast.error('La contraseña debe tener al menos 4 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor ingresa un email válido');
      return false;
    }

    if (formData.firstName.length < 2) {
      toast.error('El nombre debe tener al menos 2 caracteres');
      return false;
    }

    if (formData.lastName.length < 2) {
      toast.error('El apellido debe tener al menos 2 caracteres');
      return false;
    }

    if (formData.phone && formData.phone.length < 7) {
      toast.error('El teléfono debe tener al menos 7 dígitos');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await register(
        formData.username, 
        formData.password, 
        formData.email,
        formData.firstName,
        formData.lastName,
        formData.phone,
        formData.department,
        formData.position,
        profileImage
      );
      if (result.success) {
        toast.success('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
        navigate('/login');
      } else {
        toast.error(result.error || 'Error al registrar usuario');
      }
    } catch (error) {
      toast.error(error.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerBox}>
        <div className={styles.logoContainer}>
          <img src="/src/assets/logo-icpna.png" alt="ICPNA" className={styles.logoIcpna} />
          <h1>Registro de Usuario</h1>
          <p>Crea tu cuenta para acceder al sistema</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          {/* Imagen de Perfil */}
          <div>
            <h3 className={styles.sectionHeader}>
              Imagen de Perfil
            </h3>
            
            <div className={styles.imageUploadContainer}>
              <div className={styles.imagePreview}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className={styles.previewImage} />
                ) : (
                  <div className={styles.placeholderImage}>
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </div>
              
              <div className={styles.imageControls}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                  id="profileImage"
                />
                <label htmlFor="profileImage" className={styles.uploadButton}>
                  <i className="fas fa-upload"></i>
                  {profileImage ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                </label>
                
                {profileImage && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className={styles.removeButton}
                  >
                    <i className="fas fa-trash"></i>
                    Eliminar
                  </button>
                )}
              </div>
              
              <p className={styles.imageHelp}>
                Formatos permitidos: JPG, PNG, GIF. Tamaño máximo: 5MB
              </p>
            </div>
          </div>

          {/* Información Personal */}
          <div>
            <h3 className={styles.sectionHeader}>
              Información Personal
            </h3>
            
            <div className={styles.inputGroup}>
              <label htmlFor="firstName" className={styles.label}>
                <i className="fas fa-user"></i>
                Nombre <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Ingresa tu nombre (solo letras)"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={loading}
                className={styles.input}
                autoComplete="given-name"
                pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                title="Solo se permiten letras y espacios"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="lastName" className={styles.label}>
                <i className="fas fa-user"></i>
                Apellido <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Ingresa tu apellido (solo letras)"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={loading}
                className={styles.input}
                autoComplete="family-name"
                pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                title="Solo se permiten letras y espacios"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>
                <i className="fas fa-phone"></i>
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Ingresa tu teléfono (solo números)"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                className={styles.input}
                autoComplete="tel"
                pattern="[\d\s\-\(\)]+"
                title="Solo se permiten números, espacios, guiones y paréntesis"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="department" className={styles.label}>
                <i className="fas fa-building"></i>
                Departamento
              </label>
              <input
                type="text"
                id="department"
                name="department"
                placeholder="Ingresa tu departamento (solo letras)"
                value={formData.department}
                onChange={handleChange}
                disabled={loading}
                className={styles.input}
                autoComplete="organization"
                pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                title="Solo se permiten letras y espacios"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="position" className={styles.label}>
                <i className="fas fa-briefcase"></i>
                Cargo
              </label>
              <input
                type="text"
                id="position"
                name="position"
                placeholder="Ingresa tu cargo (solo letras)"
                value={formData.position}
                onChange={handleChange}
                disabled={loading}
                className={styles.input}
                autoComplete="organization-title"
                pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                title="Solo se permiten letras y espacios"
              />
            </div>
          </div>

          {/* Información de Cuenta */}
          <div>
            <h3 className={styles.sectionHeader}>
              Información de Cuenta
            </h3>

            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>
                <i className="fas fa-user"></i>
                Nombre de Usuario <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Ingresa tu nombre de usuario (letras, números y _)"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
                className={styles.input}
                autoComplete="username"
                pattern="[a-zA-Z0-9_]+"
                title="Solo se permiten letras, números y guiones bajos"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                <i className="fas fa-envelope"></i>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingresa tu email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className={styles.input}
                autoComplete="email"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                <i className="fas fa-lock"></i>
                Contraseña <span className={styles.required}>*</span>
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
                  autoComplete="new-password"
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

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                <i className="fas fa-lock"></i>
                Confirmar Contraseña <span className={styles.required}>*</span>
              </label>
              <div className={styles.passwordContainer}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirma tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className={styles.input}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={styles.registerButton}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Registrando...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i>
                Registrar Usuario
              </>
            )}
          </button>
        </form>
        
        <div className={styles.registerLink}>
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
