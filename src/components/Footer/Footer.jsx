import React from "react";
import styles from "./Footer.module.css";

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div>
        <strong>Digital-Mall</strong>
        <div className="small muted">Serving Gauteng • Trusted local services</div>
      </div>

      <div>
        <div className="small muted">Follow us:</div>
        <div style={{display:"flex", gap:8, marginTop:6}}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
