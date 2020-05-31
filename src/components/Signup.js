import React from "react";
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
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link, Redirect } from "react-router-dom";
import { Formik } from "formik";
import { signupShcema } from "../validation/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../redux/actions/auth/authAction";
import Loading from "./Loading";

export const handleDisable = (props, signupReducer) => {
  if (
    !props.values.first_name ||
    !props.values.last_name ||
    !props.values.email ||
    !props.values.password ||
    !props.values.address ||
    !props.values.bio ||
    !props.values.occupation ||
    !props.values.expertise ||
    signupReducer.loading
  ) {
    return true;
  } else {
    return false;
  }
};

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const signupReducer = useSelector((state) => state.signup);

  const handleSubmit = (values) => {
    dispatch(signupAction(values));
  };

  if (signupReducer.redirect) {
    return <Redirect to="/login" />;
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
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Formik
                validationSchema={signupShcema}
                initialValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  password: "",
                  address: "",
                  bio: "",
                  occupation: "",
                  expertise: "",
                }}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                {(props) => (
                  <form
                    onSubmit={props.handleSubmit}
                    className={classes.form}
                    noValidate
                  >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      id="first_name"
                      label="First Name"
                      name="first_name"
                      type="text"
                      onChange={props.handleChange("first_name")}
                      value={props.values.first_name}
                      autoComplete="first_name"
                      autoFocus
                      error={
                        props.values.first_name !== "" &&
                        Object.prototype.hasOwnProperty.call(
                          props.errors,
                          "first_name"
                        )
                      }
                      helperText={
                        props.values.first_name !== "" &&
                        props.errors.first_name
                      }
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      onChange={props.handleChange("last_name")}
                      value={props.values.last_name}
                      autoComplete="last_name"
                      error={
                        props.values.last_name !== "" &&
                        Object.prototype.hasOwnProperty.call(
                          props.errors,
                          "last_name"
                        )
                      }
                      helperText={
                        props.values.last_name !== "" && props.errors.last_name
                      }
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      id="email"
                      label="Email"
                      name="email"
                      type="text"
                      onChange={props.handleChange("email")}
                      value={props.values.email}
                      autoComplete="email"
                      error={
                        props.values.email !== "" &&
                        Object.prototype.hasOwnProperty.call(
                          props.errors,
                          "email"
                        )
                      }
                      helperText={
                        props.values.email !== "" && props.errors.email
                      }
                    />
                    <Typography color="error">{signupReducer.error}</Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      onChange={props.handleChange("password")}
                      value={props.values.password}
                      autoComplete="password"
                      error={
                        props.values.password !== "" &&
                        Object.prototype.hasOwnProperty.call(
                          props.errors,
                          "password"
                        )
                      }
                      helperText={
                        props.values.password !== "" && props.errors.password
                      }
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      id="address"
                      label="Address"
                      name="address"
                      onChange={props.handleChange("address")}
                      value={props.values.address}
                      autoComplete="address"
                      error={
                        props.values.address !== "" &&
                        Object.prototype.hasOwnProperty.call(
                          props.errors,
                          "address"
                        )
                      }
                      helperText={
                        props.values.address !== "" && props.errors.address
                      }
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      id="bio"
                      label="Bio"
                      name="bio"
                      onChange={props.handleChange("bio")}
                      value={props.values.bio}
                      autoComplete="bio"
                      error={
                        props.values.bio !== "" &&
                        Object.prototype.hasOwnProperty.call(
                          props.errors,
                          "bio"
                        )
                      }
                      helperText={props.values.bio !== "" && props.errors.bio}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      id="occupation"
                      label="Occupation"
                      name="occupation"
                      onChange={props.handleChange("occupation")}
                      value={props.values.occupation}
                      autoComplete="occupation"
                      error={
                        props.values.occupation !== "" &&
                        Object.prototype.hasOwnProperty.call(
                          props.errors,
                          "occupation"
                        )
                      }
                      helperText={
                        props.values.occupation !== "" &&
                        props.errors.occupation
                      }
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      id="expertise"
                      label="Expertise"
                      name="expertise"
                      onChange={props.handleChange("expertise")}
                      value={props.values.expertise}
                      autoComplete="expertise"
                      error={
                        props.values.expertise !== "" &&
                        Object.prototype.hasOwnProperty.call(
                          props.errors,
                          "expertise"
                        )
                      }
                      helperText={
                        props.values.expertise !== "" && props.errors.expertise
                      }
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={handleDisable(props, signupReducer)}
                      className={classes.submit}
                      data-test="signupButton"
                    >
                      {signupReducer.loading ? (
                        <>
                          Loading <Loading />
                        </>
                      ) : (
                        "Signup"
                      )}
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <span>
                          Already have an account?
                          <Link to="/login" className={classes.linkText}>
                            Signin
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

export default Signup;
