import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";

export const CommonButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  textTransform: "none",
  backgroundColor: "#503217",
  width: "fit-content",
  fontFamily: "Poppins, sans-serif", 
  fontWeight: 500,  
  
}));

export const CommonTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 500, 
  lineHeight: '120%',
  letterSpacing: "0%",
  color: "#503217",
}));
