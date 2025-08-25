import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Story from "../assets/OurStory.svg";
import LeafLogo from "../assets/leaflogo.svg";
import PharmacyLogo from "../assets/pharmacylogo.svg";
import HandshakeLogo from "../assets/handshakelogo.svg";
import ShieldLogo from "../assets/shieldlogo.svg";
import Clock from "../assets/Clock.svg";
import { CommonButton, CommonTypography } from "./CommonComponents";


export const CommonBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  padding: theme.spacing(4),
  marginLeft: theme.spacing(6),
  marginRight: theme.spacing(6),
  display: "flex",
  alignItems: "stretch",
}));

export default function OurStory() {
  return (
    <Box sx={{ px: 12, py: 12 }}>
      {/* Our Story Section */}
      <CommonBox sx={{ mb: 12 }}>
        {/* LEFT CONTENT */}
        <Box sx={{ p: 4 }}>
          <CommonTypography variant="h4" sx={{ fontSize: 48 }}>
            Bringing trusted health solutions to your doorstep focused on
            quality care & reliability
          </CommonTypography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              maxWidth: 450,
              mb: 3,
            }}
          >
            Our store offers a comprehensive range of pharmaceuticals, health
            and wellness products, and medical supplies to meet the diverse
            needs of our community.
          </Typography>

          <CommonButton
            variant="contained"
            endIcon={<img src={Clock} alt="Logo" />}
          >
            Our story
          </CommonButton>
        </Box>

        {/* RIGHT IMAGE */}
        <Box sx={{ flex: 1, textAlign: "center", height: "100%" }}>
          <img
            src={Story}
            alt="Hero Illustration"
            style={{
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </CommonBox>

      {/* Contact Section with Logos */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 1100,
          margin: "0 auto",
          gap: 4,
        }}
      >
        {[
          { src: LeafLogo, text: "Thoughtfully Made" },
          { src: PharmacyLogo, text: "Non-Toxic Formula" },
          { src: HandshakeLogo, text: "Organic Essentials" },
          { src: ShieldLogo, text: "Safe for Everyone" },
        ].map((item, idx) => (
          <Box key={idx} sx={{ textAlign: "center", flex: 1 }}>
            <img
              src={item.src}
              alt={item.text}
              style={{ width: 40, height: 40 }}
            />
            <CommonTypography variant="h6" sx={{ mt: 2 }}>
              {item.text}
            </CommonTypography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
