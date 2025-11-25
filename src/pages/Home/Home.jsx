// src/pages/Home/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../store/useStore";
import logoPng from "../../assets/logo.png";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import { motion } from "framer-motion";
import styles from "./Home.module.css";

export default function Home() {

  // ⭐ Use your ACTUAL filenames
  const heroImages = Array.from({ length: 16 }, (_, i) => `/gallery/gallery${i + 1}.jpg.jpeg`);

  return (
    <div className={styles.wrapper}>

      <div className={styles.gradientLeft} />
      <div className={styles.gradientRight} />

      <section className={styles.hero}>

        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.img
            src={logoPng}
            alt="Digital Mall"
            className={styles.bigLogo}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.99 }}
          />
        </motion.div>

        <motion.div
          className={styles.glass}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>Digital-Mall</h1>
          <p className={styles.subtitle}>
            Trusted local services across Gauteng — instant booking, real pricing, seamless experience.
          </p>

          <div className={styles.visionBox}>
            <h2>Our Vision</h2>
            <p>
              We are building the most reliable digital marketplace for everyday services in Gauteng.
              A platform where trust, craftsmanship and speed matter.
              We believe local experts deserve global-level visibility.
              Customers deserve transparent pricing.
              Bookings should be instant and effortless.
              Convenience should never mean compromise.
              Every home deserves quality service.
              Every provider deserves fair opportunity.
              Digital-Mall connects communities through skilled work.
              Our mission is simple — life made easier, one service at a time.
            </p>
            <Link to="/services">
              <button className={styles.exploreBtn}>Explore Services</button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className={styles.sliderSection}>
        <h3 className={styles.featured}>Featured Gallery</h3>

        <div className={styles.sliderWrapper}>
          <ImageSlider
            images={heroImages}
            height={340}
            kenBurns
            parallax
          />
        </div>
      </section>
    </div>
  );
}
