import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: 'lightgrey',
    height: '40px'
  },
  footerText: {
    textAlign: 'center',
    marginTop: '8px'
  }
});

export default useStyles;
