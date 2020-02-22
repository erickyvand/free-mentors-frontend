import React, { Component } from 'react';
import Image from '../assets/image1.png';

class Home extends Component{
  state = {
    redirect: false
  }

  componentDidMount() {
    if(sessionStorage.getItem('firstName')) {
      console.log('you are in');
    } else {
      this.setState({
        redirect: true
      });
    }
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-6">
              <img src={Image} alt=""/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4>Overview</h4>
              <p>Free Mentor is a platform where Mentors deliver free sessions to users to help them upgrade their knwoledges.</p>
              <p>A mentor is someone who sees more talent and ability within you, than you see in yourself, and helps bring it out of you.</p>
              <p>If you can write "<strong>Hello World</strong>" you can change the world. It's to you to change the world</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home;
