import fetch from "./fetchService";

export const reviewService = (sessionId, data) => {
  const result = fetch.post(`/api/v2/sessions/${sessionId}/review`, data);
  return result;
};

export const viewReviewService = () => {
  const result = fetch.post("/api/v2/sessions/1/review");
  return result;
};

export const deleteReviewService = (reviewId) => {
  const result = fetch.delete(`/api/v2/sessions/${reviewId}/review`);
  return result;
};
