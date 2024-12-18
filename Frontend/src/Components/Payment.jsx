import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const PaymentPage = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      name: "Basic Plan",
      price: "₹750/month",
      details: "Includes basic task management and up to 10 projects.",
    },
    {
      id: 2,
      name: "Pro Plan",
      price: "₹1,500/month",
      details: "Includes unlimited projects, team collaboration, and analytics.",
    },
    {
      id: 3,
      name: "Enterprise Plan",
      price: "₹3,750/month",
      details: "All Pro features plus advanced integrations and priority support.",
    },
  ];

  const handlePayment = (plan) => {
    navigate("/PaymentDetails", { state: plan }); // Pass plan details via state
  };

  return (
    <div className="payment-container">
      <h1>Choose Your Plan</h1>
      <div className="plans">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="plan-card"
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            <h2>{plan.name}</h2>
            <p>{plan.price}</p>
            {hoveredPlan === plan.id && (
              <div className="plan-details">
                <p>{plan.details}</p>
              </div>
            )}
            <button
              className="pay-now-button"
              onClick={() => handlePayment(plan)} // Pass the full plan object
            >
              Pay Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPage;

