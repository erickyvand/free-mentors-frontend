import fetch from "./fetchService";

export const mentorsServive = () => {
  const result = fetch.get("/api/v2/mentors");
  return result;
};

export const mentorService = (id) => {
  const result = fetch.get(`/api/v2/mentors/${id}`);
  return result;
};

export const menteesService = () => {
  const result = fetch.get("/api/v2/mentees");
  return result;
};

export const userRoleService = (userId) => {
  const result = fetch.patch(`/api/v2/user/${userId}`);
  return result;
};
