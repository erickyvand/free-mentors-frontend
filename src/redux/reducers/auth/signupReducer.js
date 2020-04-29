import { SIGNUP } from "../../actionType";

const initialState = {
  loading: false,
  redirect: false,
  message: "",
  error: "",
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_PENDING":
      return {
        ...state,
        loading: true,
      };
    case "SIGNUP_FULFILLED":
      return {
        ...state,
        loading: false,
        redirect: true,
        message: action.payload.data.message
      };
    case "SIGNUP_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.error,
      };
    default:
      return state;
  }
};

export default signupReducer;
