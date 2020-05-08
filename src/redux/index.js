import { combineReducers } from "redux";
import signupReducer from "./reducers/auth/signupReducer";
import signinReducer from "./reducers/auth/signinReducer";
import mentorsReducer from "./reducers/users/mentorsReducer";
import mentorReducer from "./reducers/users/mentorReducer";
import sessionsReducer from "./reducers/sessions/sessionsReducer";

const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer,
  mentors: mentorsReducer,
  mentor: mentorReducer,
  sessions: sessionsReducer
});

export default rootReducer;
