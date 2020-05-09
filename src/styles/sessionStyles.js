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
    margin: theme.spacing(4)
  },
  pending: {
    color: "#352c7d"
  },
  accepted: {
    color: "#2a5c21"
  },
  rejected: {
    color: "#78251a"
  }
}));

export default useStyles;
