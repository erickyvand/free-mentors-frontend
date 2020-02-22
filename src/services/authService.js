import fetchService from './fetchService';

export const signupService = ({ first_name, last_name, email, password, address, bio, occupation, expertise }) => {
  const result = fetchService.post('/api/v2/auth/signup', {
    first_name,
    last_name,
    email,
    password,
    address,
    bio,
    occupation,
    expertise
  });
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
