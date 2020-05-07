import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mentorAction } from "../redux/actions/users/userAction";
import {
  Grid,
  Avatar,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import useStyles from "../styles/mentorStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const Mentor = (props) => {
  if (!sessionStorage.getItem("id")) {
    return <Redirect to="/login" />;
  }

  const classes = useStyles();
  const mentorId = props.match.params.id;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const mentorReducer = useSelector((state) => state.mentor);
  const mentor = mentorReducer.data;
  console.log(mentorReducer);

  useEffect(() => {
    dispatch(mentorAction(mentorId));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container direction="row" justify="center" spacing={2}>
        <Grid item md={5} xs={12}>
          {mentorReducer.loading ? (
            <Skeleton
              style={{ margin: "auto" }}
              variant="circle"
              animation="wave"
              height={200}
              width={200}
            />
          ) : (
            <Avatar
              src="https://source.unsplash.com/random"
              className={classes.avatar}
              onClick={handleClickOpen}
              style={{ cursor: "pointer" }}
            >
              {mentor && mentor.firstName.charAt(0)}
            </Avatar>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            keepMounted
          >
            <DialogContent>
              <Avatar
                variant="square"
                src="https://source.unsplash.com/random"
                style={{ width: "100%", height: 600 }}
              ></Avatar>
            </DialogContent>
          </Dialog>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>{mentor.firstName}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Last Name</TableCell>
                    <TableCell>{mentor.lastName}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>{mentor.email}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>{mentor.address}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Bio</TableCell>
                    <TableCell>{mentor.bio}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Occupation</TableCell>
                    <TableCell>{mentor.occupation}</TableCell>
                  </TableRow>
                )}
                {mentorReducer.loading ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Expertise</TableCell>
                    <TableCell>{mentor.expertise}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Mentor;
