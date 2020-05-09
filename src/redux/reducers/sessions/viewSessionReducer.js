import * as types from "../../actionType";
import { pending, fulfilled, rejected } from "../../../helpers/utils";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const viewSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.VIEW_SESSIONS):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.VIEW_SESSIONS):
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
      };
    case rejected(types.VIEW_SESSIONS):
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    default:
      return state;
  }
};

export default viewSessionReducer;
