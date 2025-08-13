import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
  console.log('AppRouter rendering');
  
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Landing />} />
        
        {/* Ruta de login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas del admin */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter; 