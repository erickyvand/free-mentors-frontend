import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { loginService } from '../services/authService';

class Login extends Component{
  state = {
    email: '',
    password: '',
    redirect: false,
    error: ''
  }
  render() {
    const handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value 
      });
    }

    const handleSubmit = async e => {
      e.preventDefault();
      const email = this.state.email;
      const password = this.state.password;
      const loggedIn = await loginService({ email, password });
      if (loggedIn.data.data) {
        const userData = loggedIn.data.data;
        sessionStorage.setItem('firstName', userData.firstName);
        this.setState({
          redirect: true
        });
      } else {
        
      }
    }

    if(this.state.redirect) {
      location.href = '/dashboard';
    }

    if(sessionStorage.getItem('firstName')) {
      location.href = '/dashboard';
    }
    return (
      <>
        {this.state.error}
        <div className="col-md-4 auth-form">
          <div className="card card-body">
            <h4 className="text-center mb-4">Login</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="email" onChange={handleChange} className="form-control" placeholder="Email"/>
              </div>
              <div className="form-group">
                <input type="password" name="password" onChange={handleChange} className="form-control" placeholder="Password"/>
              </div>
              <div className="form-group">
                <input type="submit" value="Login" className="form-control btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login;
