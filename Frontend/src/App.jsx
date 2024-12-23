
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar3 from "./Components/Navbar3";
// import Login from "./Components/Login";
// import Signup from "./Components/Signup";
// import Navbar from "./Components/Navbar";
// import Display from "./Components/Display";
// import PaymentPage from "./Components/Payment";
// import PaymentDetails from "./Components/PaymentDetails";

// import "./App.css";
// import ForgetPassword from "./Components/Forgetpassword";
// import Sidebar from "./Components/Sidebar";
// import Navbar2 from "./Components/Navbar2";


// const App = () => {
//   const [click, setClick] = useState(false);

//   return (
//     <Router>
//       <Navbar click={click} setClick={setClick} />
//       <Routes>
//       <Route path="/navbar3" element={<Navbar3 />} />

//         <Route path="/Login" element={<Login setClick={setClick} />} />
//         <Route path="/Signup" element={<Signup />} />
//         <Route path="/display" element={<Display />} />
//         <Route path="/Payment" element={<PaymentPage />} />
//         <Route path="/PaymentDetails" element={<PaymentDetails />} />
//         <Route path="/Forgetpassword" element={<ForgetPassword />} />
//         <Route path="/sidebar" element={<Sidebar />} />
//         <Route path="/navbar2" element={<Navbar2 />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar3 from "./Components/Navbar3";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Display from "./Components/Display";
import PaymentPage from "./Components/Payment";
import PaymentDetails from "./Components/PaymentDetails";
import ForgetPassword from "./Components/Forgetpassword";
import Sidebar from "./Components/Sidebar";
import Navbar2 from "./Components/Navbar2";
import NavbarsPage from "./Components/NavbarsPage"; 

import Table from "./Components/Table";

const App = () => {
  const [click, setClick] = useState(false);

  return (
    <Router>
      <Navbar click={click} setClick={setClick} />
      <Routes>
       {/* <Route path="/navbar" element={<Navbar />} />  */}
         <Route path="/navbar3" element={<Navbar3 />} />
        {/* <Route path="/navbar2" element={<Navbar2 />} /> */}
        {/* <Route path="/navbarspage" element={<NavbarsPage />} />   */}
        <Route path="/login" element={<Login setClick={setClick} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/board" element={<Display />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/paymentdetails" element={<PaymentDetails />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/table" element={<Table/>} />
      </Routes>
    </Router>
  );
};

export default App;
