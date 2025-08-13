import sqlite3
import os
from datetime import datetime

class Database:
    def __init__(self, db_path='contacts.db'):
        self.db_path = db_path
        self.init_db()
    
    def init_db(self):
        """Inicializar la base de datos"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Tabla de contactos
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Tabla de usuarios (para futuras expansiones)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                role TEXT DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def save_contact(self, name, email, message):
        """Guardar un nuevo contacto"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO contacts (name, email, message)
            VALUES (?, ?, ?)
        ''', (name, email, message))
        
        contact_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return contact_id
    
    def get_contacts(self, limit=50):
        """Obtener contactos recientes"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT * FROM contacts 
            ORDER BY created_at DESC 
            LIMIT ?
        ''', (limit,))
        
        contacts = cursor.fetchall()
        conn.close()
        
        return contacts
    
    def get_contact_by_id(self, contact_id):
        """Obtener un contacto específico"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM contacts WHERE id = ?', (contact_id,))
        contact = cursor.fetchone()
        
        conn.close()
        return contact
    
    def delete_contact(self, contact_id):
        """Eliminar un contacto"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('DELETE FROM contacts WHERE id = ?', (contact_id,))
        deleted = cursor.rowcount > 0
        
        conn.commit()
        conn.close()
        
        return deleted
