import HeroHome1 from "../assets/HeroHome.svg";
import { Box, Grid, Typography } from "@mui/material";
import { CommonButton } from "./CommonComponents";
import shop from "../assets/Shop.svg";
import { Link } from "react-router-dom";

export default function HeroHome() {
  return (
    <Box
      sx={{
        backgroundColor: "background.color",
        height: "100vh",
        width: "85%",
        marginLeft: "auto",
        marginRight: 0,
        marginTop: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "relative",
        padding: 3,
      }}
    >
      <Grid container spacing={4} sx={{ width: "100%", maxWidth: 1200 }}>
        {/* LEFT CONTENT */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 300,
                fontSize: 52,
                color: "text.primary",
                mb: 3,
              }}
            >
              Your trusted <br />
              care now <br />
              and always
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                maxWidth: 420,
                fontSize: 18,
                mb: 3,
              }}
            >
              For the best results, align your health needs with your medication
              plan.
            </Typography>

            <CommonButton
              component={Link}
              to="/products"
              sx={{ fontSize: 16, padding: "10px 22px" }}
              variant="contained"
              startIcon={
                <img src={shop} alt="Logo" style={{ width: 22, height: 22 }} />
              }
            >
              Shop now
            </CommonButton>
          </Box>
        </Grid>

        {/* RIGHT IMAGE */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ textAlign: "left" }}>
            <img
              src={HeroHome1}
              alt="Hero Illustration"
              style={{ width: "100%", maxWidth: 500 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
