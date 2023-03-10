import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setHeaderToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestGet = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestGetId = async (endpoint, id) => {
  const { data } = await api.get(endpoint, id);
  return data;
};

export const requestPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestPatch = async (endpoint, body) => {
  const { data } = await api.patch(endpoint, body);
  return data;
};

export const requestDelete = async (endpoint, id) => {
  const { data } = await api.delete(endpoint, { params: { id } });
  return data;
};

export default api;
