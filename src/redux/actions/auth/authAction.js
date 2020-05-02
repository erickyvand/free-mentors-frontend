import { SIGNUP, SIGNIN } from "../../actionType";
import { signupService, loginService } from "../../../services/authService";

export const signupAction = ({
  first_name,
  last_name,
  email,
  password,
  address,
  bio,
  occupation,
  expertise,
}) => {
  return {
    type: SIGNUP,
    payload: signupService({
      first_name,
      last_name,
      email,
      password,
      address,
      bio,
      occupation,
      expertise,
    }),
  };
};

export const signinAction = ({ email, password }) => {
  return {
    type: SIGNIN,
    payload: loginService({ email, password }),
  };
};
