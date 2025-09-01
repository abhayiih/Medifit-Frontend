import { AppBar, Toolbar, IconButton, Box, Button, Typography, Badge, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/medifit-logo.svg";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // For menu open/close
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Load user & token on mount
  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userJSON && token) {
      const userObj = JSON.parse(userJSON);
      setIsLoggedIn(true);
      setUsername(userObj.username || "");
      setUser(userObj);
      fetchCartCount(token);
    }
  }, []);

  const fetchCartCount = async (token) => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartCount(data.items?.length || 0);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleLogout();
      } else {
        console.error("Failed to fetch cart count:", err);
      }
    }
  };

  useEffect(() => {
    const updateCartCount = () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      fetchCartCount(token);
    };

    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setUsername("");
        setUser(null);
        setCartCount(0);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    setUser(null);
    setCartCount(0);
    navigate("/");
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      navigate("/login");
    }
    handleMenuClose();
  };

  const handleOrderClick = () => {
    navigate("/orders");
    handleMenuClose();
  };

  return (
    <AppBar position="static" color="white">
      <Toolbar sx={{ justifyContent: "space-between", backgroundColor: "white" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={Logo} alt="Logo" style={{ width: 60, height: 37 }} />
          <Typography variant="h4" sx={{ ml: -1 }}>Medifit</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {[
            { path: "/", label: "Home" },
            { path: "/home2", label: "Info" },
            { path: "/shop", label: "Shop" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
            { path: "/products", label: "Products" },
          ].map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link key={path} to={path} style={{ textDecoration: "none" }}>
                <Button color="primary" sx={{ fontWeight: isActive ? "bold" : "normal" }}>{label}</Button>
              </Link>
            );
          })}

          {user?.isAdmin && (
            <Link to="/users" style={{ textDecoration: "none" }}>
              <Button color="primary" sx={{ fontWeight: location.pathname === "/users" ? "bold" : "normal" }}>
                Manage Users
              </Button>
            </Link>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton><SearchIcon color="primary" /></IconButton>

          <IconButton component={Link} to="/cart">
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon color="primary" />
            </Badge>
          </IconButton>

          {isLoggedIn && (
            <Typography variant="body2" sx={{ mr: 2, fontWeight: "bold", color: "black" }}>
              Hello, {username}
            </Typography>
          )}

          {/* Hamburger Menu */}
          <IconButton onClick={handleMenuOpen}>
            <MenuIcon color="primary" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleAuthClick}>{isLoggedIn ? "Logout" : "Login"}</MenuItem>
            <MenuItem onClick={handleOrderClick}>Orders</MenuItem>
            
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
