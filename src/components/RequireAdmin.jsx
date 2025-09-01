import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RequireAdmin;
