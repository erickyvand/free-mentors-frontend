import { SIGNUP } from "../../actionType";
import { signupService } from "../../../services/authService";

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
