import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, farmerOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (farmerOnly && user.role === 'expert') return <Navigate to="/dashboard" replace />;
  return children;
}
