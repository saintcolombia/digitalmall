// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";  // ⬅ NEW

// Pages
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

// Store
import { useStore } from "./store/useStore";

// API
import { fetchServicesAPI } from "./utils/api";

export default function App() {
  const setServices = useStore((state) => state.setServices);
  const setLoadingServices = useStore((state) => state.setLoadingServices);

  useEffect(() => {
    const loadServices = async () => {
      setLoadingServices(true);
      try {
        const data = await fetchServicesAPI();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoadingServices(false);
      }
    };
    loadServices();
  }, [setServices, setLoadingServices]);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* PUBLIC PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED PAGES */}
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ALWAYS PUBLIC 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}
