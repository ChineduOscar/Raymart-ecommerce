import axios from 'axios';

const API_URL = '/api/v1/auth/';
const FLUTTERWAVE_URL = '/api/v1/checkout/';

// Register new user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// this is for flutterwave payment handling with axios
const flutterwavePayment = async (cartData) => {
  const response = await axios.post(FLUTTERWAVE_URL + 'payment', cartData);

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  flutterwavePayment,
};

export default authService;
