import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/system";

import reviewer1 from "../assets/reviewer1.svg";
import reviewer2 from "../assets/reviewer2.svg";
import reviewer3 from "../assets/reviewer3.svg";
import message from "../assets/message.svg";
import { CommonTypography } from "./CommonComponents";


export const CommonGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(3),
  flexWrap: "wrap",
}));


export const CommonCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  width: 300,
  minHeight: 120,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  backgroundColor: "#fff",
  gap: theme.spacing(1),
}));

export default function Review() {
  const reviews = [
    {
      name: "Olivia Garcia",
      avatar: reviewer1,
      quote:
        "B12 Medicine keeps me energized and focused all day. A true lifesaver for vitality and wellness!",
    },
    {
      name: "Shopia Brown",
      avatar: reviewer2,
      quote:
        "I’ve regained my energy and feel amazing thanks to B12 Medicine. Highly recommend for health and stamina!",
    },
    {
      name: "Ethan Harris",
      avatar: reviewer3,
      quote:
        "As a vegetarian, B12 Medicine keeps my energy up and my health on track. Perfect for natural support!",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "background.default", py: 6 }}>
      {/* Section Heading */}
      <CommonTypography variant="h4" sx={{ textAlign: "center", mb: 5 }}>
        Customers Review
      </CommonTypography>

      {/* Reviews Row */}
      <CommonGrid>
        {reviews.map((review, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {/* Quote inside card */}
            <CommonCard>
              <Box
                component="img"
                src={message}
                alt="message icon"
                sx={{ width: 20, height: 20 }}
              />

              <Typography
                variant="body2"
                sx={{ color: "text.primary", fontSize: 14, fontStyle: "italic" }}
              >
                “{review.quote}”
              </Typography>
            </CommonCard>

            {/* Name & Avatar below card */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Avatar src={review.avatar} alt={review.name} sx={{ width: 32, height: 32 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {review.name}
              </Typography>
            </Box>
          </Box>
        ))}
      </CommonGrid>
    </Box>
  );
}
