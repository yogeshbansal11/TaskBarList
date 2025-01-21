

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar3 from "./Components/Navbar3";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Display from "./Components/Display";
import PaymentPage from "./Components/Payment";
import PaymentDetails from "./Components/PaymentDetails";
import ForgetPassword from "./Components/Forgetpassword";
import Sidebar from "./Components/Sidebar";
import Table from "./Components/Table";
import UpdateUsername from "./Components/Usernameupdate";
import Dashboard from "./Components/Dashboard";
import CalendarComponent from "./Components/Calendar";
import Map from "./Components/Map";


const App = () => {
  const [click, setClick] = useState(false);

  const useAuth = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar click={click} setClick={setClick} />
      <Routes>
        <Route path="/login" element={<Login setClick={setClick} />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Display />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/paymentdetails" element={<PaymentDetails />} />
          <Route path="/resetpassword" element={<ForgetPassword />} />
          <Route path="/updateusername" element={<UpdateUsername />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/table" element={<Table />} />
          <Route path="/calendar" element={<CalendarComponent />} />
          <Route path="/map" element={<Map/>}/>

        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
