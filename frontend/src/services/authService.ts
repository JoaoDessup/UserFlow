import api from './api';

export const loginUser = async (data: { email: string; password: string }) => {
  return await api.post('/user/login', data);
};

export const registerUser = async (data: any) => {
  return await api.post('/user/add', data);
};
