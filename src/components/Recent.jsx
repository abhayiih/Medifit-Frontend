import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { CommonTypography, CommonButton } from "../components/CommonComponents";

const API_BASE = "http://localhost:5000";

export default function Recent({ title = "Latest Products" }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products`);
        // Sort by createdAt or _id descending and pick latest 4
        const latestProducts = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setProducts(latestProducts);
      } catch (err) {
        console.error("Failed to fetch latest products:", err);
      }
    };
    fetchLatestProducts();
  }, []);

  return (
    <Box sx={{ padding: 4, backgroundColor: "background.default", textAlign: "center" }}>
      <Box sx={{ mb: 4 }}>
        <CommonTypography variant="h4">{title}</CommonTypography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid key={product._id} sx={{ flex: "1 1 250px", maxWidth: 250 }}>
            <Card
              sx={{
                backgroundColor: "#EEEDE7",
                position: "relative",
                overflow: "hidden",
                "&:hover .shop-btn": { opacity: 1 },
              }}
            >
              {product.chip && (
                <Chip
                  label={product.chip}
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    backgroundColor: "#D3744A",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              )}

              <Box sx={{ backgroundColor: "white", p: 2 }}>
                <CardMedia
                  component="img"
                  alt={product.title}
                  image={`${API_BASE}${product.image}`}
                  sx={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                    mx: "auto",
                  }}
                />
              </Box>

              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
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
                    opacity: 0,
                    transition: "opacity 0.3s",
                    backgroundColor: "#D3744A",
                    "&:hover": { backgroundColor: "#b85c36" },
                  }}
                >
                  Shop Now
                </CommonButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
