from datetime import datetime
from dataclasses import dataclass
from typing import Optional

@dataclass
class Contact:
    """Modelo para los contactos del formulario"""
    id: Optional[int]
    name: str
    email: str
    message: str
    created_at: Optional[datetime] = None
    
    def to_dict(self):
        """Convertir a diccionario para JSON"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    @classmethod
    def from_db_row(cls, row):
        """Crear instancia desde fila de base de datos"""
        return cls(
            id=row[0],
            name=row[1],
            email=row[2],
            message=row[3],
            created_at=datetime.fromisoformat(row[4]) if row[4] else None
        )

@dataclass
class User:
    """Modelo para usuarios del sistema"""
    id: Optional[int]
    username: str
    email: str
    password_hash: str
    role: str = 'user'
    created_at: Optional[datetime] = None
    
    def to_dict(self):
        """Convertir a diccionario para JSON (sin password)"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    @classmethod
    def from_db_row(cls, row):
        """Crear instancia desde fila de base de datos"""
        return cls(
            id=row[0],
            username=row[1],
            email=row[2],
            password_hash=row[3],
            role=row[4],
            created_at=datetime.fromisoformat(row[5]) if row[5] else None
        )

@dataclass
class ContactForm:
    """Modelo para validar formulario de contacto"""
    name: str
    email: str
    message: str
    
    def validate(self):
        """Validar datos del formulario"""
        errors = []
        
        if not self.name or len(self.name.strip()) < 2:
            errors.append("El nombre debe tener al menos 2 caracteres")
        
        if not self.email or '@' not in self.email:
            errors.append("El email no es válido")
        
        if not self.message or len(self.message.strip()) < 10:
            errors.append("El mensaje debe tener al menos 10 caracteres")
        
        return errors
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'name': self.name.strip(),
            'email': self.email.strip().lower(),
            'message': self.message.strip()
        }
