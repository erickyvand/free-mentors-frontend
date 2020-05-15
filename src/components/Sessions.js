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
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useStyles from "../styles/sessionStyles";
import { useDispatch, useSelector } from "react-redux";
import { viewSessionAction } from "../redux/actions/sessions/sessionAction";
import { mentorsAction } from "../redux/actions/users/userAction";

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

  const sessionReducer = useSelector((state) => state.viewSessions);
  const sessions = [...sessionReducer.data];

  const mentorsReducer = useSelector((state) => state.mentors);
  const mentors = [...mentorsReducer.data];

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

  useEffect(() => {
    dispatch(viewSessionAction());
    dispatch(mentorsAction());
  }, []);

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
                              <TableCell className={classes.accepted}>
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
      </Grid>
    </div>
  );
};

export default Sessions;
