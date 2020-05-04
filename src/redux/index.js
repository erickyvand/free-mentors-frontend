import { combineReducers } from 'redux';
import signupReducer from './reducers/auth/signupReducer';
import signinReducer from './reducers/auth/signinReducer';
import { mentorReducer } from './reducers/users/mentorReducer';

const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer,
  mentors: mentorReducer
});

export default rootReducer;
