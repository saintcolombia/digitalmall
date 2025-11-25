// src/pages/Signup/Signup.jsx
import React, { useState } from "react";
import { useStore } from "../../store/useStore";
import styles from "./Signup.module.css";
import { signupAPI } from "../../utils/api";
import validator from "validator";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const setUser = useStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "+27",
    password: "",
    confirmPassword: "",   // NEW
  });

  const submit = async () => {
    if (!validator.isEmail(form.email)) {
      alert("Invalid email");
      return;
    }
    if (form.password.length < 6) {
      alert("Password too short");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await signupAPI(form);

      if (res.token && res.user) {
        // Save user temporarily (your flow requires login after signup)
        setUser(res.user);

        alert("Signup successful — please login.");
        nav("/login");
      } else {
        alert(res.error || "Signup error");
      }
    } catch (e) {
      console.error(e);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="frame" style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <h2 className="h2">Create your Digital-Mall account</h2>
          <p className="small muted">
            Join the Gauteng community — book trusted services fast.
          </p>

          <div className={styles.form}>
            <input
              className="input"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="input"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              className="input"
              placeholder="+27 Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              className="input"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {/* NEW CONFIRM PASSWORD FIELD */}
            <input
              className="input"
              placeholder="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />

            <button className="btn" onClick={submit} disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </div>

        <div style={{ width: 360 }}>
          <div className="card">
            <h3 className="h2">Why join?</h3>
            <ul className="small muted">
              <li>One-click bookings, trusted providers</li>
              <li>Safe card payments (card-only)</li>
              <li>Local to Gauteng — verified contacts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
