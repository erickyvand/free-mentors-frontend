import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: "5px 2px 50px -16px gray",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    border: "1px solid gray",
    borderRadius: "20px",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  linkGrid: {
    backgroundColor: "#3d4c63",
    width: "100%",
    "&:hover": {
      opacity: 0.8
    }
  },
  linkText: {
    textDecoration: "none",
    display: "block",
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold"
  },
  avatar: {
    width: 200,
    height: 200,
    margin: "auto"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  dialogTitle: {
    width: 400
  }
}));

export default useStyles;
