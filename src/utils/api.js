// src/utils/api.js
const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

/**
 * Helper that tries both /api/... and non-/api/... endpoints.
 * Returns parsed JSON or throws.
 */
async function tryBoth(path, fetchOptions) {
  // prefer /api path first
  const apiPath = `${BASE}/api${path}`;
  const rawPath = `${BASE}${path}`;

  // try /api first
  try {
    const r = await fetch(apiPath, fetchOptions);
    if (r.ok) return r.json();
    // if 4xx/5xx but not 404, return parsed body (so frontend can show error)
    if (r.status !== 404) return r.json();
    // else fallthrough to try rawPath
  } catch (err) {
    // network error for apiPath -> try rawPath
  }

  // try raw path
  const r2 = await fetch(rawPath, fetchOptions);
  if (r2.ok) return r2.json();
  // if not ok, try to parse body for error message
  try { return r2.json(); } catch (e) { throw new Error("Network error"); }
}

export async function fetchServicesAPI() {
  return tryBoth("/services", { method: "GET" });
}

// signupAPI accepts object payload
export async function signupAPI(payload) {
  return tryBoth("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

/**
 * loginAPI accepts either:
 * - loginAPI({ email, password })
 * - loginAPI(email, password)
 */
export async function loginAPI(arg1, arg2) {
  let payload;
  if (typeof arg1 === "string" && typeof arg2 === "string") {
    payload = { email: arg1, password: arg2 };
  } else {
    payload = arg1;
  }

  return tryBoth("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export const paymentsAPI = {
  pay: async (payload) => {
    return tryBoth("/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
};

export const bookingsAPI = {
  getForUser: async (userId) => {
    return tryBoth(`/bookings/${userId}`, { method: "GET" });
  },
  updateStatus: async (id, status) => {
    return tryBoth(`/bookings/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  },
};
