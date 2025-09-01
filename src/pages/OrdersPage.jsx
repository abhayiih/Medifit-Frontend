import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";

const OrdersPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [user?.token]);

  if (!user) {
    return <Typography>Please login to view your orders.</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid size={{xs:12}} key={order._id}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order ID: {order._id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placed on: {new Date(order.createdAt).toLocaleString()}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" gutterBottom>
                    Shipping Address
                  </Typography>
                  <Typography variant="body2">
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state},{" "}
                    {order.shippingAddress.country},{" "}
                    {order.shippingAddress.pincode}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" gutterBottom>
                    Items
                  </Typography>
                  {order.items.map((item) => (
                    <Typography key={item._id} variant="body2">
                      {item.productId?.title} × {item.quantity} = ₹
                      {item.productId?.price * item.quantity}
                    </Typography>
                  ))}

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2">
                    Subtotal: ₹{order.subtotal}
                  </Typography>
                  <Typography variant="body2">
                    Platform Fee ({order.platformFeePercent}%): ₹{order.platformFee}
                  </Typography>
                  <Typography variant="body2">GST(18%): ₹{order.gst}</Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Total: ₹{order.totalAmount}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={order.paymentStatus === "Success" ? "green" : "red"}
                  >
                    Payment Status: {order.paymentStatus}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default OrdersPage;
