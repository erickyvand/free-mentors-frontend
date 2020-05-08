import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mentorAction } from "../redux/actions/users/userAction";
import {
  Grid,
  Avatar,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogContent,
  Button,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import useStyles from "../styles/mentorStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import Slide from "@material-ui/core/Slide";
import { Formik } from "formik";
import { sessionSchema } from "../validation/validationSchema";
import { sessionAction } from "../redux/actions/sessions/sessionAction";
import Loading from "./Loading";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const Mentor = (props) => {
  if (!sessionStorage.getItem("id")) {
    return <Redirect to="/login" />;
  }

  const classes = useStyles();
  const mentorId = props.match.params.id;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [unlock, setUnlock] = useState(false);

  const mentorReducer = useSelector((state) => state.mentor);
  const mentor = mentorReducer.data;

  const sessions = useSelector((state) => state.sessions);

  useEffect(() => {
    dispatch(mentorAction(mentorId));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openFormDialog = () => {
    setUnlock(true);
  };

  const closeFormDialog = () => {
    setUnlock(false);
  };

  const handleSubmit = (values) => {
    dispatch(sessionAction(mentorId, values.questions));
    // setUnlock(false);
  };

  if (sessions.redirect) {
    return <Redirect to="/sessions" />;
  }

  return (
    <div>
      <Grid container direction="row" justify="center" spacing={10}>
        <Grid item md={4} xs={12}>
          {mentorReducer.loading ? (
            <Skeleton
              style={{ margin: "auto" }}
              variant="circle"
              animation="wave"
              height={200}
              width={200}
            />
          ) : (
            <Avatar
              src="https://source.unsplash.com/random"
              className={classes.avatar}
              onClick={handleClickOpen}
              style={{ cursor: "pointer" }}
            >
              {mentor && mentor.firstName.charAt(0)}
            </Avatar>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            keepMounted
          >
            <DialogContent>
              <Avatar
                variant="square"
                src="https://source.unsplash.com/random"
                style={{ width: "100%", height: 600 }}
              ></Avatar>
            </DialogContent>
          </Dialog>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>{mentor.firstName}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Last Name</TableCell>
                    <TableCell>{mentor.lastName}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>{mentor.email}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>{mentor.address}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Bio</TableCell>
                    <TableCell>{mentor.bio}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Occupation</TableCell>
                    <TableCell>{mentor.occupation}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Expertise</TableCell>
                    <TableCell>{mentor.expertise}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={5} xs={12}>
          <Button variant="contained" color="primary" onClick={openFormDialog}>
            Request Session
          </Button>
          <Dialog open={unlock} onClose={closeFormDialog}>
            <DialogTitle className={classes.dialogTitle}>
              Request Session
            </DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{ questions: "" }}
                validationSchema={sessionSchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    <TextField
                      type="text"
                      id="questions"
                      name="questions"
                      fullWidth
                      label="Questions"
                      variant="outlined"
                      value={props.values.questions}
                      onChange={props.handleChange("questions")}
                      error={
                        props.values.questions !== "" ||
                        props.values.questions === ""
                          ? Object.prototype.hasOwnProperty.call(
                              props.errors,
                              "questions"
                            )
                          : ""
                      }
                      helperText={
                        props.errors.questions && props.errors.questions
                      }
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      type="submit"
                      disabled={!props.values.questions || sessions.loading}
                    >
                      {sessions.loading ? (
                        <>
                          Loading
                          <Loading />
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
};

export default Mentor;
