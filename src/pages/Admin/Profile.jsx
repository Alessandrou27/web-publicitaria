import React from 'react';
import styles from '../../style/AdminHome.module.css';
import teresaImage from '../../assets/teresa.jpg';

const Profile = () => {
  return (
    <div className="admin-home">
      <h2>Perfil del Administrador</h2>
      
      <div style={{
        maxWidth: '600px', 
        margin: '2rem auto', 
        background: 'var(--color-bg)', 
        color: 'var(--color-text)', 
        padding: '2rem', 
        borderRadius: '10px', 
        boxShadow: '0 0 10px rgba(0,0,0,0.05)'
      }}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            margin: '0 auto 1rem',
            overflow: 'hidden',
            border: '3px solid var(--color-primary)'
          }}>
            <img 
              src={teresaImage} 
              alt="Teresa Chavez" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <h3>Teresa Chavez</h3>
          <p style={{color: 'var(--color-primary)'}}>Administrador Principal</p>
        </div>
        
        <div style={{marginBottom: '1.5rem'}}>
          <h4>Información Personal</h4>
          <p><strong>Nombre:</strong> Teresa Chavez</p>
          <p><strong>Correo:</strong> admin@icpna.edu.pe</p>
          <p><strong>Rol:</strong> Administrador</p>
          <p><strong>Departamento:</strong> Tecnología de la Información</p>
        </div>
        
        <div style={{marginBottom: '1.5rem'}}>
          <h4>Permisos del Sistema</h4>
          <p>• Gestión completa de usuarios</p>
          <p>• Configuración del sistema</p>
          <p>• Acceso a reportes</p>
          <p>• Administración de contenido</p>
        </div>
        
        <div>
          <h4>Última Actividad</h4>
          <p>• Inicio de sesión: Hoy a las 09:30 AM</p>
          <p>• Última acción: Edición de usuario #123</p>
        </div>
      </div>
    </div>
  );
};

export default Profile; 