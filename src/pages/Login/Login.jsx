import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginAPI } from "../../utils/api";
import { useStore } from "../../store/useStore";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const setToken = useStore(s => s.setToken);
  const setUser = useStore(s => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || "/services";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginAPI(email, password);

      // Save token + user in zustand
      setToken(res.token);
      setUser(res.user);

      // Beautiful login welcome message
      alert("🎉 Digital-Mall welcomes you 😊");

      // Redirect user to intended page
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      alert("Login failed. Check your email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.box} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>Welcome Back</h1>
        <p className={styles.sub}>Login to continue your Digital-Mall journey.</p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className={styles.linkWrap}>
          Don't have an account?{" "}
          <a href="/signup" className={styles.link}>Sign up</a>
        </p>
      </form>
    </div>
  );
}
