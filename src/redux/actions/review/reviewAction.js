import * as types from "../../actionType";
import { reviewService } from "../../../services/reviewService";

export const reviewAction = (sessionId, { score, remark }) => {
  return {
    type: types.REVIEW,
    payload: reviewService(sessionId, { score, remark }),
  };
};
