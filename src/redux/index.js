import { combineReducers } from 'redux';
import signupReducer from './reducers/auth/signupReducer';
import signinReducer from './reducers/auth/signinReducer';

const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer
});

export default rootReducer;
