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

function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <Router>
        <Routes>
          {user && (
            <>
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
            </>
          )}
          {!user && <></>}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
