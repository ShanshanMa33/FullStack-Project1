import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
    const { token, user } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    if (user.role !== 'admin') {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}