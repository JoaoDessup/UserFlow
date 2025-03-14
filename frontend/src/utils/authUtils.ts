export const saveToken = (token: string) => {
  const expiresAt = new Date().getTime() + 60 * 60 * 1000; // 1 hora
  localStorage.setItem('token', token);
  localStorage.setItem('expiresAt', expiresAt.toString());
};

export const getToken = (): string | null => {
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('expiresAt');

  if (!token || !expiresAt) return null;

  const now = new Date().getTime();
  if (now > Number(expiresAt)) {
    clearToken(); // Token expirado, remove
    return null;
  }

  return token;
};

export const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiresAt');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
