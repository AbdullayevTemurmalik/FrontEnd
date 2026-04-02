import axios from "axios";

const API = axios.create({
  // ESKI localhost MANZILINI O'CHIRIB, RENDER URL-NI QO'YAMIZ:
  baseURL: "https://backendproject-5bg2.onrender.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;