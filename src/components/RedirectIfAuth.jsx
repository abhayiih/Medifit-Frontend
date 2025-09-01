import { Navigate } from "react-router-dom";

const RedirectIfAuth = ({ children }) => {
    
  const user = JSON.parse(localStorage.getItem("user")); 

  if (user && user.token) {
    return <Navigate to="/" replace />; // redirect logged-in users
  }

  // Not logged in → render the page
  return children;
};

export default RedirectIfAuth;
