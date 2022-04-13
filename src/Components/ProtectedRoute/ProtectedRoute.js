import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
    role,
    redirectPath = '/login',
    children,
}) => {
    if (!role) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;