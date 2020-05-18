import * as types from "../../actionType";
import { pending, fulfilled } from "../../../helpers/utils";

const initialState = {
  loading: false,
  data: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.USERS):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.USERS):
      return {
        ...state,
        data: action.payload.data.users,
      };
    default:
      return state;
  }
};

export default usersReducer;
