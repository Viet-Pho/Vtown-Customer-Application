import jwtAxios from '../providers/index';

export const axiosGet = (url, query = null) => {
  return jwtAxios.get(url, {params: query});
};

export const axiosPost = (url, body) => {
  return jwtAxios.post(url, body);
};

export const axiosPatch = (url, query) => {
  return jwtAxios.patch(url, query);
};

export const axiosDelete = (url, query) => {
  return jwtAxios.delete(url, query);
};

export const axiosPut = (url, query) => {
  return jwtAxios.put(url, query);
};