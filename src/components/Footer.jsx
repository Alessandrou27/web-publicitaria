import React from "react";
import styles from "../style/Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerSection}>
        <h3>ICPNA Publicitaria</h3>
        <p>Instituto Cultural Peruano Norteamericano</p>
        <p>Educación de calidad internacional en inglés</p>
      </div>

      <div className={styles.footerSection}>
        <h4>Contacto</h4>
        <p><i className="fas fa-phone"></i> +51 1 706-7000</p>
        <p><i className="fas fa-envelope"></i> info@icpna.edu.pe</p>
        <p><i className="fas fa-map-marker-alt"></i> Lima, Perú</p>
      </div>

      <div className={styles.footerSection}>
        <h4>Síguenos en redes sociales:</h4>
        <div className={styles.socialRow}>
          <a href="https://www.facebook.com/icpnaoficial/" className={styles.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>

          <a href="https://www.instagram.com/icpnaoficial/" className={styles.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>

          <a href="https://www.youtube.com/user/icpnaoficial" className={styles.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>

          <a href="https://www.tiktok.com/@icpnaoficial" className={styles.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <i className="fab fa-tiktok"></i>
          </a>

          <a href="https://x.com/icpnaoficial" className={styles.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fab fa-x-twitter"></i>
          </a>

          <a href="tel:+5117067000" className={styles.phone} aria-label="Llamar">
            <i className="fas fa-phone-alt"></i>
          </a>
        </div>
      </div>
    </div>
    
    <div className={styles.footerBottom}>
      <p>&copy; {new Date().getFullYear()} ICPNA. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;