import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

class Mailer:
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', 587))
        self.smtp_user = os.getenv('SMTP_USER', 'tu-email@gmail.com')
        self.smtp_pass = os.getenv('SMTP_PASS', 'tu-password')
        self.admin_email = os.getenv('ADMIN_EMAIL', 'admin@icpna.edu.pe')
    
    def send_contact_notification(self, name, email, message):
        """Enviar notificación de contacto al administrador"""
        try:
            # Crear mensaje
            msg = MIMEMultipart()
            msg['From'] = self.smtp_user
            msg['To'] = self.admin_email
            msg['Subject'] = f'Nuevo mensaje de contacto de {name}'
            
            body = f"""
            Nuevo mensaje de contacto recibido:
            
            Nombre: {name}
            Email: {email}
            Mensaje: {message}
            
            Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
            
            ---
            Este mensaje fue enviado automáticamente desde el formulario de contacto.
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            # Enviar email
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.smtp_user, self.smtp_pass)
            text = msg.as_string()
            server.sendmail(self.smtp_user, self.admin_email, text)
            server.quit()
            
            return True
        except Exception as e:
            print(f"Error enviando email: {e}")
            return False
    
    def send_welcome_email(self, user_email, user_name):
        """Enviar email de bienvenida al usuario"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.smtp_user
            msg['To'] = user_email
            msg['Subject'] = 'Bienvenido al ICPNA'
            
            body = f"""
            Hola {user_name},
            
            Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.
            
            Saludos,
            Equipo ICPNA
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.smtp_user, self.smtp_pass)
            text = msg.as_string()
            server.sendmail(self.smtp_user, user_email, text)
            server.quit()
            
            return True
        except Exception as e:
            print(f"Error enviando email de bienvenida: {e}")
            return False
    
    def test_connection(self):
        """Probar la conexión SMTP"""
        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.smtp_user, self.smtp_pass)
            server.quit()
            return True
        except Exception as e:
            print(f"Error en conexión SMTP: {e}")
            return False
