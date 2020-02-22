import React, { Component } from 'react';
import { usersService } from '../services/authService';

class Dashboard extends Component{
  state = {
    users: []
  }
  async componentDidMount() {
    const users = await usersService();
    this.setState({users: users.data.users})
    console.log(users.data.users);
    
  }
  render() {
    if(!sessionStorage.getItem('firstName')) {
      location.href = '/login';
    }

    console.log(this.state.users);
    ;
    return (
      <>
        <div className="container">
          <div className="row mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Occupation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                {/* {
                this.state.users.length === 0 ? 'No users to display' :
                  <div>
                    {
                      this.state.users.map(user => {
                        return (
                        <td>{user}</td>
                        )
                      })
                    }
                  </div>
              } */}
                  {
                    this.state.users.map(user => {
                      return (
                      <td>{user.id}</td>
                      )
                    })
                  }
                </tr>
              </tbody>  
            </table>  
          </div>
        </div>
      </>
    )
  }
}

export default Dashboard;
