import * as types from "../../actionType";
import {
  sessionService,
  viewSessionService,
  acceptSerivice,
  rejectSerivice,
} from "../../../services/sessionsService";

export const sessionAction = (mentorId, questions) => {
  return {
    type: types.REQUEST_SESSIONS,
    payload: sessionService(mentorId, questions),
  };
};

export const viewSessionAction = () => {
  return {
    type: types.VIEW_SESSIONS,
    payload: viewSessionService(),
  };
};

export const acceptAction = (sessionId) => {
  return {
    type: types.ACCEPT,
    payload: acceptSerivice(sessionId),
  };
};

export const rejectAction = (sessionId) => {
  return {
    type: types.REJECT,
    payload: rejectSerivice(sessionId),
  };
};
