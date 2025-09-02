import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Typography,
  Badge,
  Menu,
  MenuItem,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/medifit-logo.svg";
import { useState, useEffect, useRef } from "react";
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

  // Search field state
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

const handleSearchIconClick = () => {
  setShowSearch((prev) => {
    if (prev) {
      setSearchTerm("");
      window.dispatchEvent(new CustomEvent("searchUpdated", { detail: "" }));
    }
    return !prev;
  });
};


  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Send search term to Products page
    window.dispatchEvent(new CustomEvent("searchUpdated", { detail: term }));
  };

  // Auto focus search field when opened
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  //  Clear search when leaving /products
  useEffect(() => {
    if (location.pathname !== "/products") {
      setSearchTerm(""); // clear the text
      setShowSearch(false); // hide the input
      //Products page to reset its filter
      window.dispatchEvent(new CustomEvent("searchUpdated", { detail: "" }));
    }
  }, [location.pathname]);

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
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={Logo} alt="Logo" style={{ width: 60, height: 37 }} />
          <Typography variant="h4" sx={{ ml: -1 }}>
            Medifit
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {[
            { path: "/", label: "Home" },
            { path: "/info", label: "Info" },
            { path: "/shop", label: "Shop" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
            { path: "/products", label: "Products" },
          ].map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link key={path} to={path} style={{ textDecoration: "none" }}>
                <Button
                  color="primary"
                  sx={{ fontWeight: isActive ? "bold" : "normal" }}
                >
                  {label}
                </Button>
              </Link>
            );
          })}

          {user?.isAdmin && (
            <Link to="/users" style={{ textDecoration: "none" }}>
              <Button
                color="primary"
                sx={{
                  fontWeight: location.pathname === "/users" ? "bold" : "normal",
                }}
              >
                Manage Users
              </Button>
            </Link>
          )}
        </Box>

        {/* Right side actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Search Icon & Input (only on products page) */}
          {location.pathname === "/products" && (
            <>
              <IconButton onClick={handleSearchIconClick}>
                <SearchIcon color="primary" />
              </IconButton>
              {showSearch && (
                <InputBase
                  inputRef={searchInputRef}
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  sx={{
                    ml: 1,
                    p: "2px 8px",
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    width: 200,
                    backgroundColor: "#f5f5f5",
                  }}
                />
              )}
            </>
          )}

          {/* Cart */}
          <IconButton component={Link} to="/cart">
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon color="primary" />
            </Badge>
          </IconButton>

          {/* Username */}
          {isLoggedIn && (
            <Typography
              variant="body2"
              sx={{ mr: 2, fontWeight: "bold", color: "black" }}
            >
              Hello, {username}
            </Typography>
          )}

          {/* Hamburger Menu */}
          <IconButton onClick={handleMenuOpen}>
            <MenuIcon color="primary" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleAuthClick}>
              {isLoggedIn ? "Logout" : "Login"}
            </MenuItem>
            <MenuItem onClick={handleOrderClick}>Orders</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
