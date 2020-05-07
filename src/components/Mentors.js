import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { mentorsAction } from "../redux/actions/users/userAction";
import { Grid, Paper, Typography, Avatar, InputBase } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "../styles/mentorStyles";
import Pagination from "./Pagination";

const Mentors = () => {
  if (!sessionStorage.getItem("id")) {
    return <Redirect to="/login" />;
  }

  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const mentorsReducer = useSelector((state) => state.mentors);
  const mentors = [...mentorsReducer.data];

  const mentorResults = mentors.filter(
    (mentor) => mentor.first_name.indexOf(value) !== -1
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [mentorsPerPage] = useState(16);

  const indexOfLastPage = currentPage * mentorsPerPage;
  const indexOfFirstPage = indexOfLastPage - mentorsPerPage;
  const currentMentors = mentorResults.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(mentorsAction());
  }, []);

  console.log(mentorResults);
  const searchMentor = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={9} xs={12}>
          <Typography variant="h4">List of available mentors</Typography>
        </Grid>
        <Grid item md={3} xs={12}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={searchMentor}
            />
          </div>
        </Grid>
        {mentors.length === 0 ? (
          [...new Array(12)].map((value, index) => (
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
        ) : currentMentors.length === 0 ? (
          <Grid container justify="center">
            <Typography variant="h6">No Results found</Typography>
          </Grid>
        ) : (
          currentMentors.map((mentor) => (
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
                    <Grid item className={classes.linkGrid}>
                      <Link
                        to={`mentor/${mentor.id}`}
                        className={classes.linkText}
                      >
                        View Details
                      </Link>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </React.Fragment>
          ))
        )}
        {currentMentors.length === 0 ? (
          ""
        ) : (
          <Grid container direction="row" justify="center">
            <Grid item md={11} xs={11}>
              Page {currentPage} / {Math.ceil(mentorResults.length / mentorsPerPage)}
            </Grid>
            <Grid container justify="center">
              <Pagination
                itemsPerPage={mentorsPerPage}
                totalItems={mentorResults.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Mentors;
