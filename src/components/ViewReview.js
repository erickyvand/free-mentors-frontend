import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  viewReviewAction,
  deleteReviewAction,
} from "../redux/actions/review/reviewAction";
import {
  Grid,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "../styles/sessionStyles";
import { mentorsAction } from "../redux/actions/users/userAction";

const ViewReview = () => {
  if (!sessionStorage.getItem("id")) {
    return <Redirect to="/login" />;
  }

  if (sessionStorage.getItem("userType") !== "1") {
    return <Redirect to="/home" />;
  }

  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reviewId, setReviewId] = useState();
  const [open, setOpen] = useState(false);
  const [unlock, setUnlock] = useState(true);

  const reviewReducer = useSelector((state) => state.viewReview);
  const reviews = [...reviewReducer.data];

  const mentorReducer = useSelector((state) => state.mentors);
  const mentors = [...mentorReducer.data];

  const message = useSelector((state) => state.deleteReview.message);
  const redirect = useSelector((state) => state.deleteReview.redirect);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(viewReviewAction());
    dispatch(mentorsAction());
  }, [message]);

  const handleClick = (reviewId) => {
    setReviewId(reviewId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (reviewId) => {
    dispatch(deleteReviewAction(reviewId));
    setOpen(false);
    setUnlock(true);
  };

  const closeMessage = () => {
    setUnlock(!unlock);
  };

  return (
    <Grid container justify="center">
      <Snackbar
          open={unlock && message !== ""}
          autoHideDuration={6000}
          onClose={closeMessage}
        >
          <Alert severity="success" onClose={closeMessage}>
            {message}
          </Alert>
        </Snackbar>
      <Typography variant="h4" className={classes.componentTitle}>
        List of reviews from Mentees
      </Typography>
      <Grid item md={10}>
        <Paper>
          <TableContainer className={classes.container}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headTitle}>
                    Mentee Names
                  </TableCell>
                  <TableCell className={classes.headTitle}>
                    Mentor Names
                  </TableCell>
                  <TableCell className={classes.headTitle}>Remark</TableCell>
                  <TableCell className={classes.headTitle}>Score</TableCell>
                  <TableCell className={classes.headTitle}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.length === 0 ? (
                  <TableRow>
                    <TableCell>No data to display</TableCell>
                  </TableRow>
                ) : (
                  reviews
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((review) => {
                      const mentor = mentors.find(
                        (mentor) => mentor.id === review.mentorid
                      );
                      return (
                        <TableRow key={review.id}>
                          <TableCell>
                            {review && review.firstname} &nbsp;
                            {review && review.lastname}
                          </TableCell>
                          <TableCell>
                            {mentor && mentor.first_name} &nbsp;
                            {mentor && mentor.last_name}
                          </TableCell>
                          <TableCell>{review.remark}</TableCell>
                          <TableCell>{review.score}</TableCell>
                          <TableCell>
                            <Button
                              color="secondary"
                              onClick={() => handleClick(review.id)}
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={reviews.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              {"Are you sure you want to delete this review?"}
            </DialogTitle>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(reviewId)}
              >
                Delete
              </Button>
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ViewReview;
