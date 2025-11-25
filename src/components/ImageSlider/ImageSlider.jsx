import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ImageSlider.module.css";

export default function ImageSlider({
  images = [],
  height = 340,
  transitionTime = 2800, // faster cycle without flicker
  fadeTime = 0.6,        // smooth fade
}) {
  const imgs = Array.isArray(images) ? images.filter(Boolean) : [];
  const [index, setIndex] = useState(0);
  const preloaded = useRef({});

  // ⭐ Preload all images to prevent flash/white flicker
  useEffect(() => {
    imgs.forEach((src) => {
      if (!preloaded.current[src]) {
        const img = new Image();
        img.src = src;
        preloaded.current[src] = true;
      }
    });
  }, [imgs]);

  // ⭐ Faster & clean infinite slideshow
  useEffect(() => {
    if (!imgs.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imgs.length);
    }, transitionTime);

    return () => clearInterval(interval);
  }, [imgs, transitionTime]);

  if (!imgs.length) return null;

  return (
    <div
      className={styles.wrapper}
      style={{
        height,
        overflow: "hidden",
        position: "relative",
        borderRadius: "18px",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={imgs[index]}
          src={imgs[index]}
          className={styles.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeTime, ease: "easeInOut" }}
          loading="eager"
        />
      </AnimatePresence>
    </div>
  );
}
