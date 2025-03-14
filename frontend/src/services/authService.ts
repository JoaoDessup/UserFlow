import api from './api';
import { AuthResponse } from '../types/AuthResponse';

export const loginUser = async (data: { email: string; password: string }) => {
  return await api.post<AuthResponse>('/user/login', data);
};

export const registerUser = async (data: any) => {
  return await api.post('/user/add', data);
};
