import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
  return (
      <Router>
        <>
          <NavBar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
          </Switch>
        </>
      </Router> 
  )
}

export default App;
