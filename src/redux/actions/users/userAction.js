import * as types from "../../actionType";
import {
  mentorsServive,
  mentorService,
  menteesService,
  userRoleService,
  usersService
} from "../../../services/usersService";

export const mentorsAction = () => {
  return {
    type: types.MENTORS,
    payload: mentorsServive(),
  };
};

export const mentorAction = (id) => {
  return {
    type: types.MENTOR,
    payload: mentorService(id),
  };
};

export const menteeAction = () => {
  return {
    type: types.MENTEES,
    payload: menteesService(),
  };
};

export const userRoleAction = (userId) => {
  return {
    type: types.USER_ROLE,
    payload: userRoleService(userId),
  };
};

export const usersAction = () => {
  return {
    type: types.USERS,
    payload: usersService(),
  };
};
