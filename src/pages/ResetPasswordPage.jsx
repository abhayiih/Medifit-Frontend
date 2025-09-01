import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, TextField, Typography, Paper, Button, Snackbar, Alert, CircularProgress, Grid
} from "@mui/material";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setSnackbar({ open: true, message: result.message || "Reset failed", severity: "error" });
      } else {
        setSnackbar({ open: true, message: "Password reset successful!", severity: "success" });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Server error", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Reset Password
        </Typography>

        <Box component="form" onSubmit={handleResetPassword}>
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Reset Password"}
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Paper>
    </Grid>
  );
};

export default ResetPasswordPage;
