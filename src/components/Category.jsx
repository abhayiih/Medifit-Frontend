import { Box, Typography, Card, Grid } from "@mui/material";
import { styled } from "@mui/system";
import yellowjar from "../assets/yellowjar.svg";
import greenjar from "../assets/greenjar.svg";
import orangejar from "../assets/orangejar.svg";
import bluejar from "../assets/bluejar.svg";
import CTAImage1 from "../assets/CTAImage1.svg";
import CTAImage2 from "../assets/CTAImage2.svg";
import { CommonButton, CommonTypography } from "./CommonComponents";
import RigthNav from "../assets/RigthNev.svg";
import { Link } from "react-router-dom";

import capsule from "../assets/capsule.svg";
import heartbeat from "../assets/heartbeat.svg";
import leaf from "../assets/leaf.svg";
import heart from "../assets/heart.svg";

const categories = [
  { id: 1, logo: yellowjar, label: "Health Care", icon: heart },
  { id: 2, logo: greenjar, label: "Beauty Care", icon: leaf },
  { id: 3, logo: orangejar, label: "Fitness", icon: heartbeat },
  { id: 4, logo: bluejar, label: "Medicine", icon: capsule },
];


const CategoryBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "#E8E6DE",
  paddingTop: theme.spacing(12),

  paddingBottom: theme.spacing(8),
  marginTop: theme.spacing(6),  
}));

const CategoriesGrid = styled(Grid)(({ theme }) => ({
  marginLeft: theme.spacing(19),
  marginRight: theme.spacing(19),
}));

const CTAImagesGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    marginBottom: 0,
  },
}));

const CTATextGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

const Category = () => {
  return (
    <CategoryBox>
      <CommonTypography variant="h4" sx={{ mb: { xs: 3, sm: 4 } }}>
        Shop by category
      </CommonTypography>

      <CategoriesGrid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {categories.map((category) => (
          <Grid key={category.id} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex", justifyContent: "center" }}>
            <Card
              sx={(theme) => ({
                width: { xs: "100%", sm: 260 },
                display: "flex",
                alignItems: "stretch",
                textAlign: "center",
                p: 2,
                borderRadius: "20px",
                backgroundColor: "#ffffff",
                boxShadow: 2,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              })}
            >
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <Box component="img" src={category.icon} alt={category.label} sx={{ width: 40, height: 40 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {category.label}
                </Typography>
              </Box>

              <Box sx={{ width: "50%", height: "100%", display: "flex" }}>
                <img
                  src={category.logo}
                  alt={category.label}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </CategoriesGrid>

      <Grid container spacing={{ xs: 3, sm: 6 }} sx={{ mt: { xs: 6, sm: 8 }, px: { xs: 2, sm: 6, md: 12 } }} alignItems="center" justifyContent="center">
        <CTAImagesGrid size={{ xs: 12, md: 6 }}>
          <Box sx={{ width: { xs: "90%", sm: "80%", md: "400px", lg: "450px" }, position: "relative" }}>
            <img src={CTAImage1} alt="Promotion 1" style={{ width: "100%", borderRadius: "12px", display: "block" }} />
            <img
              src={CTAImage2}
              alt="Promotion 2"
              style={{
                position: "absolute",
                top: "30%",
                right: "-30%",
                width: "70%",
                borderRadius: "12px",
                transform: "translateY(-20%)",
              }}
            />
          </Box>
        </CTAImagesGrid>

        <CTATextGrid size={{ xs: 12, md: 6 }}>
          <CommonTypography variant="h4" sx={{ mb: 2, fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2rem" } }}>
            Save up to 10% on select tablets!
          </CommonTypography>

          <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" } }}>
            Don't miss out on our limited-time sale! Get 10% discount on a wide range of essential health products.
          </Typography>
          <CommonButton  component={Link}
                     to={'/products'} variant="contained" endIcon={<img src={RigthNav} alt="Logo" />}>
            View sale products
          </CommonButton>
        </CTATextGrid>
      </Grid>
    </CategoryBox>
  );
};

export default Category;
