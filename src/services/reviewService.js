import fetch from "./fetchService";

export const reviewService = (sessionId, data) => {
  const result = fetch.post(`/api/v2/sessions/${sessionId}/review`, data);
  return result;
};
