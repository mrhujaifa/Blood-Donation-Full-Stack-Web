import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [amount, setAmount] = useState(""); // 💵 Amount in USD
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card element not found.");
      return;
    }

    setProcessing(true);

    try {
      // Convert dollars to cents
      const amountInCents = parseInt(Number(amount) * 100);

      // Create payment intent from backend
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCents,
      });

      const clientSecret = data.clientSecret;

      // Confirm card payment using Stripe.js
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown@example.com",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else if (result.paymentIntent.status === "succeeded") {
        // Payment succeeded, save info to backend
        try {
          await axiosSecure.post("/fundings", {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown@example.com",
            amount: Number(amount),
            transactionId: result.paymentIntent.id,
            date: new Date(),
          });

          setSuccess("✅ Payment successful and recorded!");
          setAmount("");
          elements.getElement(CardElement).clear();
        } catch (saveError) {
          setError("Payment succeeded but failed to save data.", saveError);
        }

        setProcessing(false);
      }
    } catch (err) {
      setError("Payment failed. Please try again.", err);
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Donate via Stripe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in USD"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          disabled={processing}
        />
        <div className="p-3 border rounded">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#374151",
                  "::placeholder": { color: "#9CA3AF" },
                },
                invalid: { color: "#DC2626" },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
        >
          {processing ? "Processing..." : `Pay $${amount || "0"}`}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </div>
  );
};

export default PaymentForm;
