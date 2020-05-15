import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
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
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useStyles from "../styles/sessionStyles";
import { useSelector, useDispatch } from "react-redux";
import {
  viewSessionAction,
  acceptAction,
  rejectAction,
} from "../redux/actions/sessions/sessionAction";
import { menteeAction } from "../redux/actions/users/userAction";

const Requests = () => {
  if (!sessionStorage.getItem("id")) {
    return <Redirect to="/login" />;
  }
  if (sessionStorage.getItem("userType") !== "2") {
    return <Redirect to="/dashboard" />;
  }

  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState();
  const [unlock, setUnlock] = useState(true);
  const [unroll, setUnroll] = useState(true);

  const sessionsReducer = useSelector((state) => state.viewSessions);
  const sessions = [...sessionsReducer.data];

  const menteesReducer = useSelector((state) => state.mentees);
  const mentees = [...menteesReducer.data];

  const acceptedMessage = useSelector((state) => state.accept.message);
  const rejectedMessage = useSelector((state) => state.reject.message);

  useEffect(() => {
    dispatch(viewSessionAction());
    dispatch(menteeAction());
  }, [acceptedMessage, rejectedMessage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = () => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (sessionId) => {
    setSessionId(sessionId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = (sessionId) => {
    dispatch(acceptAction(sessionId));
    setOpen(false);
    setUnlock(true);
  };

  const handleReject = (sessionId) => {
    dispatch(rejectAction(sessionId));
    setOpen(false);
    setUnroll(true);
  };

  const closeAcceptMessage = () => {
    setUnlock(!unlock);
  };

  const closeRejectMessage = () => {
    setUnroll(!unroll);
  };

  return (
    <div>
      <Grid container justify="center">
        <Snackbar
          open={unlock && acceptedMessage !== ""}
          autoHideDuration={6000}
          onClose={closeAcceptMessage}
        >
          <Alert severity="success" onClose={closeAcceptMessage}>
            {acceptedMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={unroll && rejectedMessage !== ""}
          autoHideDuration={6000}
          onClose={closeRejectMessage}
        >
          <Alert severity="error" onClose={closeRejectMessage}>
            {rejectedMessage}
          </Alert>
        </Snackbar>
        <Typography variant="h4" className={classes.componentTitle}>
          List of requested sessions from Mentees
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
                      Questions
                    </TableCell>
                    <TableCell className={classes.headTitle}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sessions.length === 0 ? (
                    <TableRow>
                      <TableCell>No data to display</TableCell>
                    </TableRow>
                  ) : (
                    sessions.slice(page, rowsPerPage).map((session) => {
                      const mentee = mentees.find(
                        (mentee) => mentee.id === session.menteeid
                      );
                      return (
                        <TableRow key={session.sessionid}>
                          <TableCell>
                            {mentee && mentee.first_name} &nbsp;
                            {mentee && mentee.last_name}
                          </TableCell>
                          <TableCell>{session.questions}</TableCell>
                          <TableCell>
                            <Button
                              disabled={session.status !== "pending"}
                              onClick={() => handleClick(session.sessionid)}
                              color="primary"
                              variant="contained"
                            >
                              {session.status}
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
              count={sessions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                {"Which action do you want to perform?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You can choose Accept or Reject. And the action can be done
                  only once. Click outside the window to close if you don't want
                  to perform any action.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAccept(sessionId)}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleReject(sessionId)}
                >
                  Reject
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Requests;
