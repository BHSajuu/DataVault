import PropTypes from "prop-types"; // Import PropTypes for validation
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ roles, children }) => {
  const { user } = useAuth();

  if (!user) {
    console.log(user);

    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // If authenticated but lacks necessary role, redirect to home
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the children components
  return children;
};

// Define prop types for validation
ProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
