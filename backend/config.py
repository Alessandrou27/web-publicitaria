import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env si existe
load_dotenv()

# Configuración SMTP
SMTP_USER = os.getenv('SMTP_USER', 'tu-email@gmail.com')
SMTP_PASS = os.getenv('SMTP_PASS', 'tu-password-app')
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587

# Email de destino
ADMIN_EMAIL = 'gabrielsebastiants@gmail.com'

# Configuración del servidor
PORT = int(os.getenv('PORT', 5000))

print(f"Configuración cargada:")
print(f"SMTP_USER: {SMTP_USER}")
print(f"ADMIN_EMAIL: {ADMIN_EMAIL}")
print(f"PORT: {PORT}")
