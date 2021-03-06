import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { Alert, Rating } from "@material-ui/lab";
import useStyles from "../styles/sessionStyles";
import { useDispatch, useSelector } from "react-redux";
import { viewSessionAction } from "../redux/actions/sessions/sessionAction";
import { mentorsAction } from "../redux/actions/users/userAction";
import { Formik } from "formik";
import { reviewAction } from "../redux/actions/review/reviewAction";
import Loading from "./Loading";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const Sessions = () => {
  if (!sessionStorage.getItem("id")) {
    return <Redirect to="/login" />;
  }

  if (sessionStorage.getItem("userType") === "2") {
    return <Redirect to="/dashboard" />;
  }

  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(true);
  const [sessionId, setSessionId] = useState();
  const [unlock, setUnlock] = useState(false);
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(-1);
  const [remark, setRemark] = useState();
  const [error, setError] = useState();
  const [unroll, setUnroll] = useState(true);

  const sessionReducer = useSelector((state) => state.viewSessions);
  const sessions = [...sessionReducer.data];

  const mentorsReducer = useSelector((state) => state.mentors);
  const mentors = [...mentorsReducer.data];

  const review = useSelector((state) => state.review);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const closeSuccessMessage = () => {
    setUnroll(!unroll);
  };

  useEffect(() => {
    dispatch(viewSessionAction());
    dispatch(mentorsAction());
  }, []);

  const handleClick = (sessionId) => {
    setSessionId(sessionId);
    setUnlock(true);
  };

  const closeReview = () => {
    setUnlock(false);
  };

  const handleValue = (event, newScore) => {
    setScore(newScore);
  };

  const handleRemark = (e) => {
    setRemark(e.target.value);
  };

  const handleChangeActive = (event, newHover) => {
    setHover(newHover);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (remark.length < 3) {
      setError("Remark length should be at least 3 characters long");
    } else {
      dispatch(reviewAction(sessionId, { score, remark }));
    }
  };

  if (review.redirect) {
    sessionStorage.setItem("success", review.message);
    location.href = "/sessions";
  }

  return (
    <div>
      <Snackbar
        open={open && sessionStorage.getItem("message") !== ""}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="success" onClose={handleClose}>
          {sessionStorage.getItem("message")}
        </Alert>
      </Snackbar>
      <Snackbar
        open={unroll && review.message !== ""}
        autoHideDuration={6000}
        onClose={closeSuccessMessage}
      >
        <Alert severity="success" onClose={closeSuccessMessage}>
          {sessionStorage.getItem("success")}
        </Alert>
      </Snackbar>
      <Grid container justify="center">
        <Typography variant="h4" className={classes.componentTitle}>
          Sessions Request list table
        </Typography>
        <Grid item md={10}>
          <Paper>
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headTitle}>
                      Mentor Names
                    </TableCell>
                    <TableCell className={classes.headTitle}>
                      Questions
                    </TableCell>
                    <TableCell className={classes.headTitle}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sessions.length === 0 ? (
                    <TableRow>
                      <TableCell>
                        No data to display, you have not requested a session
                      </TableCell>
                    </TableRow>
                  ) : (
                    sessions
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((session) => {
                        const mentor = mentors.find(
                          (mentor) => mentor.id === session.mentorid
                        );
                        return (
                          <TableRow key={session.sessionid}>
                            <TableCell>
                              {mentor && mentor.first_name} &nbsp;
                              {mentor && mentor.last_name}
                            </TableCell>
                            <TableCell>{session.questions}</TableCell>
                            {session.status === "pending" ? (
                              <TableCell className={classes.pending}>
                                {session.status}
                              </TableCell>
                            ) : session.status === "accepted" ? (
                              <TableCell
                                className={classes.accepted}
                                onClick={() => handleClick(session.sessionid)}
                              >
                                {session.status}
                              </TableCell>
                            ) : session.status === "rejected" ? (
                              <TableCell className={classes.rejected}>
                                {session.status}
                              </TableCell>
                            ) : (
                              ""
                            )}
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
              count={sessions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
        <Dialog open={unlock} onClose={closeReview}>
          <DialogTitle className={classes.dialogTitle}>
            Review this session
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className={classes.root}>
                <label className={classes.label}>Score:</label>
                <Rating
                  precision={1}
                  value={score}
                  name="score"
                  id="score"
                  onChange={handleValue}
                  onChangeActive={handleChangeActive}
                />
                {score !== null && (
                  <Box ml={2}>{labels[hover !== -1 ? hover : score]}</Box>
                )}
              </div>
              <TextField
                label="Remark"
                variant="outlined"
                fullWidth
                name="remark"
                id="remark"
                onChange={handleRemark}
                error={error && error !== ""}
                helperText={error}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!remark || !score || review.loading}
                className={classes.submit}
              >
                {review.loading ? (
                  <>
                    Loading
                    <Loading />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
};

export default Sessions;
