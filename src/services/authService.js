import fetch from './fetchService';

export const signupService = (data) => {
  const result = fetch.post('/api/v2/auth/signup', data);
  return result;
};

export const loginService = (data) => {
  const result = fetch.post('/api/v2/auth/signin', data);
  return result;
}

export const usersService = () => {
  const result = fetch.get('/api/v2/users');
  return result;
}
