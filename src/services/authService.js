import fetchService from './fetchService';

export const signupService = (data) => {
  const result = fetchService.post('/api/v2/auth/signup', data);
  return result;
};

export const loginService = ({ email, password }) => {
  const result = fetchService.post('/api/v2/auth/signin', {
    email,
    password
  });
  return result;
}

export const usersService = () => {
  const result = fetchService.get('/api/v2/users');
  return result;
}
