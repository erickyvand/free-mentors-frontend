import { pending, fulfilled, rejected } from "../../../helpers/utils";
import * as types from "../../actionType";

const initialState = {
  loading: false,
  message: "",
  error: "",
};

const acceptReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.ACCEPT):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.ACCEPT):
      return {
        ...state,
        loading: false,
        message: action.payload.data.message,
      };
    case rejected(types.ACCEPT):
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    default:
      return state;
  }
};

export default acceptReducer;
