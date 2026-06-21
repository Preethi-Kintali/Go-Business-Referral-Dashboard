import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("jwt_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("jwt_token");
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/signin`, { email, password });
  const data = response.data?.data;
  if (data?.token) {
    Cookies.set("jwt_token", data.token, { expires: 7 });
    return data;
  }
  throw new Error("No token received");
};

export const logout = () => {
  Cookies.remove("jwt_token");
};

export const fetchDashboardData = async (search, sort) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (sort) params.append("sort", sort);
  
  const response = await api.get(`/referrals?${params.toString()}`);
  return response.data?.data || response.data;
};

export const fetchReferralById = async (id) => {
  const response = await api.get(`/referrals?id=${id}`);
  const data = response.data?.data || response.data;

  if (data?.referrals && Array.isArray(data.referrals)) {
    const ref = data.referrals.find((r) => String(r.id) === String(id));
    if (ref) return ref;
    if (data.referrals.length === 0) throw new Error("Referral not found");
    return data.referrals[0];
  }
  if (Array.isArray(data)) {
    const ref = data.find((r) => String(r.id) === String(id));
    if (ref) return ref;
    if (data.length === 0) throw new Error("Referral not found");
    return data[0];
  }
  if (data && data.id) return data;
  throw new Error("Referral not found");
};
