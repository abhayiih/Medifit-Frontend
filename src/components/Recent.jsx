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
import p1 from "../assets/p1.svg";
import p2 from "../assets/p2.svg";
import p3 from "../assets/p3.svg";
import p4 from "../assets/p4.svg";
import { CommonTypography, CommonButton } from "../components/CommonComponents";

const products = [
  {
    id: 9,
    title: "Microscope",
    price: "$45.00 USD",
    originalPrice: "$50.00 USD",
    image: p1,
    chip: "New",
  },
  {
    id: 10,
    title: "Pulse oximeter",
    price: "$19.00 USD",
    originalPrice: "$25.00 USD",
    image: p2,
    chip: "Save 10%",
  },
  {
    id: 11,
    title: "Vitamin serum",
    price: "$20.00 USD",
    originalPrice: "$30.00 USD",
    image: p3,
    chip: null,
  },
  {
    id: 12,
    title: "High protein",
    price: "$50.00 USD",
    originalPrice: "$60.00 USD",
    image: p4,
    chip: "New",
  },
];

export default function Recent({ title = "Products" }) {
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "background.default",
        textAlign: "center",
      }}
    >
      {/* Title Centered */}
      <Box sx={{ mb: 4 }}>
        <CommonTypography variant="h4">{title}</CommonTypography>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={4} justifyContent="center">
        {products.map((product, index) => (
          <Grid item key={index} sx={{ flex: "1 1 250px", maxWidth: 250 }}>
            <Card
              sx={{
                backgroundColor: "#EEEDE7",
                position: "relative",
                overflow: "hidden",
                "&:hover .shop-btn": { opacity: 1 },
              }}
            >
              {/* Chip (badge) */}
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

              {/* White background only for image */}
              <Box sx={{ backgroundColor: "white", p: 2 }}>
                <CardMedia
                  component="img"
                  alt={product.title}
                  image={product.image}
                  sx={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                    mx: "auto",
                  }}
                />
              </Box>

              {/* Product Info Section (keeps beige color) */}
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {product.price}
                  <span
                    style={{ textDecoration: "line-through", marginLeft: 8 }}
                  >
                    {product.originalPrice}
                  </span>
                </Typography>

                <CommonButton
                  component={Link}
                  to={`/shop/${product.id}`}
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
