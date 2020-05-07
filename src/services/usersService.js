import fetch from './fetchService';

export const mentorsServive = () => {
  const result = fetch.get('/api/v2/mentors');
  return result;
}

export const mentorService = id => {
  const result = fetch.get(`/api/v2/mentors/${id}`);
  return result;
}
