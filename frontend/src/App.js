import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//importing starts
//----Home Page ----
import Home from "./Pages/Home/Home";
import AddVisa from "./Pages/Visa/AddVisa/AddVisa";
import VisaStatus from "./Pages/Visa/VisaStatus/VisaStatus";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-visa" element={<AddVisa />} />
          <Route path="/visa-status" element={<VisaStatus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
