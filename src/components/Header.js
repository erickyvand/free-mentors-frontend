import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from '../styles/headerStyles';
import { Container } from '@material-ui/core';

const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position='sticky' className={classes.appBar}>
        <Toolbar>
          <Container>
            <Typography variant='h6'>
              Free Mentors
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;
