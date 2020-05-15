import React, { useState } from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/headerStyles";
import {
  Grid,
  CssBaseline,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PeopleIcon from "@material-ui/icons/People";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import NoteIcon from "@material-ui/icons/Note";
import HomeIcon from "@material-ui/icons/Home";
import { Switch, Route, Link } from "react-router-dom";
import Mentors from "./Mentors";
import UpdateRole from "./UpdateRole";
import Mentor from "./Mentor";
import Sessions from "./Sessions";
import Requests from "./Requests";
import Home from "./Home";

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState("");
  const [open, setOpen] = useState(false);

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const clearMessage = () => {
    sessionStorage.setItem("message", "");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {sessionStorage.getItem("id") && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Grid container component="main">
            <CssBaseline />
            <Grid item md={10} xs={12} sm={12}>
              <Typography variant="h6">Free Mentors&nbsp;</Typography>
            </Grid>
            <Grid item md={2} xs={12} sm={12}>
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
        </Toolbar>
      </AppBar>
      {sessionStorage.getItem("id") && (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/home" className={classes.itemText}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            {sessionStorage.getItem("userType") === "1" && (
              <Link to="/update-role" className={classes.itemText}>
                <ListItem button>
                  <ListItemIcon>
                    <AccessibilityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Update Role" />
                </ListItem>
              </Link>
            )}
            {sessionStorage.getItem("userType") !== "2" && (
              <>
                <Link to="/mentors" className={classes.itemText}>
                  <ListItem button>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Mentors" />
                  </ListItem>
                </Link>
                <Link
                  to="/sessions"
                  onClick={clearMessage}
                  className={classes.itemText}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <NoteIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Requests" />
                  </ListItem>
                </Link>
              </>
            )}
            {sessionStorage.getItem("userType") === "2" && (
              <Link to="/requests" className={classes.itemText}>
                <ListItem button>
                  <ListItemIcon>
                    <NoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Requests" />
                </ListItem>
              </Link>
            )}
          </List>
        </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/mentors" exact component={Mentors} />
          <Route path="/home" exact component={Home} />
          <Route path="/update-role" exact component={UpdateRole} />
          <Route path="/mentor/:id" exact component={Mentor} />
          <Route path="/sessions" exact component={Sessions} />
          <Route path="/requests" exact component={Requests} />
        </Switch>
      </main>
    </div>
  );
};

export default Header;
