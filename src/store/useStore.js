import create from "zustand";

const safeLocalStorageGet = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : fallback;
};

const safeLocalStorageGetRaw = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  return localStorage.getItem(key) || fallback;
};

const initialCart = safeLocalStorageGet("dm_cart", { items: [], totalZAR: 0 });
const initialUser = safeLocalStorageGet("dm_user", null);
const initialToken = safeLocalStorageGetRaw("dm_token", null);
const initialMode = safeLocalStorageGetRaw("dm_mode", "dark");

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
    c.totalZAR = c.items.reduce((s, it) => s + (it.price || 0), 0);

    if (typeof window !== "undefined") {
      localStorage.setItem("dm_cart", JSON.stringify(c));
    }

    set({ cart: c });
  },
  removeFromCart: (idx) => {
    const c = JSON.parse(JSON.stringify(get().cart));
    c.items.splice(idx, 1);
    c.totalZAR = c.items.reduce((s, it) => s + (it.price || 0), 0);

    if (typeof window !== "undefined") {
      localStorage.setItem("dm_cart", JSON.stringify(c));
    }

    set({ cart: c });
  },
  clearCart: () => {
    const c = { items: [], totalZAR: 0 };

    if (typeof window !== "undefined") {
      localStorage.setItem("dm_cart", JSON.stringify(c));
    }

    set({ cart: c });
  },

  // auth
  user: initialUser,
  token: initialToken,
  setUser: (u) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dm_user", JSON.stringify(u));
    }
    set({ user: u });
  },
  setToken: (t) => {
    if (typeof window !== "undefined") {
      if (t) localStorage.setItem("dm_token", t);
      else localStorage.removeItem("dm_token");
    }
    set({ token: t });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("dm_user");
      localStorage.removeItem("dm_token");
    }
    set({ user: null, token: null });
  },

  // mode
  mode: initialMode,
  setMode: (m) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dm_mode", m);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(m);
    }
    set({ mode: m });
  },
}));
