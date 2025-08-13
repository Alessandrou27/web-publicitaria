import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../style/UserList.module.css';
import toast from 'react-hot-toast';

const regexNombre = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]*$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^[0-9]+$/;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const savedUsers = localStorage.getItem('usuarios');
    if (savedUsers && JSON.parse(savedUsers).length > 0) {
      setUsers(JSON.parse(savedUsers));
    } else {
      axios.get('https://dummyjson.com/users')
        .then(res => {
          setUsers(res.data.users);
          localStorage.setItem('usuarios', JSON.stringify(res.data.users));
        })
        .catch(err => console.error('Error al cargar usuarios:', err));
    }
  }, []);

  // Guardar edición con validaciones
  const guardarEdicion = () => {
    if (!editUser) return;

    if (!editUser.firstName.trim() || !regexNombre.test(editUser.firstName)) {
      toast.error('El nombre solo puede contener letras y espacios');
      return;
    }
    if (!editUser.lastName.trim() || !regexNombre.test(editUser.lastName)) {
      toast.error('El apellido solo puede contener letras y espacios');
      return;
    }
    if (!editUser.email.trim() || !regexEmail.test(editUser.email)) {
      toast.error('Formato de correo inválido');
      return;
    }
    if (!editUser.phone.trim() || !regexTelefono.test(editUser.phone)) {
      toast.error('El teléfono solo puede contener números');
      return;
    }
    if (
      !editUser.age ||
      isNaN(editUser.age) ||
      editUser.age < 1 ||
      editUser.age > 120
    ) {
      toast.error('Edad debe estar entre 1 y 120 años');
      return;
    }

    try {
      const actualizados = users.map(user =>
        user.id === editUser.id ? editUser : user
      );
      setUsers(actualizados);
      localStorage.setItem('usuarios', JSON.stringify(actualizados));
      toast.success('Usuario actualizado correctamente');
      setEditUser(null);
    } catch (err) {
      toast.error('Error al actualizar usuario');
      console.error(err);
    }
  };

  // Filtrar usuarios
  const usuariosFiltrados = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.userList}>
      <div className={styles.header}>
        <h2>Lista de Usuarios</h2>
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.age}</td>
                <td className={styles.actions}>
                  <button 
                    className={styles.btnEdit} 
                    onClick={() => setEditUser(user)}
                  >
                    <i className="fas fa-edit"></i>
                    Editar
                  </button>
                  <button 
                    className={styles.btnDelete} 
                    onClick={() => {
                      const confirm = window.confirm("¿Estás seguro de eliminar este usuario?");
                      if (!confirm) return;
                      try {
                        const usuariosActualizados = users.filter(u => u.id !== user.id);
                        setUsers(usuariosActualizados);
                        localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
                        toast.success('Usuario eliminado correctamente');
                      } catch (err) {
                        toast.error('Error al eliminar usuario');
                        console.error(err);
                      }
                    }}
                  >
                    <i className="fas fa-trash"></i>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      {editUser && (
        <div className={styles.modalOverlay} onClick={() => setEditUser(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Editar Usuario</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setEditUser(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.inputGroup}>
                <label>Nombre</label>
                <input
                  type="text"
                  value={editUser.firstName || ''}
                  onChange={(e) => {
                    if (regexNombre.test(e.target.value)) {
                      setEditUser({ ...editUser, firstName: e.target.value });
                    }
                  }}
                  placeholder="Nombre"
                  className={styles.input}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label>Apellido</label>
                <input
                  type="text"
                  value={editUser.lastName || ''}
                  onChange={(e) => {
                    if (regexNombre.test(e.target.value)) {
                      setEditUser({ ...editUser, lastName: e.target.value });
                    }
                  }}
                  placeholder="Apellido"
                  className={styles.input}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label>Correo</label>
                <input
                  type="email"
                  value={editUser.email || ''}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  placeholder="Correo"
                  className={styles.input}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label>Teléfono</label>
                <input
                  type="text"
                  value={editUser.phone || ''}
                  onChange={(e) => {
                    if (e.target.value === '' || regexTelefono.test(e.target.value)) {
                      setEditUser({ ...editUser, phone: e.target.value });
                    }
                  }}
                  placeholder="Teléfono"
                  className={styles.input}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label>Edad</label>
                <input
                  type="number"
                  value={editUser.age || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || (/^\d+$/.test(val) && parseInt(val) <= 120 && parseInt(val) >= 1)) {
                      setEditUser({ ...editUser, age: val === '' ? '' : parseInt(val) });
                    }
                  }}
                  placeholder="Edad"
                  className={styles.input}
                  min={1}
                  max={120}
                />
              </div>
            </div>
            
            <div className={styles.modalActions}>
              <button 
                className={styles.saveButton} 
                onClick={guardarEdicion}
              >
                <i className="fas fa-save"></i>
                Guardar
              </button>
              <button 
                className={styles.cancelButton} 
                onClick={() => setEditUser(null)}
              >
                <i className="fas fa-times"></i>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;