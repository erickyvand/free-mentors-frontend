import * as types from "../../actionType";
import { pending, fulfilled } from "../../../helpers/utils";
import Loading from "../../../components/Loading";

const initialState = {
  loading: false,
  data: [],
};

const viewReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.VIEW_REVIEW):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.VIEW_REVIEW):
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
      };
    default:
      return state;
  }
};

export default viewReviewReducer;
