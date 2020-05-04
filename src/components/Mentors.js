import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { mentorsAction } from "../redux/actions/users/userAction";
import { Grid, Paper, Typography, Avatar } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import useStyles from "../styles/mentorStyles";
import Pagination from "./Pagination";

const Mentors = () => {
  if (!sessionStorage.getItem("id")) {
    return <Redirect to='/login' />
  }

  const classes = useStyles();
  const dispatch = useDispatch();

  const mentorsReducer = useSelector((state) => state.mentors);
  const mentors = [...mentorsReducer.data];

  const [currentPage, setCurrentPage] = useState(1);
  const [mentorsPerPage] = useState(16);

  const indexOfLastPage = currentPage * mentorsPerPage;
  const indexOfFirstPage = indexOfLastPage - mentorsPerPage;
  const currentMentors = mentors.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(mentorsAction());
  }, []);
  return (
    <div>
      <Grid container spacing={2}>
        {mentors.length === 0
          ? [...new Array(12)].map((value, index) => (
              <React.Fragment key={index}>
                <Grid item md={3} xs={12}>
                  <Paper className={classes.paper}>
                    <Grid
                      container
                      direction="column"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Grid item>
                        <Avatar src="">
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={40}
                            height={80}
                          />
                        </Avatar>
                      </Grid>
                      <Grid item>
                        <Skeleton animation="wave" variant="text" width={250} />
                      </Grid>
                      <Grid item>
                        <Skeleton animation="wave" variant="text" width={250} />
                      </Grid>
                      <Grid item>
                        <Skeleton animation="wave" variant="text" width={250} />
                      </Grid>
                      <Grid item>
                        <Skeleton animation="wave" variant="text" width={250} />
                      </Grid>
                      <Grid item>
                        <Skeleton animation="wave" variant="text" width={250} />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </React.Fragment>
            ))
          : currentMentors.map((mentor) => (
              <React.Fragment key={mentor.id}>
                <Grid item md={3} xs={12}>
                  <Paper className={classes.paper}>
                    <Grid
                      container
                      direction="column"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Grid item>
                        <Avatar src="https://source.unsplash.com/random">
                          {mentor.first_name.charAt(0)}
                        </Avatar>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          First Name: {mentor.first_name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          Last Name: {mentor.last_name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          Email: {mentor.email}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          Address: {mentor.address}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Link to="#">View Details</Link>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </React.Fragment>
            ))}
        <Grid container direction="row" justify="center">
          <Grid item md={11} xs={11}>
            Page {currentPage} / {Math.ceil(mentors.length / mentorsPerPage)}
          </Grid>
          <Grid container justify="center">
            <Pagination
              itemsPerPage={mentorsPerPage}
              totalItems={mentors.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Mentors;
