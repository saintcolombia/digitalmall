// src/store/useStore.js
import create from "zustand";

const initialCart = JSON.parse(localStorage.getItem("dm_cart") || "null") || { items: [], totalZAR: 0 };
const initialUser = JSON.parse(localStorage.getItem("dm_user") || "null") || null;
const initialToken = localStorage.getItem("dm_token") || null;
const initialMode = localStorage.getItem("dm_mode") || "dark";

export const useStore = create((set, get) => ({
  // services
  services: [],
  loadingServices: false,
  setServices: (services) => set({ services }),
  setLoadingServices: (v) => set({ loadingServices: v }),

  // cart
  cart: initialCart,
  addToCart: (item) => {
    const c = JSON.parse(JSON.stringify(get().cart));
    c.items.push(item);
    c.totalZAR = (c.items.reduce((s, it) => s + (it.price || 0), 0));
    localStorage.setItem("dm_cart", JSON.stringify(c));
    set({ cart: c });
  },
  removeFromCart: (idx) => {
    const c = JSON.parse(JSON.stringify(get().cart));
    c.items.splice(idx, 1);
    c.totalZAR = (c.items.reduce((s, it) => s + (it.price || 0), 0));
    localStorage.setItem("dm_cart", JSON.stringify(c));
    set({ cart: c });
  },
  clearCart: () => {
    const c = { items: [], totalZAR: 0 };
    localStorage.setItem("dm_cart", JSON.stringify(c));
    set({ cart: c });
  },

  // auth: user + token
  user: initialUser,
  token: initialToken,
  setUser: (u) => {
    localStorage.setItem("dm_user", JSON.stringify(u));
    set({ user: u });
  },
  setToken: (t) => {
    if (t) localStorage.setItem("dm_token", t);
    else localStorage.removeItem("dm_token");
    set({ token: t });
  },
  logout: () => {
    localStorage.removeItem("dm_user");
    localStorage.removeItem("dm_token");
    set({ user: null, token: null });
  },

  // ui mode
  mode: initialMode,
  setMode: (m) => {
    localStorage.setItem("dm_mode", m);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(m);
    set({ mode: m });
  },
}));
