import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import store from "./redux/store";
import Dashboard from "./components/Dashboard";
import Mentors from "./components/Mentors";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={Signup} />
            <Route path="/login" exact component={Login} />
          </Switch>
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
