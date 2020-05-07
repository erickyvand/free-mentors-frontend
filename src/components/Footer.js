import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/footerStyles";
import { Grid } from "@material-ui/core";

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Grid item md={12} xs={12}>
        <Typography
          variant="subtitle2"
          align="center"
          className={classes.footerText}
        >
          Free-Mentors &copy; ErickyVAnd {new Date().getFullYear()}
        </Typography>
      </Grid>
    </div>
  );
};

export default Footer;
