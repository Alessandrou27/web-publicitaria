import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../../style/Profile.module.css';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    department: '',
    position: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        firstName: user.firstName || user.username || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        department: user.department || '',
        position: user.position || (user.role === 'admin' ? 'Administrador' : 'Usuario')
      });
      
      // Mostrar imagen existente si existe
      if (user.profileImage) {
        setImagePreview(user.profileImage);
      }
    }
  }, [user]);

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
    
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Procesar imagen si se seleccionó una nueva
      let imageData = null;
      if (profileImage) {
        try {
          imageData = await convertImageToBase64(profileImage);
        } catch (error) {
          console.error('Error procesando imagen:', error);
          toast.error('Error al procesar la imagen');
          setLoading(false);
          return;
        }
      }

      const dataToUpdate = {
        ...profileData,
        profileImage: imageData || user.profileImage
      };

      const result = await updateProfile(dataToUpdate);
      if (result.success) {
        toast.success('Perfil actualizado exitosamente');
        setIsEditing(false);
        // Actualizar la imagen en el estado local
        if (imageData) {
          setImagePreview(imageData);
        }
      } else {
        toast.error(result.error || 'Error al actualizar perfil');
      }
    } catch (error) {
      toast.error('Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleCancel = () => {
    setProfileData({
      username: user.username || '',
      email: user.email || '',
      firstName: user.firstName || user.username || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      department: user.department || '',
      position: user.position || (user.role === 'admin' ? 'Administrador' : 'Usuario')
    });
    
    // Restaurar imagen original
    if (user.profileImage) {
      setImagePreview(user.profileImage);
    } else {
      setImagePreview(null);
    }
    
    setProfileImage(null);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="admin-home">
        <h2>Perfil del Usuario</h2>
        <p>Cargando información del usuario...</p>
      </div>
    );
  }

  return (
    <div className="admin-home">
      <h2>Perfil del Usuario</h2>
      
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            {imagePreview ? (
              <img src={imagePreview} alt="Perfil" className={styles.profileImage} />
            ) : (
              <span>
                {profileData.firstName ? profileData.firstName.charAt(0).toUpperCase() : 
                 profileData.username ? profileData.username.charAt(0).toUpperCase() : 'U'}
              </span>
            )}
          </div>
          <h3 className={styles.profileName}>
            {profileData.firstName && profileData.lastName ? 
             `${profileData.firstName} ${profileData.lastName}` : 
             profileData.username}
          </h3>
          <p className={styles.profileRole}>{profileData.position}</p>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            {/* Imagen de Perfil */}
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Imagen de Perfil</h4>
              
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

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Información Personal</h4>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Nombre:
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ingresa tu nombre (solo letras)"
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                  title="Solo se permiten letras y espacios"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Apellido:
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ingresa tu apellido (solo letras)"
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                  title="Solo se permiten letras y espacios"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Nombre de Usuario:
                </label>
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ingresa tu nombre de usuario (letras, números y _)"
                  pattern="[a-zA-Z0-9_]+"
                  title="Solo se permiten letras, números y guiones bajos"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Correo:
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ingresa tu correo"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Teléfono:
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ingresa tu teléfono (solo números)"
                  pattern="[\d\s\-\(\)]+"
                  title="Solo se permiten números, espacios, guiones y paréntesis"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Departamento:
                </label>
                <input
                  type="text"
                  name="department"
                  value={profileData.department}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ingresa tu departamento (solo letras)"
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                  title="Solo se permiten letras y espacios"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Cargo:
                </label>
                <input
                  type="text"
                  name="position"
                  value={profileData.position}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ingresa tu cargo (solo letras)"
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                  title="Solo se permiten letras y espacios"
                />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                disabled={loading}
                className={styles.primaryButton}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.secondaryButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Información Personal</h4>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Nombre:</span>
                <span className={styles.infoValue}>{profileData.firstName || 'No especificado'}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Apellido:</span>
                <span className={styles.infoValue}>{profileData.lastName || 'No especificado'}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Nombre de Usuario:</span>
                <span className={styles.infoValue}>{profileData.username}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Correo:</span>
                <span className={styles.infoValue}>{profileData.email}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Teléfono:</span>
                <span className={styles.infoValue}>{profileData.phone || 'No especificado'}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Cargo:</span>
                <span className={styles.infoValue}>{profileData.position}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Departamento:</span>
                <span className={styles.infoValue}>{profileData.department || 'No especificado'}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Rol:</span>
                <span className={styles.infoValue}>{user.role === 'admin' ? 'Administrador' : 'Usuario'}</span>
              </div>
            </div>
            
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Permisos del Sistema</h4>
              <ul className={styles.permissionsList}>
                {user.role === 'admin' ? (
                  <>
                    <li>Gestión completa de usuarios</li>
                    <li>Configuración del sistema</li>
                    <li>Acceso a reportes</li>
                    <li>Administración de contenido</li>
                  </>
                ) : (
                  <>
                    <li>Acceso básico al sistema</li>
                    <li>Visualización de contenido</li>
                    <li>Perfil personal</li>
                  </>
                )}
              </ul>
            </div>
            
            <div style={{textAlign: 'center'}}>
              <button
                onClick={() => setIsEditing(true)}
                className={styles.editButton}
              >
                <i className="fas fa-edit"></i> Editar Perfil
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile; 