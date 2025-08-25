import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { CommonTypography } from "../components/CommonComponents";

import truckfast from "../assets/truck-fast.svg";
import exchangedollar from "../assets/exchange-dollar.svg";
import headphonemic from "../assets/headphone-mic.svg";
import creditcard from "../assets/credit-card.svg";

// Styled box for each feature
export const FeatureBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  flex: 1,
  minWidth: 120,
}));

// Main FeatureIcons component
export default function FeatureIcons() {
  const features = [
    { src: truckfast, text: "Free Shipping" },
    { src: exchangedollar, text: "Easy Refund" },
    { src: headphonemic, text: "Online Support" },
    { src: creditcard, text: "Flexible Payment" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 4,
        flexWrap: "wrap",
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        mt: 15,
        mb: 8,
      }}
    >
      {features.map((item, idx) => (
        <FeatureBox key={idx}>
          <img
            src={item.src}
            alt={item.text}
            style={{ width: 40, height: 40 }}
          />
          <CommonTypography variant="h6" sx={{ mt: 2 }}>
            {item.text}
          </CommonTypography>
        </FeatureBox>
      ))}
    </Box>
  );
}
