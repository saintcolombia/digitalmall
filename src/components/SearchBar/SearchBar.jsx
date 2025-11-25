import React, { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ services = [], onFilter }) {
  const [q, setQ] = useState("");

  const handle = (v) => {
    setQ(v);
    if (!v) return onFilter(services);
    const low = v.toLowerCase();
    const results = services.filter(s =>
      (s.name && s.name.toLowerCase().startsWith(low)) ||
      (s.providerName && s.providerName.toLowerCase().startsWith(low))
    );
    onFilter(results);
  }

  return (
    <div className={styles.wrap}>
      <input className={styles.input} placeholder="Search (type first letter e.g. 'P')" value={q} onChange={(e)=>handle(e.target.value)} />
    </div>
  )
}
