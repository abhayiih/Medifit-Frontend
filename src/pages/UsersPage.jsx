import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";

const UsersPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.isAdmin) return;
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSnackbar({ open: true, message: "User deleted successfully", severity: "success" });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Failed to delete user",
        severity: "error",
      });
    }
  };

  const handleToggleBlock = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/users/${id}/block`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSnackbar({ open: true, message: res.data.message, severity: "success" });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isBlocked: res.data.isBlocked } : u))
      );
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Failed to update user",
        severity: "error",
      });
    }
  };

  if (!user?.isAdmin) return <Typography variant="h5">Access Denied</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        Users Management
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Snackbar open autoHideDuration={3000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      ) : (
        <Grid container spacing={2}>
          {users.map((u) => (
            <Grid item xs={12} sm={6} md={4} key={u._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{u.username}</Typography>
                  <Typography>Email: {u.email}</Typography>
                  <Typography>Admin: {u.isAdmin ? "Yes" : "No"}</Typography>
                  <Typography>Blocked: {u.isBlocked ? "Yes" : "No"}</Typography>
                  <Typography>
                    Created: {new Date(u.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    Updated: {new Date(u.updatedAt).toLocaleDateString()}
                  </Typography>

                  <Box mt={2} sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color={u.isBlocked ? "success" : "warning"}
                      onClick={() => handleToggleBlock(u._id)}
                    >
                      {u.isBlocked ? "Enable" : "Disable"}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(u._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UsersPage;
