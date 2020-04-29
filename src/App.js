import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <Router>
          <Switch>
            <Route path='/' exact component={Signup} />
            <Route path='/login' component={Login} />
          </Switch>
        </Router>
        <Footer />
      </div>
    </Provider>
  )
}

export default App;
