import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  TextField, 
  Button, 
  InputAdornment 
} from "@mui/material";
import { CommonTypography, CommonButton } from "../components/CommonComponents"; 
import { Email, ShoppingCart } from "@mui/icons-material";
import product1 from "../assets/product1.svg";
import product2 from "../assets/product2.svg";
import product3 from "../assets/product3.svg";
import product4 from "../assets/product4.svg";
import product5 from "../assets/product5.svg";
import product6 from "../assets/product6.svg";
import product7 from "../assets/product7.svg";
import product8 from "../assets/product8.svg";
import newsletterImg from "../assets/newsletterImg.svg";
import outside from '../assets/outside.svg';
import { Link } from "react-router-dom";

const products = [
  { id:1,
    title: "B12 medicine", price: "$19.00 USD", originalPrice: "$25.00 USD", image: product1 },
  { id:2,title: "Tonometer", price: "$19.00 USD", originalPrice: "$30.00 USD", image: product2 },
  {id:3, title: "ECG cardiograph", price: "$20.00 USD", originalPrice: "$30.00 USD", image: product3 },
  {id:4, title: "Blood glucose meter", price: "$15.00 USD", originalPrice: "$25.00 USD", image: product4 },
  { id:5,title: "Lab hand gloves", price: "$20.00 USD", originalPrice: "$25.00 USD", image: product5 },
  { id:6,title: "Stethoscope", price: "$20.00 USD", originalPrice: "$28.00 USD", image: product6 },
  {id:7, title: "Inhaler pressure drop ", price: "$35.00 USD", originalPrice: "$40.00 USD", image: product7 },
  {id:8, title: "Multi vitamin", price: "$20.00 USD", originalPrice: "$25.00 USD", image: product8 },
  {id:8, title: "Multi vitamin", price: "$20.00 USD", originalPrice: "$25.00 USD", image: product8 },
];

export default function Store() {
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

      {/* First Row */}
      <Grid container spacing={4} maxWidth='1100px' justifyContent="flex-start">
        {products.map((product, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card 
              sx={{ 
                backgroundColor: "#EEEDE7", 
                width: 250,
                height: 340, 
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                "&:hover .shop-btn": { opacity: 1 }, // button appears on hover
              }}
            >
              {/* White background for image */}
              <Box sx={{ backgroundColor: "white", p: 3 }}>
                <CardMedia
                  component="img"
                  alt={product.title}
                  image={product.image}
                  sx={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    mx: "auto"
                  }}
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
          mx: 0 
        }}
      >
        {/* Left Half - Image */}
        <Box sx={{ flex: 1 }}>
          <Box
            component="img"
            src={newsletterImg}
            alt="newsletter"
            sx={{ width: "100%", height: "auto" }}
          />
        </Box>

        {/* Right Half - Text & Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            mt: 5
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
