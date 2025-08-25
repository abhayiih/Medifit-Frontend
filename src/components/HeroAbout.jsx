import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import About1 from "../assets/About1.svg";
import About2 from "../assets/About2.svg";
import About3 from "../assets/About3.svg";
import { CommonTypography } from "./CommonComponents";

// Container
const HeroContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: 1200,
  margin: "0 auto",
  padding: theme.spacing(8, 2),
  textAlign: "center",
}));

// Images wrapper
const ImageRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start", // <-- aligns all images by their bottom edge
  gap: theme.spacing(4),
  marginTop: theme.spacing(6),
}));

export default function HeroAbout() {
  return (
    <HeroContainer>
      {/* Heading */}
      <CommonTypography
        variant="h2"
        sx={{
          marginBottom: 2,
        }}
      >
        Health products you can trust <br />
        service you deserve
      </CommonTypography>

      {/* 3 Images */}
      <ImageRow>
        <img
          src={About1}
          alt="About 1"
          style={{
            width: 220,
            height: 280,
            objectFit: "cover",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
        <img
          src={About2}
          alt="About 2"
          style={{
            width: 320,
            height: 400,
            objectFit: "cover",
            borderRadius: "16px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
          }}
        />
        <img
          src={About3}
          alt="About 3"
          style={{
            width: 220,
            height: 280,
            objectFit: "cover",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
      </ImageRow>
    </HeroContainer>
  );
}
