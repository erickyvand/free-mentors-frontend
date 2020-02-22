import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signupService } from '../services/authService';

class Signup extends Component{
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    bio: '',
    occupation: '',
    expertise: '',
    redirect: false,
    first_nameErr: '',
    last_nameErr: '',
    emailErr: '',
    passwordErr: '',
    addressErr: '',
    bio: '',
    occupationErr: '',
    expertiseErr: '' 
  }
  render() {
    const handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });

      if(!/^[A-Za-z0-9]{3,}$/i.test(this.state.first_name)) {
        this.setState({
          first_nameErr: 'First Name length must be at least 3 characters long'
        });
      } else {
        this.setState({
          first_nameErr: ''
        });
      }

      if(!/^[A-Za-z0-9]{3,}$/i.test(this.state.last_name)) {
        this.setState({
          last_nameErr: 'Last Name length must be at least 3 characters long'
        });
      } else {
        this.setState({
          last_nameErr: ''
        });
      }

      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.state.email)) {
        this.setState({
          emailErr: 'Invalid email'
        });
      } else {
        this.setState({
          emailErr: ''
        });
      }

      if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(this.state.password)) {
        this.setState({
          passwordErr: 'Password must be atleast 8 characters, 1 uppercase'
        });
      } else {
        this.setState({
          passwordErr: ''
        });
      }

      if(!/^[A-Za-z0-9]{3,}$/i.test(this.state.address)) {
        this.setState({
          addressErr: 'Address length must be at least 3 characters long'
        });
      } else {
        this.setState({
          addressErr: ''
        });
      }

      if(!/^[A-Za-z0-9]{3,}$/i.test(this.state.bio)) {
        this.setState({
          bioErr: 'Bio length must be at least 3 characters long'
        });
      } else {
        this.setState({
          bioErr: ''
        });
      }

      if(!/^[A-Za-z0-9]{3,}$/i.test(this.state.occupation)) {
        this.setState({
          occupationErr: 'Occupation length must be at least 3 characters long'
        });
      } else {
        this.setState({
          occupationErr: ''
        });
      }

      if(!/^[A-Za-z0-9]{3,}$/i.test(this.state.expertise)) {
        this.setState({
          expertiseErr: 'Expertise length must be at least 3 characters long'
        });
      } else {
        this.setState({
          expertiseErr: ''
        });
      }
    }

    const handleBlur = () => {
      if(!this.state.last_name) {
        this.setState({
          first_nameErr: 'First Name is Required'
        });
      } else {
        this.setState({
          first_nameErr: ''
        });
      }

      if(!this.state.last_name) {
        this.setState({
          last_nameErr: 'Last Name is Required'
        });
      } else {
        this.setState({
          last_nameErr: ''
        });
      }
    }

    const handleSubmit = async e => {
      e.preventDefault();
      const first_name = this.state.first_name;
      const last_name = this.state.last_name;
      const email = this.state.email;
      const password = this.state.password;
      const address = this.state.address;
      const bio = this.state.bio;
      const occupation = this.state.occupation;
      const expertise = this.state.expertise;

      const signedUp = await signupService({ first_name, last_name, email, password, address, bio, occupation, expertise });

      if(signedUp.status === 201) {
        this.setState({
          redirect: true
        });
      }
    }

    if(this.state.redirect) {
      return <Redirect to='/login' />
    }
    return (
      <>
        <div className="col-md-4 auth-form">
          <div className="card card-body">
            <h4 className="text-center mb-4">Sign Up</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="first_name" className="form-control" onChange={handleChange} onBlur={handleBlur} placeholder="First Name"/>
                <span className="error text-danger">{this.state.first_nameErr}</span>
              </div>
              <div className="form-group">
                <input type="text" name="last_name" className="form-control" onChange={handleChange} placeholder="Last Name"/>
                <span className="error text-danger">{this.state.last_nameErr}</span>
              </div>
              <div className="form-group">
                <input type="text" name="email" className="form-control" onChange={handleChange} placeholder="Email"/>
                <span className="error text-danger">{this.state.emailErr}</span>
              </div>
              <div className="form-group">
                <input type="password" name="password" className="form-control" onChange={handleChange} placeholder="Password"/>
                <span className="error text-danger">{this.state.passwordErr}</span>
              </div>
              <div className="form-group">
                <input type="text" name="address" className="form-control" onChange={handleChange} placeholder="Address"/>
                <span className="error text-danger">{this.state.addressErr}</span>
              </div>
              <div className="form-group">
                <input type="text" name="bio" className="form-control" onChange={handleChange} placeholder="Bio"/>
                <span className="error text-danger">{this.state.bioErr}</span>
              </div>
              <div className="form-group">
                <input type="text" name="occupation" className="form-control" onChange={handleChange} placeholder="Occupation"/>
                <span className="error text-danger">{this.state.occupationErr}</span>
              </div>
              <div className="form-group">
                <input type="text" name="expertise" className="form-control" onChange={handleChange} placeholder="Expertise"/>
                <span className="error text-danger">{this.state.expertiseErr}</span>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Signup"
                  className="form-control btn btn-primary"
                  disabled={
                    !this.state.first_name ||
                    !this.state.last_name ||
                    !this.state.email ||
                    !this.state.password ||
                    !this.state.bio ||
                    !this.state.address ||
                    !this.state.bio ||
                    !this.state.occupation ||
                    !this.state.expertise
                  }
                />
              </div>
            </form>
            <span>Already have an account? <Link to='/login'>Signin</Link></span>
          </div>
        </div>
      </>
    )
  }
}

export default Signup;
