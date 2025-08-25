import { createTheme } from "@mui/material/styles";

const colorChange = "#503217";

const theme = createTheme({
  palette: {
    primary: {
      main: colorChange,  
    },
    secondary: {
      main: "#EEEDE7",
    },
    background: {
      default: "#EEEDE7", 
      paper: "#f0ede0ff", 
      color: "#E8E6DE",
      footer: "#E2DFCF"
    },
    // common : {
    //   white : {
    //     100 : ''
    //   }
    // }, 
    text: {
      primary: colorChange,
    },
  },
  typography: {
   fontFamily: "Poppins, sans-serif",
   
    h4: {
      fontWeight: 500,
      color: colorChange,
    },
    h6: {
      fontWeight: 600,
      color: colorChange,
    },
    body2: {
      lineHeight: 1.6,
      color: colorChange,
    },
  },
});

export default theme;
