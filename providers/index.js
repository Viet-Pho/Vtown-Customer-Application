import axios from 'axios';
import { AsyncStorage } from 'react-native';

const jwtAxios = axios.create({
  baseURL: 'http://admin.vtowns.com.au/api',
  // baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);
export const setAuthToken = async (token) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    await AsyncStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    await AsyncStorage.removeItem('token');
  }
};

export default jwtAxios;
