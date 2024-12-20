import React from "react";
import { useLocation } from "react-router-dom";
import "./PaymentDetails.css";

const PaymentDetails = () => {
  const location = useLocation();
  const plan = location.state || { name: "Default Plan", price: "₹0" }; // Default fallback

  const handleUPIPayment = () => {
    alert(`UPI Payment initiated for ${plan.name} - ${plan.price}`);
  };

  const handleCardPayment = () => {
    alert(`Card Payment initiated for ${plan.name} - ${plan.price}`);
  };

  return (
    <div className="payment-details-container">
      <h1>Complete Your Payment</h1>
      <div className="payment-summary">
        <h2>Selected Plan: {plan.name}</h2>
        <p>Amount: {plan.price}</p>
      </div>
      <div className="payment-options">
        <h3>Select Payment Method</h3>
        <div className="payment-method">
          <h4>UPI</h4>
          <input
            type="text"
            placeholder="Enter UPI ID (e.g., yourname@upi)"
            aria-label="UPI ID"
          />
          <button onClick={handleUPIPayment}>Pay via UPI</button>
        </div>
        <div className="payment-method">
          <h4>Card Payment</h4>
          <input type="text" placeholder="Card Number" aria-label="Card Number" />
          <input type="text" placeholder="MM/YY" aria-label="Expiry Date" />
          <input type="text" placeholder="CVV" aria-label="CVV" />
          <button onClick={handleCardPayment}>Pay via Card</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
