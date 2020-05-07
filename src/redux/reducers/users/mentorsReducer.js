import * as types from "../../actionType";
import { pending, fulfilled, rejected } from "../../../helpers/utils";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const mentorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.MENTORS):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.MENTORS):
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
      };
    case rejected(types.MENTORS):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default mentorsReducer;
