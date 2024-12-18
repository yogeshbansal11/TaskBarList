
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Display from "./Components/Display";
import PaymentPage from "./Components/Payment";
import PaymentDetails from "./Components/PaymentDetails";

import "./App.css";
import ForgetPassword from "./Components/Forgetpassword";

const App = () => {
  const [click, setClick] = useState(false);

  return (
    <Router>
      <Navbar click={click} setClick={setClick} />
      <Routes>
        <Route path="/Login" element={<Login setClick={setClick} />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/display" element={<Display />} />
        <Route path="/Payment" element={<PaymentPage />} />
        <Route path="/PaymentDetails" element={<PaymentDetails />} />
        <Route path="/Forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
