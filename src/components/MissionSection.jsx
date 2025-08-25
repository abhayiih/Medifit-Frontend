import * as React from "react";
import { Box, Grid, Stack, Card, CardMedia } from "@mui/material";
import { CommonTypography } from "./CommonComponents"; // using your custom Typography
import Mission from "../assets/Mission.svg";
import m1 from "../assets/m1.svg";
import m2 from "../assets/m2.svg";
import m3 from "../assets/m3.svg";

export default function MissionSection({
  title = "What to Expect When You Join Our Team",
  imageSrc = Mission,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#E8E6DE",
        py: { xs: 4, sm: 8 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Heading using CommonTypography */}
        <CommonTypography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: { xs: 3, sm: 12 },
            textAlign: "left",
            pl: { xs: 1, sm: 4 },
            fontSize: { xs: "2rem", sm: "2.5rem" },
          }}
        >
          {title}
        </CommonTypography>

        {/* Second Row */}
        <Grid container spacing={0} justifyContent="flex-start">
          {/* Column 1: Mission / Commitment / Vision */}
          <Grid size={{ xs: 12, sm: 3 }} sx={{ pr: { xs: 0, sm: 4 } }}>
            <Stack spacing={{ xs: 2.5, sm: 3.5 }} sx={{ pl: { xs: 1, sm: 2 } }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <img src={m1} alt="Mission Icon" style={{ width: 36, height: 36 }} />
                <CommonTypography sx={{ fontWeight: 700, fontSize: { xs: "1.8rem", sm: "2.5rem" } }}>
                  Mission
                </CommonTypography>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <img src={m2} alt="Commitment Icon" style={{ width: 36, height: 36 }} />
                <CommonTypography sx={{ fontWeight: 700, fontSize: { xs: "1.8rem", sm: "2.5rem" } }}>
                  Commitment
                </CommonTypography>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <img src={m3} alt="Vision Icon" style={{ width: 36, height: 36 }} />
                <CommonTypography sx={{ fontWeight: 700, fontSize: { xs: "1.8rem", sm: "2.5rem" } }}>
                  Vision
                </CommonTypography>
              </Stack>
            </Stack>
          </Grid>

          {/* Column 2: Image */}
          <Grid size={{ xs: 12, sm: 3 }} sx={{ px: { xs: 0, sm: 4 } }}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                width: "100%",
                maxWidth: 280,
                mx: "auto",
              }}
            >
              <CardMedia
                component="img"
                src={imageSrc}
                alt="Wellness"
                sx={{ width: "100%", height: { xs: 200, sm: 220 }, objectFit: "cover" }}
              />
            </Card>
          </Grid>

          {/* Column 3: Text aligned to bottom */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: { xs: "auto", sm: 220 },
                mt: { xs: 2, sm: 0 },
              }}
            >
              <CommonTypography
                sx={{
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  maxWidth: { xs: "100%", sm: 480 },
                }}
              >
                We're committed to supporting your health journey by offering
                valuable educational resources, wellness insights, and expert advice
                to help you make informed decisions.
              </CommonTypography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
