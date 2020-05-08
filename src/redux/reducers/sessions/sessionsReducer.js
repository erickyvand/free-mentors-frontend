import * as types from "../../actionType";
import { pending, fulfilled, rejected } from "../../../helpers/utils";

const initialState = {
  loading: false,
  redirect: false,
  message: "",
  error: "",
};

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.REQUEST_SESSIONS):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.REQUEST_SESSIONS):
      console.log(action.payload.data);
      return {
        ...state,
        loading: false,
        redirect: true,
        message: action.payload,
      };
    case rejected(types.REQUEST_SESSIONS):
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    default:
      return state;
  }
};

export default sessionsReducer;
