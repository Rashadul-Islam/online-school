import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    role,
    redirectPath = '/login',
    children,
}) => {
    console.log(role);
    if (!role) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default ProtectedRoute;