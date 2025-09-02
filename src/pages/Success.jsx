import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Success() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { session_id } = useParams();
  const [orderId, setOrderId] = useState(null); // store created order ID

  useEffect(() => {
    const createOrderAfterPayment = async () => {
      try {
        const token = user?.token;

        // Fetch session details from Stripe
        const { data: session } = await axios.get(
          `http://localhost:5000/api/payment/session/${session_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Create order using session data
        const { data: createdOrder } = await axios.post(
          "http://localhost:5000/api/orders",
          {
            shippingAddress: session.shippingAddress,
            subtotal: session.subtotal,
            gst: session.gst,
            platformFee: session.platformFee,
            platformFeePercent: session.platformFeePercent,
            totalAmount: session.totalAmount,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Save orderId for invoice actions
        setOrderId(createdOrder._id);

        // Dispatch cartUpdated so Header badge updates immediately
        window.dispatchEvent(new CustomEvent("cartUpdated"));

      } catch (err) {
        console.error("Failed to create order:", err);
      }
    };

    createOrderAfterPayment();
  }, [session_id, user?.token]);

  // View invoice in new tab
  const viewInvoice = async () => {
    if (!orderId) return; // wait until order is created
    try {
      const token = user?.token;
      const res = await axios.get(
        `http://localhost:5000/api/payment/invoice/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
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

  // Download invoice as PDF
  const downloadInvoice = async () => {
    if (!orderId) return; // wait until order is created
    try {
      const token = user?.token;
      const res = await axios.get(
        `http://localhost:5000/api/payment/invoice/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Invoice download failed:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>✅ Payment Successful! Your order is placed.</h2>
      <button
        onClick={viewInvoice}
        style={{ margin: "10px" }}
        disabled={!orderId}
      >
        View Invoice
      </button>
      <button
        onClick={downloadInvoice}
        style={{ margin: "10px" }}
        disabled={!orderId}
      >
        Download Invoice
      </button>
      {!orderId && <p>Generating your order...</p>}
    </div>
  );
}
