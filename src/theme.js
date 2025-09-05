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


  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "customContained" },
          style: {
            borderRadius: 8,
            backgroundColor: "#8bbea1ff",
            color: "#000000ff",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            "&:hover": {
              boxShadow: "0px 0px 5px 2px currentColor", 
            },
          },
        },
        {
          props: { variant: "customOutlined" },
          style: {
            borderRadius: 8,
            backgroundColor: "#e8a0a0ff",
            border: `2px solid #000000ff`,
            color: "#000000ff",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          },
        },
      ],
    },
  },
});

export default theme;
