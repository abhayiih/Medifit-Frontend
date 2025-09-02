import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
} from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import axios from "axios";
import * as Yup from "yup";
import { loadStripe } from "@stripe/stripe-js";
import { CircularProgress } from "@mui/material";

const API_BASE = "http://localhost:5000";
const stripePromise = loadStripe(
  "pk_test_51S1LGVP8eFzhG8FyqVqZ5wtewUAXiXxU0OnyOf12vRpUOcxNAZe0peuZ9FGlRtP2wlvf9qAB3OHmQEvJrtLjlaEX00Z9Juem7W"
);

const schema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
});

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});
  const [platformFeeRate, setPlatformFeeRate] = useState(0);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { data } = await axios.get(`${API_BASE}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlatformFee = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_BASE}/api/admin/platform-fee`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlatformFeeRate(data?.rate || 0);
    } catch (err) {
      console.error("Failed to fetch platform fee:", err);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchPlatformFee();

    const handleCartUpdated = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdated);
    return () => window.removeEventListener("cartUpdated", handleCartUpdated);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});
      setOrderLoading(true); // start loading

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to login first");
        setOrderLoading(false);
        return;
      }

      const { subtotal, gst, platformFee, total } = calculateSummary();

      const { data } = await axios.post(
        `${API_BASE}/api/payment/create-checkout-session`,
        {
          amount: total,
          shippingAddress: form,
          subtotal,
          gst,
          platformFee,
          platformFeePercent: platformFeeRate,
          userId: JSON.parse(localStorage.getItem("user"))._id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) {
        console.error(error);
        alert("Payment failed, please try again");
        setOrderLoading(false); // stop if error
      }
    } catch (validationError) {
      const errs = {};
      validationError.inner?.forEach((err) => {
        errs[err.path] = err.message;
      });
      setErrors(errs);
      setOrderLoading(false); // stop if validation fails
    }
  };

  const updateQuantity = async (productId, newQty) => {
    try {
      if (newQty < 1) return;
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_BASE}/api/cart/item/${productId}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await axios.delete(`${API_BASE}/api/cart/item/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh local cart
      fetchCart();

      // Notify other components (like cart badge) globally
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error(err);
      alert("Something went wrong while removing the item");
    }
  };

  const calculateSummary = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.productId?.price * item.quantity;
    });
    const gst = Math.floor(subtotal * 0.18);
    const platformFee = Math.floor(subtotal * (platformFeeRate / 100));
    const total = subtotal + gst + platformFee;
    return { subtotal, gst, platformFee, total };
  };

  const { subtotal, gst, platformFee, total } = calculateSummary();

  if (loading)
    return (
      <Container maxWidth="md">
        <Typography variant="h6" sx={{ mt: 4 }}>
          Loading cart...
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 5 }}>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No items in cart
        </Typography>
      ) : (
        <>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {cartItems.map((item) => (
              <Grid
                key={item.productId?._id}
                sx={{ flex: "1 1 250px", maxWidth: 250 }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    p: 1,
                  }}
                >
                  <Box sx={{ backgroundColor: "white", p: 2 }}>
                    <CardMedia
                      component="img"
                      alt={item.productId?.title}
                      image={
                        item.productId?.image
                          ? `${API_BASE}${item.productId.image}`
                          : "/placeholder.png"
                      }
                      sx={{
                        width: 150,
                        height: 150,
                        objectFit: "contain",
                        mx: "auto",
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      textAlign: "center",
                      height: 170,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={item.productId?.title}
                    >
                      {item.productId?.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          updateQuantity(item.productId._id, item.quantity - 1)
                        }
                      >
                        <ArrowDropDown />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        onClick={() =>
                          updateQuantity(item.productId._id, item.quantity + 1)
                        }
                      >
                        <ArrowDropUp />
                      </IconButton>
                    </Box>

                    <Typography sx={{ mt: 1 }}>
                      ₹{item.productId?.price?.toLocaleString("en-IN")}
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginLeft: 8,
                        }}
                      >
                        ₹
                        {item.productId?.originalPrice?.toLocaleString("en-IN")}
                      </span>
                    </Typography>

                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mt: 1 }}
                      onClick={() => removeItem(item.productId._id)}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Shipping + Order Summary */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              mt: 6,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Card sx={{ p: 4, border: "2px solid #4a392aff" }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  Shipping Address
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {["address", "city", "state", "country", "pincode"].map(
                    (name) => (
                      <TextField
                        key={name}
                        label={name.charAt(0).toUpperCase() + name.slice(1)}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        error={!!errors[name]}
                        helperText={errors[name]}
                        fullWidth
                      />
                    )
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                    disabled={orderLoading} // disable while loading
                  >
                    {orderLoading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      `Place Order & Pay ₹${total.toLocaleString("en-IN")}`
                    )}
                  </Button>
                </Box>
              </Card>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Card sx={{ p: 4, border: "2px solid #4a392aff" }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  Order Summary
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {cartItems.map((item) => (
                    <Box
                      key={item.productId._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #dabcbcff",
                        pb: 1,
                      }}
                    >
                      <Typography>
                        {item.productId.title} x {item.quantity}
                      </Typography>
                      <Typography>
                        ₹
                        {(item.productId.price * item.quantity).toLocaleString(
                          "en-IN"
                        )}
                      </Typography>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Typography fontWeight="bold">Subtotal:</Typography>
                    <Typography>₹{subtotal.toLocaleString("en-IN")}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>GST (18%):</Typography>
                    <Typography>+₹{gst.toLocaleString("en-IN")}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Platform Fee ({platformFeeRate}%):</Typography>
                    <Typography>
                      +₹{platformFee.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                      fontWeight: "bold",
                    }}
                  >
                    <Typography>Total:</Typography>
                    <Typography>₹{total.toLocaleString("en-IN")}</Typography>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}
