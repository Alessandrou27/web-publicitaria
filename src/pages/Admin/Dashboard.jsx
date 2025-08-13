import React from 'react';
import styles from '../../style/AdminHome.module.css';

const statsImg = "https://img.icons8.com/color/96/000000/combo-chart.png";
const activityImg = "https://img.icons8.com/color/96/000000/activity-history.png";
const actionsImg = "https://img.icons8.com/color/96/000000/rocket.png";

const Dashboard = () => {
  return (
    <div className={styles['admin-home']}>
      <h1>Dashboard ICPNA</h1>
      <p className={styles.subtitle}>
        Panel de control y estadísticas del sistema
      </p>

      <div className={styles['cards-container']}>
        <div className={styles['info-card']}>
          <img src={statsImg} alt="Estadísticas" className={styles.cardImg} />
          <h3>📊 Estadísticas Generales</h3>
          <ul>
            <li>Total de usuarios registrados: <b>150</b></li>
            <li>Cursos activos: <b>12</b></li>
            <li>Docentes disponibles: <b>25</b></li>
          </ul>
        </div>
        
        <div className={styles['info-card']}>
          <img src={activityImg} alt="Actividad" className={styles.cardImg} />
          <h3>📈 Actividad Reciente</h3>
          <ul>
            <li>Nuevos registros hoy: <b>5</b></li>
            <li>Sesiones activas: <b>8</b></li>
            <li>Mensajes pendientes: <b>3</b></li>
          </ul>
        </div>
        
        <div className={styles['info-card']}>
          <img src={actionsImg} alt="Acciones" className={styles.cardImg} />
          <h3>⚡ Acciones Rápidas</h3>
          <ul>
            <li>Registrar nuevo usuario</li>
            <li>Ver lista de usuarios</li>
            <li>Configurar sistema</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;