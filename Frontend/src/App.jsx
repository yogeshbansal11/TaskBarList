

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
// import Navbar3 from "./Components/Navbar3";
// import Login from "./Components/Login";
// import Signup from "./Components/Signup";
// import Navbar from "./Components/Navbar";
// import Display from "./Components/Display";
// import PaymentPage from "./Components/Payment";
// import PaymentDetails from "./Components/PaymentDetails";
// import ForgetPassword from "./Components/Forgetpassword";
// import Sidebar from "./Components/Sidebar";
// import Navbar2 from "./Components/Navbar2";
// import NavbarsPage from "./Components/NavbarsPage"; 

// import Table from "./Components/Table";
// import UpdateUsername from "./Components/Usernameupdate";
// import Dashboard from "./Components/Dashboard";


// const App = () => {
//   const [click, setClick] = useState(false);

//   const useAuth = () => {
//     const token = localStorage.getItem("token");
//     // setUserDetails(true)
//     return token;
//   };

//   const ProtectedRoutes = () => {
//     const isAuth = useAuth();
//     return isAuth ? <Outlet /> : <Navigate to="/login" />;
//   };

//   return (
    
//     <Router>
//       <Navbar click={click} setClick={setClick} />
//       <Routes>
//        {/* <Route path="/navbar" element={<Navbar />} />  */}
//          <Route path="/navbar3" element={<Navbar3 />} />
//         {/* <Route path="/navbar2" element={<Navbar2 />} /> */}
//         {/* <Route path="/navbarspage" element={<NavbarsPage />} />   */}
//         <Route path="/login" element={<Login setClick={setClick} />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route element={<ProtectedRoutes />}>
        
//         <Route path="/" element={<Display />} />

//         <Route path="/dashboard" element={< Dashboard/>} />

//         <Route path="/payment" element={<PaymentPage />} />
//         <Route path="/paymentdetails" element={<PaymentDetails />} />
//         <Route path="/resetpassword" element={<ForgetPassword />} />
//         <Route path="/updateusername" element={<UpdateUsername />} />
//         <Route path="/sidebar" element={<Sidebar />} />
//         <Route path="/table" element={<Table/>} />

        
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;





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

        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
