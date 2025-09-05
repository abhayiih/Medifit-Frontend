import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Success() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { session_id } = useParams();

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
        await axios.post(
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

        // Dispatch cartUpdated so Header badge updates immediately
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      } catch (err) {
        console.error("Failed to create order:", err);
      }
    };

    if (user) createOrderAfterPayment();
  }, [session_id, user?.token]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>✅ Payment Successful! Your order is placed.</h2>
      <p>You can view your orders and download invoices from your Orders page.</p>
    </div>
  );
}
