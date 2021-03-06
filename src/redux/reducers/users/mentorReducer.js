import * as types from "../../actionType";
import { pending, fulfilled, rejected } from "../../../helpers/utils";

const initialState = {
  loading: false,
  data: "",
  error: "",
};

const mentorReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.MENTOR):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.MENTOR):
      return {
        ...state,
        loading: false,
        data: action.payload.data.data.Mentor,
      };
    case rejected(types.MENTOR):
      return {
        ...state,
        loading: false,
        error: action.payload.response.error,
      };
    default:
      return state;
  }
};

export default mentorReducer;
