import { SIGNIN } from "../../actionType";
import { pending, fulfilled, rejected } from "../../../helpers/utils";

const initialState = {
  loading: false,
  redirect: false,
  data: "",
  error: "",
};

const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(SIGNIN):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(SIGNIN):
      return {
        ...state,
        loading: false,
        redirect: true,
        data: action.payload.data.data,
      };
      case rejected(SIGNIN):
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.status
      };
    default:
      return state;
  }
};

export default signinReducer;
