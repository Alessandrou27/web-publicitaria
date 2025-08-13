# 🌟 ICPNA - Sitio Web Publicitario

Un sitio web moderno y responsive para el Instituto Cultural Peruano Norteamericano (ICPNA), construido con React y Vite.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con soporte para modo oscuro
- 📱 **Totalmente Responsive**: Optimizado para todos los dispositivos
- ⚡ **Rendimiento Optimizado**: Carga rápida con Vite y optimizaciones
- 🔐 **Panel Administrativo**: Sistema de autenticación y gestión
- 📧 **Formulario de Contacto**: Integrado con backend para envío de mensajes
- 🌙 **Modo Oscuro**: Cambio automático según preferencias del sistema
- 🎯 **SEO Optimizado**: Metadatos y estructura semántica

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 19, Vite, CSS Modules
- **Routing**: React Router DOM
- **Estado**: React Hooks y Context API
- **Notificaciones**: React Hot Toast
- **Iconos**: Font Awesome, React Icons
- **Formularios**: React Hook Form con validación
- **Backend**: Python Flask (separado)

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd web-publicitaria
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🏗️ Estructura del Proyecto

```
web-publicitaria/
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── pages/              # Páginas principales
│   ├── layouts/            # Layouts de la aplicación
│   ├── context/            # Context API para estado global
│   ├── services/           # Servicios y APIs
│   ├── style/              # Archivos CSS Modules
│   ├── assets/             # Imágenes y recursos
│   └── router/             # Configuración de rutas
├── backend/                # Servidor Flask (separado)
├── public/                 # Archivos públicos
└── dist/                   # Build de producción
```

## 🎨 Componentes Principales

### Landing Page
- **Header**: Navegación principal con menú móvil
- **Hero Section**: Sección principal con llamada a la acción
- **Servicios**: Beneficios del ICPNA
- **Anuncios**: Galería de imágenes promocionales
- **Contacto**: Formulario de contacto con validación
- **Footer**: Información de contacto y redes sociales

### Panel Administrativo
- **Dashboard**: Vista general del sistema
- **Gestión de Usuarios**: CRUD de usuarios
- **Perfil**: Gestión del perfil de administrador
- **Configuración**: Ajustes del sistema

## 🔧 Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa del build
npm run lint         # Ejecutar ESLint
```

## 🌙 Modo Oscuro

El sitio incluye soporte automático para modo oscuro:
- Detección automática de preferencias del sistema
- Toggle manual en el panel administrativo
- Persistencia de preferencias en localStorage

## 📱 Responsive Design

El sitio está optimizado para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔐 Autenticación

### Credenciales de Prueba
- **Usuario**: `admin`
- **Contraseña**: `1234`

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Servir Build
```bash
npm run preview
```

## 📊 Optimizaciones

- **Code Splitting**: Carga lazy de componentes
- **Image Optimization**: Optimización automática de imágenes
- **Bundle Splitting**: Separación de vendor chunks
- **Tree Shaking**: Eliminación de código no utilizado
- **Minificación**: Compresión de archivos CSS y JS

## 🐛 Solución de Problemas

### Error de CORS
Si encuentras errores de CORS con el backend:
1. Asegúrate de que el servidor Flask esté ejecutándose
2. Verifica que la URL del backend sea correcta
3. Revisa la configuración de CORS en el backend

### Problemas de Build
```bash
# Limpiar cache
npm run build --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **ICPNA**: [icpna.edu.pe](https://icpna.edu.pe)
- **Email**: info@icpna.edu.pe
- **Teléfono**: +51 1 706-7000

---

⭐ Si te gusta este proyecto, ¡dale una estrella!
