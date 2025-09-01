import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      await new Promise((resolve) => setTimeout(resolve, 1000)); // show spinner

      const result = await res.json();

      if (!res.ok) {
        setSnackbar({ open: true, message: result.message || "Registration failed", severity: "error" });
        return;
      }

      setSnackbar({ open: true, message: "Registration successful! Please login.", severity: "success" });

      // Wait 2s then redirect to login
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
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
      type="register"
      onSubmit={handleRegister}
      loading={loading}
      snackbar={snackbar}
      handleCloseSnackbar={handleCloseSnackbar}
    />
  );
};

export default RegisterPage;
