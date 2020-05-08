import * as types from '../../actionType';
import { sessionService } from '../../../services/sessionsService';

export const sessionAction = (mentorId, questions) => {
  return {
    type: types.REQUEST_SESSIONS,
    payload: sessionService(mentorId, questions)
  }
}
