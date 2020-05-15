import { pending, fulfilled, rejected } from "../../../helpers/utils";
import * as types from "../../actionType";

const initialState = {
  loading: false,
  message: "",
  error: "",
};

const rejectReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.REJECT):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.REJECT):
      return {
        ...state,
        loading: false,
        message: action.payload.data.message,
      };
    case rejected(types.REJECT):
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    default:
      return state;
  }
};

export default rejectReducer;
