import fetch from "./fetchService";

export const sessionService = (mentorId, questions) => {
  const result = fetch.post("/api/v2/sessions", { mentorId, questions });
  return result;
};

export const viewSessionService = () => {
  const result = fetch.get("/api/v2/sessions");
  return result;
}
