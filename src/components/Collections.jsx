import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import nevulizer from "../assets/Nebulizer.svg";
import presser from "../assets/Pressure.svg";
import Divingmask from "../assets/Divingmask.svg";
import Temperature from "../assets/Temperature.svg";
import Hairtablets from "../assets/Hairtablets.svg";
import { CommonButton, CommonTypography } from "../components/CommonComponents";
import RigthNav from "../assets/RigthNev.svg";
import { ShoppingCart } from "@mui/icons-material";

const products = [
  { id:13,title: "Hair tablets", price: "$19.00 USD", originalPrice: "$25.00 USD", image: Hairtablets },
  { id:14,title: "Pressure measuring", price: "$25.00 USD", originalPrice: "$30.00 USD", image: presser },
  { id:15,title: "Diving mask", price: "$40.00 USD", originalPrice: "$45.00 USD", image: Divingmask },
  { id:16,title: "Temperature gun", price: "$20.00 USD", originalPrice: "$25.00 USD", image: Temperature },
  { id:17,title: "Nebulizer mask", price: "$15.00 USD", originalPrice: "$18.00 USD", image: nevulizer },
  { id:17,title: "Nebulizer mask", price: "$15.00 USD", originalPrice: "$18.00 USD", image: nevulizer },
  { id:17,title: "Nebulizer mask", price: "$15.00 USD", originalPrice: "$18.00 USD", image: nevulizer },
];

export default function Collections() {
  const cardWidth = 320;
  const cardHeight = 340;

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "background.default",
        display: "flex",
        justifyContent: "center",
        
      }}
    >
      <Box  sx={{ maxWidth: 1090, width: "100%" }}>
        {/* First Row: Text Card + 2 product cards */}
        <Grid container spacing={8} justifyContent="flex-start">
          {/* Typography Card */}
          <Grid >
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
                backgroundColor:" #eeede7"
              }}
            >
              {/* Text section */}
              <Box>
                <CommonTypography variant="h4" sx={{ lineHeight: 1.4, mb: 3 }}>
                  Discover our collection
                </CommonTypography>
                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.2 }}>
                  Our medical store offers trusted products, easy navigation, and fast shipping.
                </Typography>
              </Box>

              {/* Button at bottom */}
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
          {products.map((product, index) => (
            <Grid item key={index}>
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
                    image={product.image}
                    sx={{ width: "150px", height: "150px", objectFit: "contain", mx: "auto" }}
                  />
                </Box>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {product.price}
                    <span style={{ textDecoration: "line-through", marginLeft: 8 }}>
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
