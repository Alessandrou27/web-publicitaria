from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime
from config import SMTP_USER, SMTP_PASS, SMTP_SERVER, SMTP_PORT, ADMIN_EMAIL, PORT

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
DATABASE = 'contacts.db'

def init_db():
    """Inicializar la base de datos"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def send_email(name, email, phone, message):
    """Enviar email usando SMTP"""
    try:
        # Verificar configuración
        if SMTP_USER == 'tu-email@gmail.com' or SMTP_PASS == 'tu-password-app':
            print("⚠️  ADVERTENCIA: Usando credenciales por defecto. Configura tu .env")
            return False
        
        # Crear mensaje
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = ADMIN_EMAIL
        msg['Subject'] = f'Tienes un nuevo mensaje de {name}'
        
        body = f"""\

👤 Nombre: {name}
✉ Email: {email}
📲 Teléfono: {phone}

✅ Mensaje:

- {message} 

¡Espero tu respuesta!

Enviado el: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

"""
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Enviar email
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        text = msg.as_string()
        server.sendmail(SMTP_USER, ADMIN_EMAIL, text)
        server.quit()
        
        print(f"✅ Email enviado exitosamente a {ADMIN_EMAIL}")
        return True
    except Exception as e:
        print(f"❌ Error enviando email: {e}")
        return False

@app.route('/contact', methods=['POST'])
def contact():
    """Endpoint para recibir formulario de contacto"""
    try:
        data = request.get_json()
        if not all(key in data for key in ['name', 'email', 'phone', 'message']):
            return jsonify({'success': False, 'message': 'Faltan datos requeridos'}), 400

        name = data['name']
        email = data['email']
        phone = data['phone']
        message = data['message']

        # Guardar en base de datos
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO contacts (name, email, phone, message)
            VALUES (?, ?, ?, ?)
        ''', (name, email, phone, message))
        conn.commit()
        conn.close()

        # Enviar email
        email_sent = send_email(name, email, phone, message)

        return jsonify({
            'success': True,
            'message': 'Mensaje enviado correctamente',
            'email_sent': email_sent
        })
    except Exception as e:
        print(f"❌ Error en endpoint /contact: {e}")
        return jsonify({
            'success': False,
            'message': f'Error interno del servidor: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health():
    """Endpoint de salud del servidor"""
    return jsonify({
        'status': 'OK', 
        'message': 'Servidor funcionando correctamente',
        'smtp_configured': SMTP_USER != 'tu-email@gmail.com'
    })

if __name__ == '__main__':
    init_db()
    print(f"🚀 Servidor iniciando en puerto {PORT}")
    print(f"📧 Email de destino: {ADMIN_EMAIL}")
    app.run(host='0.0.0.0', port=PORT, debug=True)