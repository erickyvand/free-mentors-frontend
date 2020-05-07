import fetch from './fetchService';

export const mentorsServive = () => {
  const result = fetch.get('/api/v2/mentors');
  return result;
}
