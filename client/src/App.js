import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Home from "./components/Home";
import MySiftz from "./components/MySiftz";
import Search from "./components/Search";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import SearchResult from "./components/SearchResult";
// import { RedirectUser } from "./components/Login/RedirectUser";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isloggedin: false };
    //this.PrivateRoute = this.PrivateRoute.bind(this);
  }

  // componentDidMount() {
  //   const presence = window.localStorage.getItem("token");
  //   this.setState({ isloggedin: presence ? true : false });
  // }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/my-siftz" component={MySiftz} />
            <Route path="/search" component={Search} />
            <Route path="/search-result" component={SearchResult} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="*" component={Home} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
