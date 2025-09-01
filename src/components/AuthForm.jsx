import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

const AuthForm = ({ type, onSubmit, loading, snackbar, handleCloseSnackbar }) => {
  const isLogin = type === "login";

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: isLogin
        ? Yup.string()
        : Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isLogin ? "Login to Your Account" : "Register"}
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              margin="normal"
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              autoComplete="username"
            />
          )}

          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoComplete="email"
          />

          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          {/* Forgot password link only in login */}
          {isLogin && (
            <Typography variant="body2" align="right" sx={{ mt: 1 }}>
              <Link
                to="/forgot-password"
                style={{ textDecoration: "none", color: "#1976d2", fontWeight: 500 }}
              >
                Forgot Password?
              </Link>
            </Typography>
          )}

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
            <span style={{ opacity: loading ? 0 : 1 }}>
              {isLogin ? "Login" : "Register"}
            </span>
          </Button>
        </Box>

        {/* Toggle between login/register */}
        {isLogin ? (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none", color: "#1976d2", fontWeight: 500 }}>
              Sign Up
            </Link>
          </Typography>
        ) : (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none", color: "#1976d2", fontWeight: 500 }}>
              Login
            </Link>
          </Typography>
        )}

        {/* Continue without login */}
        {isLogin && (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            <Link to="/" style={{ textDecoration: "none", color: "#1976d2", fontWeight: 500 }}>
              Continue without login
            </Link>
          </Typography>
        )}

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
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

export default AuthForm;
