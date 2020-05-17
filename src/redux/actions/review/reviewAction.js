import * as types from "../../actionType";
import {
  reviewService,
  viewReviewService,
  deleteReviewService,
} from "../../../services/reviewService";

export const reviewAction = (sessionId, { score, remark }) => {
  return {
    type: types.REVIEW,
    payload: reviewService(sessionId, { score, remark }),
  };
};

export const viewReviewAction = () => {
  return {
    type: types.VIEW_REVIEW,
    payload: viewReviewService(),
  };
};

export const deleteReviewAction = (reviewId) => {
  return {
    type: types.DELETE_REVIEW,
    payload: deleteReviewService(reviewId),
  };
};
