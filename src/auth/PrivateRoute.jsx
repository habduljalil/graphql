import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isTokenValid, removeStoredToken } from "./token";

// Component to protect private routes by checking for a valid token
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!isTokenValid(token)) {
    // If no valid token, clear token and redirect to the login page
    removeStoredToken();
    return <Navigate to="/" replace />;
  }
  // If token is valid, render the child components
  return children;
}

// Prop validation to ensure children are provided
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
