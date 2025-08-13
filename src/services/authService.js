// Servicio de autenticación
const API_BASE_URL = 'https://dummyjson.com';

export const authService = {
  // Login simulado - en producción sería una API real
  async login(email, password) {
    try {
      // Simulación de API de login
      if (email === 'admin' && password === '1234') {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AaWNwbmEuZWR1LnBlIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM5MjM5MjM5fQ.example';
        return { success: true, token, user: { id: 1, email, role: 'admin' } };
      }
      throw new Error('Credenciales incorrectas');
    } catch (error) {
      throw error;
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Obtener token actual
  getToken() {
    return localStorage.getItem('token');
  },

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Verificar token válido (simulado)
  async verifyToken(token) {
    try {
      // En producción, aquí harías una petición al backend para verificar el token
      return { valid: true, user: { id: 1, email: 'admin@icpna.edu.pe', role: 'admin' } };
    } catch (error) {
      return { valid: false };
    }
  }
}; 