import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { CommonTypography } from "../components/CommonComponents";
import truckfast from "../assets/truck-fast.svg";
import exchangedollar from "../assets/exchange-dollar.svg";
import headphonemic from "../assets/headphone-mic.svg";
import creditcard from "../assets/credit-card.svg";

export const CommonFeatureContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 1100,
  margin: "0 auto",
  gap: theme.spacing(8),
  flexWrap: "wrap",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(7),
}));

export const FeatureBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  flex: 1,
  minWidth: 120,
}));

const HeadingInfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row", // keep side by side
  justifyContent: "flex-start",
  alignItems: "center",
  gap: theme.spacing(8), // bigger gap
  marginBottom: theme.spacing(4),
  width: "100%",
  flexWrap: "nowrap",
  textAlign: "left",
}));

export default function AboutUs() {
  const features = [
    { src: truckfast, text: "Free Shipping" },
    { src: exchangedollar, text: "Easy Refund" },
    { src: headphonemic, text: "Online Support" },
    { src: creditcard, text: "Flexible Payment" },
  ];

  return (
    <CommonFeatureContainer>
      {/* Heading + Info */}
      <HeadingInfoContainer>
        <CommonTypography
          variant="h3"
          sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
        >
          About Us
        </CommonTypography>
        <CommonTypography
          variant="h3"
          sx={{
            fontWeight: 400, // lighter than heading
            fontFamily: "Poppins, sans-serif",
            fontSize: "40px",
            lineHeight: "120%",
            letterSpacing: "0%",
            color: "#503217", // ⬅️ applied requested color
            flex: 1,
          }}
        >
          Our focus is on nurturing wellness and empowering health for all ages
          well being for people worldwide.
        </CommonTypography>
      </HeadingInfoContainer>

      {/* Feature Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
          flexWrap: "wrap",
          width: "100%",
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
    </CommonFeatureContainer>
  );
}
