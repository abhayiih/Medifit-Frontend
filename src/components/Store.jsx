import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { CommonTypography, CommonButton } from "../components/CommonComponents";
import { Email, ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import newsletterImg from "../assets/newsletterImg.svg";
import outside from "../assets/outside.svg";

const API_BASE = "http://localhost:5000";

export default function Store() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/products`);

      // Sort by _id ascending (oldest first) and take only 8 products
      const oldest8Products = res.data
        .sort((a, b) => a._id.localeCompare(b._id))
        .slice(0, 8);

      setProducts(oldest8Products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  fetchProducts();
}, []);


  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <Box textAlign="center" mb={6}>
        <CommonTypography variant="h4" fontWeight="bold">
          Explore Our Store Collection
        </CommonTypography>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={4} maxWidth="1100px" justifyContent="flex-start">
        {products.map((product) => (
          <Grid key={product._id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                backgroundColor: "#EEEDE7",
                width: 250,
                height: 340,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                "&:hover .shop-btn": { opacity: 1 },
              }}
            >
              {/* Image */}
              <Box sx={{ backgroundColor: "white", p: 3 }}>
                <CardMedia
                  component="img"
                  alt={product.title}
                  image={`${API_BASE}${product.image}`}
                  sx={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    mx: "auto",
                  }}
                />
              </Box>

              {/* Product Info */}
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontSize: "1.2rem" }}>
                  {product.title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1rem", mt: 1 }}>
                  ₹{Number(product.price).toLocaleString("en-IN")}
                  <span style={{ textDecoration: "line-through", marginLeft: 8 }}>
                    ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                  </span>
                </Typography>

                <CommonButton
                  component={Link}
                  to={`/shop/${product._id}`}
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  className="shop-btn"
                  sx={{
                    mt: 2,
                    opacity: 0,
                    transition: "opacity 0.3s",
                    backgroundColor: "#D3744A",
                    "&:hover": { backgroundColor: "#b85c36" },
                    width: "100%",
                  }}
                >
                  Shop Now
                </CommonButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Newsletter Section */}
      <Box
        sx={{
          mt: 10,
          display: "flex",
          gap: 4,
          backgroundColor: "#F5F5F5",
          borderRadius: 2,
          alignItems: "flex-start",
          minHeight: 300,
          maxWidth: "1100px",
          mx: 0,
        }}
      >
        {/* Left Half - Image */}
        <Box sx={{ flex: 1 }}>
          <Box component="img" src={newsletterImg} alt="newsletter" sx={{ width: "100%", height: "auto" }} />
        </Box>

        {/* Right Half - Text & Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            mt: 5,
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ textAlign: "center", mb: 1 }}>
              Join our newsletter
            </Typography>
            <CommonTypography
              fontWeight="bold"
              sx={{
                textAlign: "center",
                fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                lineHeight: 1.2,
              }}
            >
              Sign Up for an Instant 15% Discount
            </CommonTypography>
          </Box>

          {/* Bottom Form */}
          <Box sx={{ display: "flex", gap: 2, mt: 23 }}>
            <TextField
              sx={{ flex: 2 }}
              placeholder="Enter your email"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              endIcon={<img src={outside} alt="Logo" style={{ width: 20, height: 27 }} />}
              sx={{ flex: 1 }}
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
