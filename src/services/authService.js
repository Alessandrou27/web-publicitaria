// Servicio de autenticación usando localStorage
export const authService = {
  // Inicializar usuarios predeterminados si no existen
  initializeDefaultUsers() {
    const existingUsers = localStorage.getItem('users');
    if (!existingUsers) {
      const defaultUsers = [
        {
          id: 1,
          username: 'admin',
          password: '1234',
          email: 'admin@icpna.edu.pe',
          role: 'admin',
          firstName: 'Administrador',
          lastName: 'Sistema',
          phone: '',
          department: 'Tecnología de la Información',
          position: 'Administrador Principal',
          profileImage: null,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  },

  // Login usando localStorage
  async login(username, password) {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === username && u.password === password);
      
      if (user) {
        const token = this.generateToken(user);
        return { 
          success: true, 
          token, 
          user: { 
            id: user.id, 
            username: user.username, 
            email: user.email, 
            role: user.role,
            firstName: user.firstName || user.username,
            lastName: user.lastName || '',
            phone: user.phone || '',
            department: user.department || '',
            position: user.position || (user.role === 'admin' ? 'Administrador' : 'Usuario'),
            profileImage: user.profileImage || null,
            createdAt: user.createdAt || new Date().toISOString()
          } 
        };
      }
      throw new Error('Credenciales incorrectas');
    } catch (error) {
      throw error;
    }
  },

  // Registrar nuevo usuario
  async register(username, password, email, firstName, lastName, phone = '', department = '', position = '', profileImage = null) {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Verificar si el usuario ya existe
      const existingUser = users.find(u => u.username === username || u.email === email);
      if (existingUser) {
        throw new Error('El nombre de usuario o email ya existe');
      }

      // Procesar imagen de perfil si existe
      let profileImageData = null;
      if (profileImage) {
        try {
          profileImageData = await this.convertImageToBase64(profileImage);
        } catch (error) {
          console.error('Error procesando imagen:', error);
          // Continuar sin imagen si hay error
        }
      }

      // Crear nuevo usuario con campos adicionales del perfil
      const newUser = {
        id: users.length + 1,
        username,
        password,
        email,
        role: 'user',
        firstName: firstName || username, // Usar el nombre proporcionado o username como fallback
        lastName: lastName || '',
        phone: phone || '',
        department: department || '',
        position: position || 'Usuario',
        profileImage: profileImageData,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      return { success: true, user: newUser };
    } catch (error) {
      throw error;
    }
  },

  // Generar token simple (en producción usar JWT real)
  generateToken(user) {
    const tokenData = {
      userId: user.id,
      username: user.username,
      role: user.role,
      timestamp: Date.now()
    };
    return btoa(JSON.stringify(tokenData));
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

  // Verificar token válido
  async verifyToken(token) {
    try {
      if (!token) return { valid: false };
      
      const tokenData = JSON.parse(atob(token));
      const currentTime = Date.now();
      
      // Token expira después de 24 horas
      if (currentTime - tokenData.timestamp > 24 * 60 * 60 * 1000) {
        return { valid: false };
      }

      return { valid: true, user: tokenData };
    } catch (error) {
      return { valid: false };
    }
  },

  // Actualizar perfil del usuario
  async updateProfile(userId, profileData) {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        throw new Error('Usuario no encontrado');
      }

      // Actualizar datos del usuario
      users[userIndex] = { ...users[userIndex], ...profileData };
      localStorage.setItem('users', JSON.stringify(users));

      return { success: true, user: users[userIndex] };
    } catch (error) {
      throw error;
    }
  },

  // Convertir imagen a base64
  async convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}; 