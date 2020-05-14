import { combineReducers } from "redux";
import signupReducer from "./reducers/auth/signupReducer";
import signinReducer from "./reducers/auth/signinReducer";
import mentorsReducer from "./reducers/users/mentorsReducer";
import mentorReducer from "./reducers/users/mentorReducer";
import sessionsReducer from "./reducers/sessions/sessionsReducer";
import viewSessionReducer from "./reducers/sessions/viewSessionReducer";
import menteesReducer from "./reducers/users/menteesReducer";

const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer,
  mentors: mentorsReducer,
  mentor: mentorReducer,
  sessions: sessionsReducer,
  viewSessions: viewSessionReducer,
  mentees: menteesReducer
});

export default rootReducer;
