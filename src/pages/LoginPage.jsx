import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      await new Promise((resolve) => setTimeout(resolve, 1000)); // show spinner

      const result = await res.json();

      if (!res.ok) {
        setSnackbar({ open: true, message: result.message || "Login failed", severity: "error" });
        return;
      }

      // Save full user info including token and isAdmin
      localStorage.setItem("user", JSON.stringify(result));
      localStorage.setItem("token", result.token); 

      setSnackbar({ open: true, message: "Login successful!", severity: "success" });

      // Redirect to previous page if available, otherwise homepage
      const redirectPath = location.state?.from || "/";
      setTimeout(() => navigate(redirectPath), 2000); // wait 2s for snackbar

    } catch (error) {
      setSnackbar({ open: true, message: "Something went wrong", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      loading={loading}
      snackbar={snackbar}
      handleCloseSnackbar={handleCloseSnackbar}
    />
  );
};

export default LoginPage;
