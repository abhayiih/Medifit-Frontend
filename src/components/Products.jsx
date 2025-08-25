import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { CommonTypography, CommonButton } from "../components/CommonComponents";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

import product1 from "../assets/product1.svg";
import product2 from "../assets/product2.svg";
import product3 from "../assets/product3.svg";
import product4 from "../assets/product4.svg";
import product5 from "../assets/product5.svg";
import product6 from "../assets/product6.svg";
import product7 from "../assets/product7.svg";
import product8 from "../assets/product8.svg";
import p1 from "../assets/p1.svg";
import p2 from "../assets/p2.svg";
import p3 from "../assets/p3.svg";
import p4 from "../assets/p4.svg";
import nevulizer from "../assets/Nebulizer.svg";
import presser from "../assets/Pressure.svg";
import Divingmask from "../assets/Divingmask.svg";
import Temperature from "../assets/Temperature.svg";
import Hairtablets from "../assets/Hairtablets.svg";


const products = [
  { id: 1, title: "B12 medicine", price: "$19.00 USD", originalPrice: "$25.00 USD", image: product1 },
  { id: 2, title: "Tonometer", price: "$19.00 USD", originalPrice: "$30.00 USD", image: product2 },
  { id: 3, title: "ECG cardiograph", price: "$20.00 USD", originalPrice: "$30.00 USD", image: product3 },
  { id: 4, title: "Blood glucose meter", price: "$15.00 USD", originalPrice: "$25.00 USD", image: product4 },
  { id: 5, title: "Lab hand gloves", price: "$20.00 USD", originalPrice: "$25.00 USD", image: product5 },
  { id: 6, title: "Stethoscope", price: "$20.00 USD", originalPrice: "$28.00 USD", image: product6 },
  { id: 7, title: "Inhaler pressure drop", price: "$35.00 USD", originalPrice: "$40.00 USD", image: product7 },
  { id: 8, title: "Multi vitamin", price: "$20.00 USD", originalPrice: "$25.00 USD", image: product8 },
  { id: 9, title: "Microscope", price: "$45.00 USD", originalPrice: "$50.00 USD", image: p1, chip: "New" },
  { id: 10, title: "Pulse oximeter", price: "$19.00 USD", originalPrice: "$25.00 USD", image: p2, chip: "Save 10%" },
  { id: 11, title: "Vitamin serum", price: "$20.00 USD", originalPrice: "$30.00 USD", image: p3 },
  { id: 12, title: "High protein", price: "$50.00 USD", originalPrice: "$60.00 USD", image: p4, chip: "New" },
  { id: 13, title: "Hair tablets", price: "$19.00 USD", originalPrice: "$25.00 USD", image: Hairtablets },
  { id: 14, title: "Pressure measuring", price: "$25.00 USD", originalPrice: "$30.00 USD", image: presser },
  { id: 15, title: "Diving mask", price: "$40.00 USD", originalPrice: "$45.00 USD", image: Divingmask },
  { id: 16, title: "Temperature gun", price: "$20.00 USD", originalPrice: "$25.00 USD", image: Temperature },
  { id: 17, title: "Nebulizer mask", price: "$15.00 USD", originalPrice: "$18.00 USD", image: nevulizer },
];

export default function Products() {
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
          All Products
        </CommonTypography>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid key={product.id} sx={{ flex: "1 1 250px", maxWidth: 250 }}>
            <Card
              sx={{
                backgroundColor: "#EEEDE7",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                "&:hover .shop-btn": { opacity: 1 },
              }}
            >
              {/* Chip */}
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

              {/* White background for image */}
              <Box sx={{ backgroundColor: "white", p: 3 }}>
                <CardMedia
                  component="img"
                  alt={product.title}
                  image={product.image}
                  sx={{ width: "150px", height: "150px", objectFit: "contain", mx: "auto" }}
                />
              </Box>

              {/* Product Info */}
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontSize: "1.2rem" }}>
                  {product.title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1rem", mt: 1 }}>
                  {product.price}
                  <span style={{ textDecoration: "line-through", marginLeft: 8 }}>
                    {product.originalPrice}
                  </span>
                </Typography>

                {/* Shop Now button with id in URL */}
                <CommonButton
                  component={Link}
                  to={`/shop/${product.id}`}
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
  );
}


export { products };
