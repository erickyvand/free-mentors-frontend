import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/headerStyles";
import {
  Container,
  Grid,
  CssBaseline,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Redirect, Link } from "react-router-dom";

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState("");

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl("");
  };

  const handleLogout = () => {
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("firstName", "");
    sessionStorage.setItem("lastName", "");
    sessionStorage.setItem("userType", "");
    sessionStorage.clear();
    window.location.href = "/login";
  };
  return (
    <div>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Container>
            <Grid container component="main">
              <CssBaseline />
              <Grid item md={10}>
                <Typography variant="h6">Free Mentors&nbsp;</Typography>
              </Grid>
              <Grid item md={2}>
                {sessionStorage.getItem("id") && (
                  <Typography variant="h6" className={classes.title}>
                    {sessionStorage.getItem("firstName")}{" "}
                    {sessionStorage.getItem("lastName")}{" "}
                    <Button
                      color="inherit"
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onMouseOver={handleClick}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onMouseOut={handleClose}
                    >
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
