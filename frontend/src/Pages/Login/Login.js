import React, { useState } from "react";
import Nav from "../../Components/Navigation/Nav";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div class="login_page">
      <Nav />
      <section>
        <div>
          <div class="form-container">
            <form class="login" onSubmit={handleSubmit}>
              <h2>Log in</h2>
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
                Log in
              </button>
              {error && <div class="error">{error}</div>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
