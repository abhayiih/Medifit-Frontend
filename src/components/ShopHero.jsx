import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const API_BASE = "http://localhost:5000";

export default function ShopHero() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/products`);
        // Find the product matching the URL id or default to first
        const selected = data.find(p => p._id === id) || data[0];
        setProduct(selected);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const addToCart = async () => {
    try {
      const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;
      if (!user || !user.token) return alert("Please login to add products to the cart");

      await axios.post(
        `${API_BASE}/api/cart/add`,
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Dispatch global event
      window.dispatchEvent(new CustomEvent("cartUpdated"));

      alert("Product added to cart!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while adding to cart");
    }
  };

  if (!product) return <Typography>Loading product...</Typography>;

  return (
    <Box justifyContent="center" alignItems="center" sx={{ display: "flex", flexDirection: "column", py: 10, px: 4 }}>
      <Box sx={{ maxWidth: 1000, width: "100%" }}>
        <Grid container spacing={6} alignItems="flex-start">
          <Grid size={{ xs: 12, sm: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                src={product.image ? `${API_BASE}${product.image}` : "/placeholder.png"}
                alt={product.title}
                sx={{ width: 400, height: 400, objectFit: "contain", borderRadius: 3 }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 7 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography variant="h4" fontWeight="bold">{product.title}</Typography>

              <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                <Typography variant="h5" fontWeight="bold">₹{product.price.toFixed(2)}</Typography>
                <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                  ₹{product.originalPrice.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                <TextField
                  size="medium"
                  value={quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1) setQuantity(val);
                  }}
                  sx={{ width: 120, "& input": { fontSize: "1.2rem", textAlign: "center" } }}
                  InputProps={{
                    endAdornment: (
                      <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
                        <ArrowDropUp sx={{ cursor: "pointer", fontSize: 36 }} onClick={increment} />
                        <ArrowDropDown sx={{ cursor: "pointer", fontSize: 36 }} onClick={decrement} />
                      </Box>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  endIcon={<ShoppingCartIcon />}
                  sx={{ height: 60, fontSize: "1.25rem", paddingX: 4 }}
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight="bold">Product Description</Typography>
                <Typography variant="body2">
                  {product.description || `${product.title} is a premium product that meets your needs.`}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
