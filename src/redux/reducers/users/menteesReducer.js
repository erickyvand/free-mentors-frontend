import { pending, fulfilled } from "../../../helpers/utils";
import * as types from "../../actionType";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const menteesReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.MENTEES):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.MENTEES):
      return {
        ...state,
        loading: false,
        data: action.payload.data.users,
      };
    default:
      return state;
  }
};

export default menteesReducer;
