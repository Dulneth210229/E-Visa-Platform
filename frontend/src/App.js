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
import AdminDashboard from "./Pages/Admin/Users/AdminDashboard";
import VisaDetails from "./Pages/Admin/Visas/VisaDetails";

function App() {
  const { user } = useAuthContext();

  // Function to check if the email contains @admin.com
  const isAdmin = user && user.email.includes("@admin.com");

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-visa"
            element={user ? <AddVisa /> : <Navigate to="/login" />}
          />
          <Route
            path="/visa-status"
            element={user ? <VisaStatus /> : <Navigate to="/login" />}
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              !user ? <Login /> : <Navigate to={isAdmin ? "/admin" : "/"} />
            }
          />

          {/* Signup Route */}
          <Route
            path="/signup"
            element={
              !user ? <Signup /> : <Navigate to={isAdmin ? "/admin" : "/"} />
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : null} />
          <Route
            path="/visa-details"
            element={isAdmin ? <VisaDetails /> : null}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
