import React from "react";
import { Redirect } from "react-router-dom";
import { Typography, Grid, Link } from "@material-ui/core";

const Home = () => {
  if (!sessionStorage.getItem("id")) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Grid container spacing={2} direction="row" justify="center">
        <Grid item md={6} xs={12}>
          <Typography variant="h4">Overview</Typography>
          <p>
            The idea of developing this platform came first in August 2019, it
            was a challenge from <Link href="https://andela.com/">Andela</Link>{" "}
            Bootcamp. This was the opportinuty of joining Andela as a Software
            Developer once the application was finished. The Bootcamp took 2
            weeks where we worked on this project, we had a review from Learning
            Facilitator Assistant on daily basis. After 2 weeks of Bootcamp
            everything went well as I joined Andela, unfortunately in April 2020
            Andela decided to part company with almost all Engineers in Kigali
            Office.
          </p>
          <p>
            The Free Mentors application was developed using{" "}
            <strong>NodeJS</strong> and <strong>ExpressJS</strong> Framework at
            the backend, you can visit this{" "}
            <Link href="https://github.com/erickyvand/freeMentors">
              link to see API documentation and source code on GitHub
            </Link>
            , you can also click on this
            <Link href="https://the-freementors.herokuapp.com/api-docs/#">
              link to view the API Swagger documentation
            </Link>
          </p>
          <p>
            Since August 2019, Free Mentors had only the backend API till May
            2020 when I decided to implement the Frontend and consume the API.
            The Frontend was developed using <strong>ReactJS</strong> library,{" "}
            <strong>Redux</strong> as a state management and{" "}
            <strong>Material UI</strong> as a CSS Framework that helped me in
            design. The source code can be found on this{" "}
            <Link href="https://github.com/erickyvand/free-mentors-frontend">
              GitHub repository
            </Link>
            .
          </p>

          <Typography variant="h4">Documentation</Typography>
          <p>The Free Mentors is platform that has 3 users:</p>
          <ul>
            <li>Super Admin</li>
            <li>Mentors</li>
            <li>Mentees</li>
          </ul>
          <p>
            Super Admin has the right of updating user role, make a user a
            Mentor and also he can delete a user review
          </p>
          <p>A mentor has the right to Accept or Reject session request</p>
          <p>
            A mentee can view all mentors availabe, can view a specific mentor,
            request a session and review a mentor. You can only review a session
            which has <strong>Accepted</strong> status.
          </p>
          <p>
            When you signup, you signup as a Mentee that means you can not have
            all the right to test the functionalities of Mentor or Super Admin.
            In case you want to test other functionalities feel free to reach
            out to me at <strong>erickyvand@gmail.com</strong> to give you other
            access.
          </p>
          <p>
            Always keep in mind that,{" "}
            <i>
              If you can write "<strong>Hello World</strong>" you can change the
              world.
            </i>
          </p>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
