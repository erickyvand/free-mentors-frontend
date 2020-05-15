import { pending, fulfilled, rejected } from "../../../helpers/utils";
import * as types from "../../actionType";

const initialState = {
  loading: false,
  message: "",
};

const userRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(types.USER_ROLE):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(types.USER_ROLE):
      return {
        ...state,
        loading: false,
        message: action.payload.data.message,
      };
    default:
      return state;
  }
};

export default userRoleReducer;
