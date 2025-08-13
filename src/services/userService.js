import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

export const userService = {
  // Obtener todos los usuarios
  async getUsers() {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data.users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },

  // Crear nuevo usuario
  async createUser(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/add`, userData);
      return response.data;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  },

  // Actualizar usuario
  async updateUser(userId, userData) {
    try {
      const response = await axios.patch(`${API_BASE_URL}/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  },

  // Eliminar usuario
  async deleteUser(userId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  },

  // Obtener usuario por ID
  async getUserById(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }
}; 