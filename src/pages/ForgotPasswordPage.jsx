import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (!res.ok) {
        setSnackbar({
          open: true,
          message: result.message || "Something went wrong",
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: result.message,
          severity: "success",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Server error, please try again later",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Enter your registered email and we’ll send you a password reset link.
        </Typography>

        <Box component="form" onSubmit={handleForgotPassword}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5, position: "relative" }}
            disabled={loading}
          >
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: "white",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
            <span style={{ opacity: loading ? 0 : 1 }}>Send Reset Link</span>
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2500}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Grid>
  );
};

export default ForgotPasswordPage;
