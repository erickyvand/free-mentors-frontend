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
} from "@material-ui/core";
import useStyles from "../styles/sessionStyles";
import { useSelector, useDispatch } from "react-redux";
import { viewSessionAction } from "../redux/actions/sessions/sessionAction";
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

  const sessionsReducer = useSelector((state) => state.viewSessions);
  const sessions = [...sessionsReducer.data];

  const menteesReducer = useSelector((state) => state.mentees);
  const mentees = [...menteesReducer.data];

  useEffect(() => {
    dispatch(viewSessionAction());
    dispatch(menteeAction());
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = () => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <Grid container justify="center">
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
                          <TableCell>{session.status}</TableCell>
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

export default Requests;
