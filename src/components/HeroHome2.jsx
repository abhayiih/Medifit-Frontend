import { Box, Typography, Grid } from "@mui/material";
import heroImg from "../assets/hero-image.svg";
import heroImg2 from "../assets/hero-image2.svg";
import { CommonButton, CommonTypography } from "./CommonComponents"; // import your reusable button
import shop from "../assets/Shop.svg";
import { Link } from 'react-router-dom';

export default function HeroHome2() {
  return (
    <Box sx={{ backgroundColor: "#E8E6DE" }}>
      <Grid
        container
        spacing={6}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* LEFT CONTENT */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ ml: 11 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 0 }}>
            {/* Heading text */}
            <CommonTypography variant="h2" sx={{ ml: 16, size: "68px" }}>
              From wellness to <br /> care all in one place
            </CommonTypography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                alignItems: "center",
                ml: 16,
              }}
            >
              {/* Small image beside the text */}
              <Box>
                <img
                  src={heroImg2}
                  alt="Small Illustration"
                  style={{ width: 180, height: "auto", borderRadius: 8 }}
                />
              </Box>

              {/* Body text and button in a column */}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    maxWidth: 450,
                  }}
                >
                  Your health is in good hands with Medifit. We’re here to
                  provide you with a wide range of healthcare essentials,
                  carefully selected.
                </Typography>

                {/* Replace default Button with CommonButton */}
                <CommonButton
                  sx={{ mt: 3 }}
                  component={Link}
                  to="/products"
                  variant="contained"
                  startIcon={<img src={shop} alt="Logo" />}
                >
                  Shop now
                </CommonButton>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* RIGHT IMAGE */}
        <Grid>
          <Box sx={{ textAlign: "center" }}>
            <img
              src={heroImg}
              alt="Hero Illustration"
              style={{ width: "100%", maxWidth: 500 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
