import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CommonButton, CommonTypography } from "../components/CommonComponents";
import RigthNav from "../assets/RigthNev.svg";
import { ShoppingCart } from "@mui/icons-material";

const API_BASE = "http://localhost:5000";

export default function Collections() {
  const [products, setProducts] = useState([]);
  const cardWidth = 320;
  const cardHeight = 340;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products`);
        // Sort by _id ascending to get oldest first and take 5 items
        const oldest5Products = res.data
          .sort((a, b) => a._id.localeCompare(b._id))
          .slice(0, 5);
        setProducts(oldest5Products);
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
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: 1090, width: "100%" }}>
        {/* First Row: Text Card + Product Cards */}
        <Grid container spacing={8} justifyContent="flex-start">
          {/* Typography Card */}
          <Grid>
            <Card
              sx={{
                width: cardWidth,
                height: cardHeight,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                textAlign: "center",
                boxSizing: "border-box",
                backgroundColor: "#eeede7",
              }}
            >
              <Box>
                <CommonTypography variant="h4" sx={{ lineHeight: 1.4, mb: 3 }}>
                  Discover our collection
                </CommonTypography>
                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.2 }}>
                  Our medical store offers trusted products, easy navigation, and fast shipping.
                </Typography>
              </Box>
              <CommonButton
                component={Link}
                to="/products"
                variant="contained"
                endIcon={<img src={RigthNav} alt="Logo" />}
                sx={{ width: "100%" }}
              >
                View all products
              </CommonButton>
            </Card>
          </Grid>

          {/* Product Cards */}
          {products.map((product) => (
            <Grid item key={product._id}>
              <Card
                sx={{
                  width: cardWidth,
                  height: cardHeight,
                  backgroundColor: "#EEEDE7",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  "&:hover .shop-btn": { opacity: 1 },
                }}
              >
                <Box sx={{ backgroundColor: "white", p: 3 }}>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    image={`${API_BASE}${product.image}`}
                    sx={{ width: "150px", height: "150px", objectFit: "contain", mx: "auto" }}
                  />
                </Box>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
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
      </Box>
    </Box>
  );
}
