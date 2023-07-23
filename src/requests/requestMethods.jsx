import axios from "axios";

const BASE_URL = "https://trackr-api.onrender.com/api";
// const BASE_URL = "http://localhost:9000/api";
// const BASE_URL = "http://192.168.2.90:9000/api";


const getCookie = (name) => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
};

const token = getCookie("_auth");

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${token}` },
});
