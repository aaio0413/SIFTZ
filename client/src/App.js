import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import MySiftz from "./components/MySiftz";
import Search from "./components/Search";
import Login from "./components/LogIn";
import Signup from "./components/SignUp";
import SearchResult from "./components/SearchResult";
// import { RedirectUser } from "./components/Login/RedirectUser";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/mySiftz"
            component={this.props.store.status ? MySiftz : Login}
            //this.props.store.status ? MySiftz : Login
          />
          <Route
            path="/search"
            component={this.props.store.status ? Search : Login}
          />
          <Route
            path="/search-result"
            component={this.props.store.status ? Search : Login}
          />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="*" component={Home} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    Login: () => {
      dispatch({
        type: "Login"
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
