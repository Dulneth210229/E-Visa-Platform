import React, { useState } from "react";
import Nav from "../../Components/Navigation/Nav";
import "./Signup.css";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <div class="signup-page">
      <Nav />
      <section>
        <div>
          <div class="form-container">
            <form class="signup" onSubmit={handleSubmit}>
              <h2>Sign Up</h2>
              <div class="input-container">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="input-container">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" disabled={isLoading}>
                Sign Up
              </button>
              <div class="have-acc">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login">
                    <span>click here</span>
                  </Link>
                </p>
              </div>
              {error && <div class="error">{error}</div>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
