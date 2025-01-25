import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//importing starts
//----Home Page ----
import Home from "./Pages/Home/Home";
import AddVisa from "./Pages/Visa/AddVisa/AddVisa";
import VisaStatus from "./Pages/Visa/VisaStatus/VisaStatus";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import AdminDashboard from "./Pages/Admin/AdminDashboard";

function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/add-visa" element={user ? <AddVisa /> : null} />
          <Route path="/visa-status" element={user ? <VisaStatus /> : null} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/login" />}
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
