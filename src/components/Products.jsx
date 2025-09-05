import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  Button,
} from "@mui/material";
import { CommonTypography, CommonButton } from "../components/CommonComponents";
import { ShoppingCart, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5000";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [discount, setDiscount] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/products`);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/categories`);
        setCategories(response.data.map((c) => c.name));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);
  
  // Fetch admin discount
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        if (!user?.isAdmin) return;
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_BASE}/api/admin/discount`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDiscount(data.rate);
      } catch (err) {
        console.error("Failed to fetch discount:", err);
      }
    };
    fetchDiscount();
  }, []);

  // Fetch admin platform fee
  useEffect(() => {
    const fetchPlatformFee = async () => {
      try {
        if (!user?.isAdmin) return;
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_BASE}/api/admin/platform-fee`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlatformFee(data.rate);
      } catch (err) {
        console.error("Failed to fetch platform fee:", err);
      }
    };
    fetchPlatformFee();
  }, []);

  // Listen for search input from Header
  useEffect(() => {
    const handleSearch = (e) => {
      setSearchTerm(e.detail.toLowerCase());
    };
    window.addEventListener("searchUpdated", handleSearch);
    return () => window.removeEventListener("searchUpdated", handleSearch);
  }, []);

  // Fetch cart
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { data } = await axios.get(`${API_BASE}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const getCartItem = (productId) =>
    cartItems.find((item) => item.productId._id === productId);

  const handleAddToCart = async (product) => {
    try {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      if (!user || !user.token)
        return alert("Please login to add products to the cart");

      const existing = getCartItem(product._id);
      if (existing) {
        await axios.patch(
          `${API_BASE}/api/cart/item/${product._id}`,
          { quantity: existing.quantity + 1 },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      } else {
        await axios.post(
          `${API_BASE}/api/cart/add`,
          { productId: product._id, quantity: 1 },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      }

      await fetchCartItems();
        window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err);
      alert("Something went wrong while adding to cart");
    }
  };
  
  const changeQuantity = async (productId, delta) => {
    try {
      const item = getCartItem(productId);
      if (!item) return;
      const newQty = item.quantity + delta;
      if (newQty < 1) return;

      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_BASE}/api/cart/item/${productId}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/api/cart/item/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCartItems();
        window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err);
    }
  };

  const normalize = (str) => str.replace(/\s+/g, "").toLowerCase();

  // Filter products
  const filteredProducts = products
    .filter(
      (p) => selectedCategory === "All" || p.category === selectedCategory
    )
    .filter((p) => normalize(p.title).startsWith(normalize(searchTerm)));

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box textAlign="center" mb={4}>
        <CommonTypography variant="h4" fontWeight="bold">
          All Products
        </CommonTypography>
      </Box>

      {/* Category Filter */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        {["All", ...categories].map((e) => (
          <Chip
            key={e}
            label={e}
            clickable
            onClick={() => setSelectedCategory(e)}
            sx={{
              backgroundColor: selectedCategory === e ? "#D3744A" : "white",
              color: selectedCategory === e ? "white" : "black",
              fontWeight: "bold",
              border: "1px solid #ccc",
              "&:hover": {
                backgroundColor: selectedCategory === e ? "#b85c36" : "#f5f5f5",
              },
            }}
          />
        ))}
      </Box>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <Typography variant="h5" color="text.secondary">
            No Product Found
          </Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={4}
          maxWidth={1100}
          minWidth={1100}
          justifyContent="flex-start"
        >
          {filteredProducts.map((product) => {
            const cartItem = getCartItem(product._id);
            return (
              <Grid key={product._id} sx={{ flex: "1 1 250px", maxWidth: 250 }}>
                <Card
                  className="product-card"
                  sx={{
                    backgroundColor: "#EEEDE7",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    position: "relative",
                  }}
                >
                  {product.chip && (
                    <Chip
                      label={product.chip}
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        backgroundColor: "#D3744A",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <Box sx={{ backgroundColor: "white", p: 3 }}>
                    <CardMedia
                      component="img"
                      alt={product.title}
                      image={`${API_BASE}${product.image}`}
                      sx={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                        mx: "auto",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontSize: "1.2rem" }}>
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "1rem", mt: 1 }}
                    >
                      ₹{Number(product.price).toLocaleString("en-IN")}
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginLeft: 8,
                        }}
                      >
                        ₹
                        {Number(product.originalPrice).toLocaleString("en-IN")}
                      </span>
                    </Typography>

                    {!cartItem ? (
                      <Button
                       variant="customContained" 
                        startIcon={<ShoppingCart />}
                        sx={{
                          mt: 2,
                          width: "100%",
                        }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <>
                        {/* Quantity Controls - hidden until hover (no space reserved) */}
                        <Box
                          sx={{
                            display: "none",
                            gap: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            mt: 2,
                            ".product-card:hover &": {
                              display: "flex",
                            },
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() =>
                              changeQuantity(product._id, -1)
                            }
                          >
                            -
                          </Button>
                          <Typography>{cartItem.quantity}</Typography>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              changeQuantity(product._id, 1)
                            }
                          >
                            +
                          </Button>
                        </Box>

                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ mt: 2, width: "100%" }}
                          onClick={() => removeFromCart(product._id)}
                        >
                          Remove from Cart
                        </Button>
                      </>
                    )}

                    {/* Shop Now Button (commented) */}
                    {/*
                    <CommonButton
                      component={Link}
                      to={`/shop/${product._id}`}
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      className="shop-btn"
                      sx={{
                        mt: 2,
                        opacity: 0,
                        transition: "opacity 0.3s",
                        backgroundColor: "#D3744A",
                        "&:hover": { backgroundColor: "#b85c36" },
                        width: "100%",
                      }}
                    >
                      Shop Now
                    </CommonButton>
                    */}

                    {/* Admin Edit/Delete */}
                    {user?.isAdmin && (
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          component={Link}
                          to={`/create-product/${product._id}`}
                          variant="customOutlined"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="customOutlined"
                          sx={{
                            backgroundColor: "white",
                          }}
                          onClick={async () => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this product?"
                              )
                            ) {
                              try {
                                await axios.delete(
                                  `${API_BASE}/api/products/${product._id}`,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${user.token}`,
                                    },
                                  }
                                );
                                setProducts(
                                  products.filter((p) => p._id !== product._id)
                                );
                              } catch (err) {
                                alert("Failed to delete product");
                              }
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Admin Buttons */}
      {user?.isAdmin && (
        <Box sx={{ mt: 6, display: "flex", gap: 2 }}>
          <CommonButton
            component={Link}
            to="/create-product"
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: "#D3744A",
              "&:hover": { backgroundColor: "#b85c36" },
            }}
          >
            Create Product
          </CommonButton>
          <CommonButton
            component={Link}
            to="/categories"
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Manage Categories
          </CommonButton>
        </Box>
      )}

      {/* Admin Discount */}
      {user?.isAdmin && (
        <Box sx={{ mt: 6, display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            label="Set Discount %"
            type="number"
            value={discount}
            onChange={(e) => {
              const val = e.target.value;
              const num = val === "" ? 0 : Number(val);
              if (num >= 0 && num <= 100) setDiscount(num);
            }}
            inputProps={{ min: 0, max: 100 }}
            size="small"
            sx={{ width: 150 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                await axios.post(
                  `${API_BASE}/api/admin/discount`,
                  { rate: discount },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("Discount updated successfully!");
              } catch (err) {
                console.error(err);
                alert("Failed to update discount");
              }
            }}
          >
            Save Discount
          </Button>
        </Box>
      )}

      {/* Admin Platform Fee */}
      {user?.isAdmin && (
        <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            label="Set Platform Fee %"
            type="number"
            value={platformFee}
            onChange={(e) => {
              const val = e.target.value;
              const num = val === "" ? 0 : Number(val);
              if (num >= 0 && num <= 100) setPlatformFee(num);
            }}
            inputProps={{ min: 0, max: 100 }}
            size="small"
            sx={{ width: 150 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                await axios.post(
                  `${API_BASE}/api/admin/platform-fee`,
                  { rate: platformFee },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("Platform Fee updated successfully!");
              } catch (err) {
                console.error(err);
                alert("Failed to update Platform Fee");
              }
            }}
          >
            Save Platform Fee
          </Button>
        </Box>
      )}
    </Box>
  );
}
