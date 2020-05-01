import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from '../styles/footerStyles';

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Typography variant='subtitle2' align='center' className={classes.footerText}>
        Free-Mentors &copy; ErickyVAnd {new Date().getFullYear()}
      </Typography>
    </div>
  )
}

export default Footer;
