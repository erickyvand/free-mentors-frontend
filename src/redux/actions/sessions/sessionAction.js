import * as types from '../../actionType';
import { sessionService, viewSessionService } from '../../../services/sessionsService';

export const sessionAction = (mentorId, questions) => {
  return {
    type: types.REQUEST_SESSIONS,
    payload: sessionService(mentorId, questions)
  }
}

export const viewSessionAction = () => {
  return {
    type: types.VIEW_SESSIONS,
    payload: viewSessionService()
  }
}
