import { Box } from "@mui/material";
import Company from "../assets/Company.svg";

export default function Companyy() {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        component="img"
        src={Company}
        alt="Company Logo"
        sx={{
          maxWidth: "100%", 
        }}
      />
    </Box>
  );
}
