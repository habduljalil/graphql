import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isTokenValid, removeStoredToken } from "./token";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token && !isTokenValid(token)) {
    removeStoredToken();
  }

  if (isTokenValid(token)) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;