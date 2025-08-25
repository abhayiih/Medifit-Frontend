import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { CommonTypography } from "./CommonComponents";

// Card container styling
const Card = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "16px",
  padding: theme.spacing(4),
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "center",
  height: "100%",
}));

// Wrapper container
const SectionContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  padding: theme.spacing(8, 2),
}));

export default function MVCards() {
  const items = [
    {
      title: "Mission",
      description:
        "To provide trusted, high-quality health products that nurture wellness and support people across all stages of life.",
    },
    {
      title: "Vision",
      description:
        "To be a global leader in holistic well-being, empowering healthier communities through innovation and care.",
    },
    {
      title: "Commitments",
      description:
        "We commit to transparency, sustainability, and excellence — ensuring that every product reflects our values of integrity and trust.",
    },
  ];

  return (
    <SectionContainer>
      <Grid container spacing={4}>
        {items.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CommonTypography
                variant="h4"
                sx={{ fontWeight: 700, color: "#503217", marginBottom: 2 }}
              >
                {item.title}
              </CommonTypography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "16px",
                  color: "#503217",
                  lineHeight: "1.6",
                  fontWeight: 400,
                }}
              >
                {item.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}
