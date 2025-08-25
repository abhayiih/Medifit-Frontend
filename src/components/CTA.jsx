import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import img1 from "../assets/cta1.svg"; 
import img2 from "../assets/cta2.svg";
import img3 from "../assets/cta3.svg";
import img4 from "../assets/cta4.svg";
import outside from '../assets/outside.svg';
import { CommonButton } from "./CommonComponents"; 


const CommonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  paddingTop: theme.spacing(8),  
  paddingBottom: theme.spacing(10), 
}));

export default function CTA() {
  return (
    <CommonBox>
      <Box
        sx={{
          width: "85%",         
          maxWidth: 1000,
          backgroundColor: "white",
          borderRadius: 2.5,
          px: { xs: 4, md: 6 }, 
          py: { xs: 6, md: 8 }, 
        }}
      >
        <Grid container spacing={6} alignItems="center">
          {/* Left text content */}
          <Grid
            size={{ xs: 12, md: 6 }} 
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "36px", 
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#5A3A1E" }}
            >
              Join our trustable Medifit product community
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: "#5A3A1E", maxWidth: 560 }}
            >
              Join us as we build a community where wellness is accessible, 
              education is empowering, and health is a shared journey.
            </Typography>

            <CommonButton 
              variant="contained" 
              endIcon={<img src={outside} alt="Logo" style={{ width: 28, height: 28 }} />}
              sx={{ fontSize: "1.05rem", py: 1.3, px: 3.5 }}
            >
              Get Started
            </CommonButton>
          </Grid>

          {/* Right image block */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: 2.5, // Slightly bigger gap between images
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Box component="img" src={img1} alt="cta img1" sx={{ width: "82%", height: "auto" }} />
            <Box component="img" src={img2} alt="cta img2" sx={{ width: "82%", height: "auto", mt: -6, ml: -7 }} />
            <Box component="img" src={img3} alt="cta img3" sx={{ width: "82%", height: "auto", mt: -3 }} />
            <Box component="img" src={img4} alt="cta img4" sx={{ width: "82%", height: "auto", mt: -8, ml: -6 }} />
          </Grid>
        </Grid>
      </Box>
    </CommonBox>
  );
}
