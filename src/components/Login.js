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
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const classes = useStyles();

  const signupReducer = useSelector((state) => state.signup);

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

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
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  size="small"
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
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
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Signin
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
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
