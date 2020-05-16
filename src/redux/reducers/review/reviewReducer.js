import * as types from "../../actionType";
import { pending, fulfilled, rejected } from "../../../helpers/utils";

const initialState = {
  loading: false,
  redirect: false,
  message: '',
  data: {},
  error: "",
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.REVIEW):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.REVIEW):
      return {
        ...state,
        loading: false,
        redirect: true,
        message: action.payload.data.message,
        data: action.payload.data.data,
      };
    case rejected(types.REVIEW):
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
      };
    default:
      return state;
  }
};

export default reviewReducer;
