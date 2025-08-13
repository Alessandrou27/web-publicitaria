import Header from '../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from '../style/Landing.module.css';
import Footer from "../components/Footer";
import anuncio1 from '../assets/anuncio1.jpg';
import anuncio2 from '../assets/anuncio2.jpg';
import anuncio3 from '../assets/anuncio3.jpg';
import anuncio4 from '../assets/anuncio4.jpg';

const Landing = () => {
  const [form, setForm] = useState({ 
    nombre: '', 
    correo: '', 
    telefono: '', 
    mensaje: '' 
  });
  const [enviando, setEnviando] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (form.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!form.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = 'Ingresa un correo válido';
    }
    
    if (!form.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^[\d\s\-\+\(\)]{7,}$/.test(form.telefono)) {
      newErrors.telefono = 'Ingresa un teléfono válido';
    }
    
    if (!form.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (form.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor corrige los errores en el formulario');
      return;
    }
    
    setEnviando(true);
    
    try {
      const backendUrl = 'http://localhost:5000/contact'; 
      
      const response = await axios.post(backendUrl, {
        name: form.nombre,
        email: form.correo,
        phone: form.telefono,
        message: form.mensaje
      });
      
      if (response.data.success) {
        toast.success('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
        setForm({ nombre: '', correo: '', telefono: '', mensaje: '' });
        setErrors({});
      } else {
        toast.error('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <> 
      <Header />
      <div className={styles.landingContainer}>
        {/* HERO */}
        <section className={styles.heroSection} id="inicio">
          <img src="./src/assets/portada3.png" alt="Imagen de ICPNA" className={styles.heroImg} />
          <div className={styles.heroContent}>
            <h1>Bienvenido al ICPNA</h1>
            <p>Conectamos tu futuro con educación de calidad internacional</p>
            <button 
              onClick={() => scrollToSection('contacto')} 
              className={styles.btnHero}
            >
              <i className="fas fa-envelope"></i>
              Contáctanos
            </button>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className={styles.servicesSection}>
          <div className={styles.container}>
            <h2>Nuestros beneficios</h2>
            <div className={styles.serviceCards}>
              <div className={styles.card}>
                <span className={styles.emoji}>🌎</span>
                <p>Inglés certificado internacionalmente</p>
              </div>
              <div className={styles.card}>
                <span className={styles.emoji}>🧑‍🏫</span>
                <p>Docentes calificados</p>
              </div>
              <div className={styles.card}>
                <span className={styles.emoji}>💻</span>
                <p>Plataforma virtual moderna</p>
              </div>
            </div>
          </div>
        </section>

        {/* NUEVAS IMÁGENES (ANUNCIOS) */}
        <section className={styles.anunciosSection}>
          <img src={anuncio1} alt="Anuncio 1" className={styles.anuncioImg} />
          <img src={anuncio2} alt="Anuncio 2" className={styles.anuncioImg} />
          <img src={anuncio3} alt="Anuncio 3" className={styles.anuncioImg} />
          <img src={anuncio4} alt="Anuncio 4" className={styles.anuncioImg} />
        </section>

        {/* FORMULARIO DE CONTACTO */}
        <section className={styles.contactSection} id="contacto">
          <div className={styles.container}>
            <h2>Escríbenos</h2>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre completo"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    disabled={enviando}
                    className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
                  />
                  {errors.nombre && <span className={styles.errorText}>{errors.nombre}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="correo"
                    placeholder="Correo electrónico"
                    value={form.correo}
                    onChange={handleChange}
                    required
                    disabled={enviando}
                    className={`${styles.input} ${errors.correo ? styles.inputError : ''}`}
                  />
                  {errors.correo && <span className={styles.errorText}>{errors.correo}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                    disabled={enviando}
                    className={`${styles.input} ${errors.telefono ? styles.inputError : ''}`}
                  />
                  {errors.telefono && <span className={styles.errorText}>{errors.telefono}</span>}
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <textarea
                  name="mensaje"
                  placeholder="Escribe tu mensaje aquí"
                  rows="5"
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                  disabled={enviando}
                  className={`${styles.textarea} ${errors.mensaje ? styles.inputError : ''}`}
                />
                {errors.mensaje && <span className={styles.errorText}>{errors.mensaje}</span>}
              </div>
              
              <button type="submit" disabled={enviando} className={styles.submitButton}>
                {enviando ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Enviar mensaje
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default Landing;
