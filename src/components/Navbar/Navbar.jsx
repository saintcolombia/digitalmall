import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";
import styles from "./Navbar.module.css";
import logoSmall from "../../assets/logo.png"; // create this or replace with /logo-small.png

export default function Navbar() {
  const { user, logout, mode, setMode, cart } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    // ensure body class matches stored mode on first render
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
  }, [mode]);

  const toggle = () => setMode(mode === "light" ? "dark" : "light");

  const cartCount = (cart && cart.items) ? cart.items.length : 0;

  return (
    <header className={styles.nav}>
      <div className={styles.left}>
        <img src={logoSmall} alt="Digital-Mall" className={styles.logo} onClick={()=>navigate("/")} />
        <div className={styles.brand} onClick={()=>navigate("/")}>
          <div className={styles.title}>Digital-Mall</div>
          <div className={styles.tag}>Gauteng • Local Services</div>
        </div>
      </div>

      <nav className={styles.mid}>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </nav>

      <div className={styles.right}>
        <button className={styles.modeBtn} onClick={toggle}>{mode === "light" ? "Dark" : "Light"}</button>

        {user ? (
          <>
            <button className={styles.btn} onClick={()=>navigate("/profile")}>Hi, {user.name || user.email}</button>
            <button className={styles.btn} onClick={()=>{ logout(); navigate("/"); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup"><button className={styles.btn}>Sign up</button></Link>
            <Link to="/login"><button className={styles.btn}>Login</button></Link>
          </>
        )}
      </div>
    </header>
  );
}
