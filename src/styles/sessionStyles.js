import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headTitle: {
    fontWeight: "bold",
    fontSize: "1.3em",
  },
  container: {
    maxHeight: 440,
  },
  componentTitle: {
    margin: theme.spacing(4),
  },
  pending: {
    color: "#352c7d",
    cursor: "not-allowed",
  },
  accepted: {
    color: "#2a5c21",
    cursor: "pointer",
  },
  rejected: {
    color: "#78251a",
    cursor: "not-allowed",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  dialogTitle: {
    width: 460,
  },
  label: {
    fontSize: "1.2em",
    fontWeight: "bold",
    margin: theme.spacing(1),
  },
  root: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;
