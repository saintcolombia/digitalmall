import React from "react";
import styles from "./ServiceCard.module.css";
import ImageSlider from "../ImageSlider/ImageSlider";
import { useStore } from "../../store/useStore";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ServiceCard({ item }) {
  const addToCart = useStore(s => s.addToCart);
  const nav = useNavigate();

  const images = Array.isArray(item.images) ? item.images.slice(0, 4) : [];
  const phone = item.phone || item.providerPhone || "N/A";
  const email = item.providerEmail || "info@digitalmall.co.za";

  return (
    <motion.article className={styles.card} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
      <div className={styles.media}>
        <ImageSlider images={images} height={220} />
      </div>

      <div className={styles.body}>
        <div className={styles.top}>
          <h3 className={styles.title}>{item.name}</h3>
          <div className={styles.price}>R {item.price}</div>
        </div>

        <p className={styles.desc}>{item.description || (item.descriptionPoints || []).slice(0,2).join(", ")}</p>

        <ul className={styles.points}>
          {item.descriptionPoints && item.descriptionPoints.map((p,i)=>(<li key={i}>{p}</li>))}
        </ul>

        <div className={styles.meta}>
          <div className={styles.providerName}>{item.providerName || "Local Provider"}</div>
          <div className={styles.contact}>📞 {phone} • ✉️ {email}</div>
          <div className={styles.address}>📍 {item.address}</div>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnAdd} onClick={()=>addToCart(item)}>Add to cart</button>
          <button className={styles.btnBook} onClick={()=>{ addToCart(item); nav("/checkout"); }}>Book now</button>
        </div>
      </div>
    </motion.article>
  );
}
