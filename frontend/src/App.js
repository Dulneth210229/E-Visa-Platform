import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//importing starts
//----Home Page ----
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
