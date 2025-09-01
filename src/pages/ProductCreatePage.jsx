import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.number().typeError("Price must be a number").required("Price is required"),
  originalPrice: Yup.number().typeError("Original Price must be a number").required("Original Price is required"),
  category: Yup.string().required("Category is required"),
  chip: Yup.string().nullable(),
  image: Yup.mixed().nullable(),
});

const ProductCreatePage = () => {
  const { id } = useParams(); // check if we are in edit mode
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch categories
  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch product if in edit mode
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/products/${id}`)
        .then(res => {
          formik.setValues({
            title: res.data.title,
            price: res.data.price,
            originalPrice: res.data.originalPrice,
            category: res.data.category,
            chip: res.data.chip || "",
            image: null, // user can re-upload if needed
          });
        })
        .catch(err => console.error("Error fetching product:", err));
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      originalPrice: "",
      category: "",
      chip: "",
      image: null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = new FormData();
        Object.keys(values).forEach((key) => {
          if (values[key] !== null) data.append(key, values[key]);
        });

        if (id) {
          // update mode
          await axios.put(`http://localhost:5000/api/products/${id}`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`,
            },
          });
          setSnackbar({ open: true, message: "Product updated successfully!", severity: "success" });
        } else {
          // create mode
          await axios.post("http://localhost:5000/api/products", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`,
            },
          });
          setSnackbar({ open: true, message: "Product created successfully!", severity: "success" });
        }

        resetForm();
        navigate("/products"); // redirect back
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Failed to save product",
          severity: "error",
        });
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" align="center">
          {id ? "Edit Product" : "Create Product"}
        </Typography>

        <TextField
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          label="Price (INR)"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />

        <TextField
          label="Original Price (INR)"
          name="originalPrice"
          type="number"
          value={formik.values.originalPrice}
          onChange={formik.handleChange}
          error={formik.touched.originalPrice && Boolean(formik.errors.originalPrice)}
          helperText={formik.touched.originalPrice && formik.errors.originalPrice}
        />

        {/* Dropdown for categories */}
        <TextField
          select
          label="Category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        >
          {categories.map((c) => (
            <MenuItem key={c._id} value={c.name}>{c.name}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Chip"
          name="chip"
          value={formik.values.chip}
          onChange={formik.handleChange}
          error={formik.touched.chip && Boolean(formik.errors.chip)}
          helperText={formik.touched.chip && formik.errors.chip}
        />

        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])} />
        </Button>
        {formik.values.image && <Typography variant="body2">{formik.values.image.name}</Typography>}

        <Button type="submit" variant="contained" color="primary">
          {id ? "Update Product" : "Create Product"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductCreatePage;
