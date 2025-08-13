# Configuración del Backend - Envío de Emails

## 🚀 Configuración para Gmail

### 1. Habilitar autenticación de 2 factores en Gmail
1. Ve a tu cuenta de Google
2. Seguridad > Verificación en 2 pasos
3. Activa la verificación en 2 pasos

### 2. Generar contraseña de aplicación
1. Ve a tu cuenta de Google
2. Seguridad > Contraseñas de aplicación
3. Selecciona "Otra" y dale un nombre (ej: "ICPNA Backend")
4. Copia la contraseña generada (16 caracteres)

### 3. Configurar variables de entorno
Crea un archivo `.env` en la carpeta `backend/`:

```env
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicación
PORT=5000
```

### 4. Instalar dependencias
```bash
cd backend
pip install -r requirements.txt
```

### 5. Ejecutar el servidor
```bash
python app.py
```

## 📧 Configuración del Email

El backend está configurado para enviar emails a: `gabrielsebastiants@gmail.com`

### Formato del email:
- **Asunto:** ¡Nuevo mensaje recibido! - [Nombre]
- **Contenido:** Nombre, email, mensaje y fecha
- **Destinatario:** gabrielsebastiants@gmail.com

## 🔧 Solución de problemas

### Error de autenticación SMTP:
1. Verifica que la contraseña de aplicación sea correcta
2. Asegúrate de que la verificación en 2 pasos esté activada
3. Usa la contraseña de aplicación, no tu contraseña normal

### Error de conexión:
1. Verifica que el servidor esté ejecutándose en puerto 5000
2. Asegúrate de que el frontend esté apuntando a `http://localhost:5000`

### Email no llega:
1. Revisa la carpeta de spam
2. Verifica que el email de destino sea correcto
3. Revisa los logs del servidor para errores

## 📝 Logs del servidor

El servidor mostrará en consola:
- "Email enviado exitosamente a gabrielsebastiants@gmail.com" (éxito)
- "Error enviando email: [detalles]" (error)

## 🌐 URLs del backend

- `POST /contact` - Enviar formulario de contacto
- `GET /health` - Estado del servidor
