import axios from "axios";

const API = axios.create({
  // Agar biz Vercel-da env o'zgaruvchisini o'rnatsak, o'shani oladi,
  // bo'lmasa localhost-da ishlayveradi (development uchun)
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
