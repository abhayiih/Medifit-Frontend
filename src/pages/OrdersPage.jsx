import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
        orders.map((order) => (
          <Paper
            key={order._id}
            sx={{
              mb: 4,
              p: 3,
              border: "1px solid #ddd",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            {/* Order Header */}
            <Typography variant="h6" gutterBottom>
              Order ID: {order._id}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </Typography>

            {/* Items Table */}
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Item</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.productId?.title}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>₹{item.productId?.price}</TableCell>
                      <TableCell>
                        ₹{item.productId?.price * item.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 2 }} />

            {/* Order Summary */}
            <Typography variant="body2">Subtotal: ₹{order.subtotal}</Typography>
            <Typography variant="body2">
              Platform Fee ({order.platformFeePercent}%): ₹{order.platformFee}
            </Typography>
            <Typography variant="body2">GST(18%): ₹{order.gst}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total: ₹{order.totalAmount}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: order.paymentStatus === "Success" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              Payment Status: {order.paymentStatus}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default OrdersPage;
