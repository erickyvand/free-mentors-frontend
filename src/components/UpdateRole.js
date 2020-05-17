import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Typography,
  InputBase,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "../styles/mentorStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  menteeAction,
  userRoleAction,
} from "../redux/actions/users/userAction";
import Skeleton from "@material-ui/lab/Skeleton";
import { Alert } from "@material-ui/lab";
import Pagination from "./Pagination";

const UpdateRole = () => {
  if (!sessionStorage.getItem("id")) {
    return <Redirect to="/login" />;
  }

  if (sessionStorage.getItem("userType") !== "1") {
    return <Redirect to="/home" />;
  }

  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [menteesPerPage] = useState(16);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [menteeId, setMenteeId] = useState();
  const [unlock, setUnlock] = useState(true);

  const menteeReducer = useSelector((state) => state.mentees);
  const mentees = [...menteeReducer.data];

  const menteeResults = mentees.filter(
    (mentee) => mentee.first_name.indexOf(value) !== -1
  );

  const message = useSelector((state) => state.userRole.message);

  const indexOfLastPage = currentPage * menteesPerPage;
  const indexOfFirstPage = indexOfLastPage - menteesPerPage;
  const currentMentees = menteeResults.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(menteeAction());
  }, [message]);

  const searchMentee = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (menteeId) => {
    setMenteeId(menteeId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateUserRole = (menteeId) => {
    dispatch(userRoleAction(menteeId));
    setOpen(false);
    setUnlock(true);
  };

  const closeMessage = () => {
    setUnlock(!unlock);
  };

  return (
    <div>
      <Grid container spacing={2}>
      <Snackbar
          open={unlock && message !== ""}
          autoHideDuration={6000}
          onClose={closeMessage}
        >
          <Alert severity="success" onClose={closeMessage}>
            {message}
          </Alert>
        </Snackbar>
        <Grid item md={9} xs={12}>
          <Typography variant="h4">
            Change User Role. Update User to Mentor
          </Typography>
        </Grid>
        <Grid item md={3} xs={12}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={searchMentee}
            />
          </div>
        </Grid>
        {mentees.length === 0 ? (
          [...new Array(12)].map((value, index) => (
            <React.Fragment key={index}>
              <Grid item md={3} xs={12}>
                <Paper className={classes.paper}>
                  <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                    spacing={1}
                  >
                    <Grid item>
                      <Avatar src="">
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={40}
                          height={80}
                        />
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Skeleton animation="wave" variant="text" width={250} />
                    </Grid>
                    <Grid item>
                      <Skeleton animation="wave" variant="text" width={250} />
                    </Grid>
                    <Grid item>
                      <Skeleton animation="wave" variant="text" width={250} />
                    </Grid>
                    <Grid item>
                      <Skeleton animation="wave" variant="text" width={250} />
                    </Grid>
                    <Grid item>
                      <Skeleton animation="wave" variant="text" width={250} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </React.Fragment>
          ))
        ) : currentMentees.length === 0 ? (
          <Grid container justify="center">
            <Typography variant="h6">No Results found</Typography>
          </Grid>
        ) : (
          currentMentees.map((mentee) => (
            <Grid item md={3} xs={12} key={mentee.id}>
              <Paper className={classes.paper}>
                <Grid
                  container
                  direction="column"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <Grid item>
                    <Avatar src="https://source.unsplash.com/random">A</Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      First Name: {mentee.first_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Last Name: {mentee.last_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Email: {mentee.email}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Address: {mentee.address}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClick(mentee.id)}
                    >
                      Change Role
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        )}
        {currentMentees.length === 0 ? (
          ""
        ) : (
          <Grid container direction="row" justify="center">
            <Grid item md={11} xs={11}>
              Page {currentPage} /{" "}
              {Math.ceil(menteeResults.length / menteesPerPage)}
            </Grid>
            <Grid container justify="center">
              <Pagination
                itemsPerPage={menteesPerPage}
                totalItems={menteeResults.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </Grid>
          </Grid>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Are you sure you want to make this user a Mentor?
          </DialogTitle>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Discard
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateUserRole(menteeId)}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default UpdateRole;
