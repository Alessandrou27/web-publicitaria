import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styles from '../style/RegistrarUsuario.module.css';

// Esquema de validación mejorado
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('Nombre obligatorio')
    .matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/, 'El nombre solo puede contener letras')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  
  lastName: yup
    .string()
    .required('Apellido obligatorio')
    .matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/, 'El apellido solo puede contener letras')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  
  email: yup
    .string()
    .required('Correo obligatorio')
    .email('Formato de correo inválido')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Formato de correo inválido'
    ),
  
  phone: yup
    .string()
    .required('Teléfono obligatorio')
    .matches(/^[0-9+\-\s()]+$/, 'El teléfono solo puede contener números, espacios, guiones y paréntesis')
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(15, 'El teléfono no puede exceder 15 caracteres'),
  
  age: yup
    .number()
    .required('Edad obligatoria')
    .positive('La edad debe ser un número positivo')
    .integer('La edad debe ser un número entero')
    .min(1, 'La edad debe ser mayor a 0')
    .max(120, 'La edad no puede exceder 120 años'),
});

const RegistrarUsuario = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleNameInput = (e) => {
    const value = e.target.value;
    const lettersOnly = value.replace(/[^A-Za-zÁáÉéÍíÓóÚúÑñ\s]/g, '');
    e.target.value = lettersOnly;
  };

  const handlePhoneInput = (e) => {
    const value = e.target.value;
    const phoneOnly = value.replace(/[^0-9+\-\s()]/g, '');
    e.target.value = phoneOnly;
  };

  const handleAgeInput = (e) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/[^0-9]/g, '');
    e.target.value = numbersOnly;
  };

const onSubmit = async (data) => {
  try {
    const existingUsers = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Buscar el id máximo actual y sumar 1, o empezar en 30 si no hay usuarios
    const nextId = existingUsers.length > 0
      ? Math.max(...existingUsers.map(user => user.id)) + 1
      : 30;

    const newUser = {
      id: nextId,
      ...data,
      age: parseInt(data.age)
    };

    const emailExists = existingUsers.some(user => user.email === data.email);
    if (emailExists) {
      toast.error('El correo electrónico ya está registrado');
      return;
    }

    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem('usuarios', JSON.stringify(updatedUsers));

    toast.success('Usuario registrado exitosamente');
    reset();

    setTimeout(() => {
      navigate('/admin/users');
    }, 1500);

  } catch (err) {
    toast.error('Error al registrar usuario');
    console.error(err);
  }
};

  return (
    <div className={styles.registrarForm}>
      <h2>Registrar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input 
            type="text" 
            placeholder="Nombre" 
            {...register('firstName')}
            onInput={handleNameInput}
            className={errors.firstName ? styles.inputError : styles.input}
          />
          {errors.firstName && (
            <span className={styles.errorMessage}>{errors.firstName.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input 
            type="text" 
            placeholder="Apellido" 
            {...register('lastName')}
            onInput={handleNameInput}
            className={errors.lastName ? styles.inputError : styles.input}
          />
          {errors.lastName && (
            <span className={styles.errorMessage}>{errors.lastName.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            {...register('email')}
            className={errors.email ? styles.inputError : styles.input}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input 
            type="text" 
            placeholder="Teléfono" 
            {...register('phone')}
            onInput={handlePhoneInput}
            className={errors.phone ? styles.inputError : styles.input}
          />
          {errors.phone && (
            <span className={styles.errorMessage}>{errors.phone.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input 
            type="number" 
            placeholder="Edad" 
            {...register('age')}
            onInput={handleAgeInput}
            className={errors.age ? styles.inputError : styles.input}
          />
          {errors.age && (
            <span className={styles.errorMessage}>{errors.age.message}</span>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Registrar Usuario
        </button>
      </form>
    </div>
  );
};

export default RegistrarUsuario;
