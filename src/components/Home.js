import React from "react";
import { Redirect } from "react-router-dom";

const Home = () => {
  if (!sessionStorage.getItem("id")) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <h4>Overview</h4>
          <p>
            Free Mentor is a platform where Mentors deliver free sessions to
            users to help them upgrade their knwoledges.
          </p>
          <p>
            A mentor is someone who sees more talent and ability within you,
            than you see in yourself, and helps bring it out of you.
          </p>
          <p>
            If you can write "<strong>Hello World</strong>" you can change the
            world. It's to you to change the world
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
