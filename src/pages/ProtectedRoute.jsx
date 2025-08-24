import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
    const login = JSON.parse(localStorage.getItem('loginData') || '{}');
    const register = JSON.parse(localStorage.getItem('RegisterUser') || '[]');

    const userExists = register.find(
        item => item.email === login.email && item.password === login.password
    );

    if (!register.length && !login.email) {
        return <Navigate to="/register" />;
    } else if (register.length && !login.email) {
        return <Navigate to="/login" />;
    } else if (!userExists) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}