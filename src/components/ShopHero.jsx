import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, TextField } from "@mui/material";
import { CommonButton } from "../components/CommonComponents";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { products } from "./Products"; 

export default function ShopHero() {
  const { id } = useParams(); 
  const defaultProduct = products[0]; 
  const product = id ? products.find((p) => p.id === Number(id)) : defaultProduct;

  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Box justifyContent="center" alignItems="center" sx={{ display: "flex", flexDirection: "column", py: 10, px: 4 }}>
      <Box sx={{ maxWidth: 1000, width: "100%" }}>
        <Grid container spacing={6} alignItems="flex-start">
          {/* Left Image */}
          <Grid size={{ xs: 12, sm: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{
                  width: 400,
                  height: 400,
                  objectFit: "contain",
                  borderRadius: 3,
                }}
              />
            </Box>
          </Grid>

          {/* Right Content */}
          <Grid size={{ xs: 12, sm: 7 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "flex-start" }}>
              {/* Title */}
              <Typography variant="h4" fontWeight="bold" sx={{ fontSize: "2.5rem", lineHeight: 1.2 }}>
                {product.title}
              </Typography>

              {/* Price */}
              <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "2rem" }}>
                  {product.price}
                </Typography>
                <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary", fontSize: "1.5rem" }}>
                  {product.originalPrice}
                </Typography>
              </Box>

              {/* Quantity + Add to Cart */}
              <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                <TextField
                  size="medium"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
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
                <CommonButton
                  variant="contained"
                  endIcon={<ShoppingCartIcon sx={{ fontSize: 28 }} />}
                  sx={{ height: 60, fontSize: "1.25rem", paddingX: 4 }}
                >
                  Add to Cart
                </CommonButton>
              </Box>

              {/* Description */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: "1.5rem", mb: 1 }}>
                  Product Description
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
                  {product.title} is a premium product that meets your needs. Perfect for daily use and ensures top quality.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
