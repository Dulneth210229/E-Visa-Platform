import React, { useState } from "react";
import Nav from "../../Components/Navigation/Nav";
import "./Signup.css";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <div class="body">
      <Nav />
      <section>
        <div>
          <div class="img-container"></div>
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
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
