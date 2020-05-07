import * as types from '../../actionType';
import { mentorsServive, mentorService } from '../../../services/usersService';

export const mentorsAction = () => {
  return {
    type: types.MENTORS,
    payload: mentorsServive()
  }
}

export const mentorAction = id => {
  return {
    type: types.MENTOR,
    payload: mentorService(id)
  }
}
