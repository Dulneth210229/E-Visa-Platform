import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//importing starts
//----Home Page ----
import Home from "./Pages/Home/Home";
import AddVisa from "./Pages/Visa/AddVisa/AddVisa";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-visa" element={<AddVisa />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
