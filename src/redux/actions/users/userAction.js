import * as types from '../../actionType';
import { mentorsServive } from '../../../services/usersService';

export const mentorsAction = () => {
  return {
    type: types.MENTORS,
    payload: mentorsServive()
  }
}
