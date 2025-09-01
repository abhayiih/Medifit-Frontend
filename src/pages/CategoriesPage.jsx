import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const CategoriesPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateOrUpdate = async () => {
    if (!newName) return;
    setLoading(true);

    try {
      if (editingId) {
        // Update category
        await axios.put(
          `http://localhost:5000/api/categories/${editingId}`,
          { name: newName },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setSnackbar({
          open: true,
          message: "Category updated!",
          severity: "success",
        });
      } else {
        // Create category
        await axios.post(
          "http://localhost:5000/api/categories",
          { name: newName },
          { headers: { Authorization: `Bearer ${user.token}` } } // token required
        );
        setSnackbar({
          open: true,
          message: "Category created!",
          severity: "success",
        });
      }

      setNewName("");
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Error",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setNewName(category.name);
    setEditingId(category._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSnackbar({
        open: true,
        message: "Category deleted!",
        severity: "success",
      });
      fetchCategories();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Error",
        severity: "error",
      });
    }
  };

  if (!user?.isAdmin)
    return <Typography variant="h5">Access Denied</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        Categories Management
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Category Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleCreateOrUpdate}
          disabled={loading}
        >
          {editingId ? "Update" : "Add"} Category
        </Button>
      </Box>

      <Grid container spacing={2}>
        {categories.map((cat) => (
          <Grid key={cat._id} size={{xs:12,sm:6,md:4}}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{cat.name}</Typography>
              <Box>
                <IconButton onClick={() => handleEdit(cat)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(cat._id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoriesPage;
