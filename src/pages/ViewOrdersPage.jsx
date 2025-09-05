import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ViewOrdersPage = () => {
  const user = JSON.parse(localStorage.getItem("user")); // admin user
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

    if (user?.isAdmin) fetchOrders(); // Only fetch if admin
  }, [user?.token, user?.isAdmin]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
       
      
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: res.data.status } : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };
  
  
  const viewInvoice = async (orderId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/payment/invoice/${orderId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          responseType: "blob",
        }
      );
      const file = new Blob([res.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    } catch (err) {
      console.error("Invoice view failed:", err);
    }
  };

  const downloadInvoice = async (orderId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/payment/invoice/${orderId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Invoice download failed:", err);
    }
  };

  if (!user?.isAdmin) {
    return <Typography>You are not authorized to view this page.</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        All Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ border: "1px solid #000" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: "1px solid #000", fontWeight: "bold" }}>Order ID</TableCell>
                <TableCell sx={{ border: "1px solid #000", fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ border: "1px solid #000", fontWeight: "bold" }}>User</TableCell>
                <TableCell sx={{ border: "1px solid #000", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ border: "1px solid #000", fontWeight: "bold" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell sx={{ border: "1px solid #000" }}>{order._id}</TableCell>
                  <TableCell sx={{ border: "1px solid #000" }}>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000" }}>
                    {order.userId.username || order.userId.email || order.userId}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000" }}>
                    <Select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      size="small"
                      sx={{ minWidth: 150 }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000" }} align="center">
                    <Button
                      variant="customOutlined"
                      sx={{ mr: 2 }}
                      onClick={() => viewInvoice(order._id)}
                    >
                      View Invoice
                    </Button>
                    <Button
                      variant="customContained"
                      onClick={() => downloadInvoice(order._id)}
                    >
                      Download Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ViewOrdersPage;
