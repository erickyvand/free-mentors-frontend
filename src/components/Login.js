import React, { useState } from "react";
import useStyles from "../styles/signupStyle";
import {
  Grid,
  CssBaseline,
  Paper,
  Avatar,
  Typography,
  Container,
  TextField,
  Button,
  Collapse,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { signinSchema } from "../validation/validationSchema";
import { signinAction } from "../redux/actions/auth/authAction";
import Loading from "./Loading";
import Dashboard from "./Dashboard";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const signupReducer = useSelector((state) => state.signup);
  const signin = useSelector((state) => state.signin);

  const [open, setOpen] = useState(true);
  const [unlock, setUnlock] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const closeError = () => {
    setUnlock(!unlock);
  };

  const handleDisable = (props, signin) => {
    if (!props.values.email || !props.values.password || signin.loading) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (values) => {
    dispatch(signinAction(values));
    setUnlock(true);
  };

  if (signin.redirect) {
    sessionStorage.setItem('id', signin.data.id);
    sessionStorage.setItem('firstName', signin.data.firstName);
    sessionStorage.setItem('lastName', signin.data.lastName);
    sessionStorage.setItem('userType', signin.data.userType);
    sessionStorage.setItem('token', signin.data.token);
    window.location.href = '/dashboard';
  }

  return (
    <div className={classes.root}>
      <Container>
        <Grid container component="main">
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Snackbar
                open={unlock && signin.error !== ""}
                autoHideDuration={6000}
                onClose={closeError}
              >
                <Alert severity="error" onClose={closeError}>{signin.error}</Alert>
              </Snackbar>
              <Collapse in={open}>
                {signupReducer.message && (
                  <Alert severity="success" onClose={handleClose}>
                    {signupReducer.message}
                  </Alert>
                )}
              </Collapse>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={signinSchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                {(props) => (
                  <form
                    className={classes.form}
                    onSubmit={props.handleSubmit}
                    noValidate
                  >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      type="text"
                      onChange={props.handleChange("email")}
                      value={props.values.email}
                      error={
                        props.values.email !== "" &&
                        Object.prototype.hasOwnProperty.call(
                          props.errors,
                          "email"
                        )
                      }
                      helperText={props.errors.email && props.errors.email}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      onChange={props.handleChange("password")}
                      value={props.values.password}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={handleDisable(props, signin)}
                      className={classes.submit}
                    >
                      {signin.loading ? (
                        <>
                          Loading <Loading />
                        </>
                      ) : (
                        "Signin"
                      )}
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <span>
                          Don't have an account?
                          <Link to="/" className={classes.linkText}>
                            Signup
                          </Link>
                        </span>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
