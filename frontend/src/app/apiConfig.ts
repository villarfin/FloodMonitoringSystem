function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL;
  if (configured) return configured.replace(/\/$/, "");

  if (typeof window !== "undefined" && window.location.hostname.endsWith(".vercel.app")) {
    console.warn("Missing VITE_API_BASE_URL. Configure it in Vercel to your public backend API URL.");
  }

  if (typeof window === "undefined") {
    return "http://127.0.0.1:8000/api";
  }

  return `${window.location.protocol}//${window.location.hostname}:8000/api`;
}

export const API_BASE_URL = getApiBaseUrl();
