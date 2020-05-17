import * as types from "../../actionType";
import { pending, fulfilled } from "../../../helpers/utils";

const initialState = {
  loading: false,
  redirect: false,
  message: "",
};

const deleteReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.DELETE_REVIEW):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.DELETE_REVIEW):
      return {
        ...state,
        loading: false,
        redirect: true,
        message: action.payload.data.message,
      };
    default:
      return state;
  }
};

export default deleteReviewReducer;
