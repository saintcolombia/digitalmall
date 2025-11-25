import React, { useEffect, useState } from "react";
import { useStore } from "../../store/useStore";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Services.module.css";

export default function Services(){
  const { services, loadingServices } = useStore();
  const [filtered, setFiltered] = useState([]);

  useEffect(()=>{ setFiltered(services || []); }, [services]);

  if (loadingServices) return <div className="app-container"><p>Loading services…</p></div>;
  if (!services || services.length===0) return <div className="app-container"><p className="muted">No services available.</p></div>;

  return (
    <div className="app-container">
      <h2 className="h2">All Services</h2>
      <p className="small muted">Search by typing the first letter — we suggest instantly.</p>

      <SearchBar services={services} onFilter={setFiltered} />

      <div className={styles.grid}>
        {filtered.map(s => <ServiceCard key={s._id || s.name} item={s} />)}
      </div>
    </div>
  );
}
