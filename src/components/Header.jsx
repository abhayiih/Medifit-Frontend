import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/medifit-logo.svg";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom"; 

export default function Header() {
  return (
    <AppBar
      position="static"
      color="white"
      
    >
      <Toolbar sx={{justifyContent: "space-between"  ,  backgroundColor: "white"}}>
        {/* Logo + Text */}
        <Box sx={{ display: "flex", alignItems: "center"}}>
          <img src={Logo} alt="Medifit Logo" style={{ width: 60, height: 37 }} />
          <Typography variant="h4" sx={{ ml: -1 }}>
            Medifit
          </Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: {md: "flex" }, alignItems: "center", gap: 3 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button color="primary">Home</Button>
          </Link>
          <Link to="/home2" style={{ textDecoration: "none" }}>
            <Button color="primary">Home2</Button>
          </Link>
          <Link to="/shop" style={{ textDecoration: "none" }}>
            <Button color="primary">Shop</Button>
          </Link>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <Button color="primary">About</Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Button color="primary">Contact</Button>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <Button color="primary">Products</Button>
          </Link>
        </Box>

        {/* Icons */}
        <Box>
          <IconButton>
            <SearchIcon color="primary" />
          </IconButton>
          <IconButton>
            <ShoppingCartIcon color="primary" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
