import React, { Component } from "react";
import "./HeaderHome.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

class HeaderHome extends Component {
  constructor(props) {
  super(props);
}

onLogoutClick = e => {
  e.preventDefault();
  
  this.props.logoutUser();
};

  render() {

    const { user } = this.props.auth;
    const isAuthenticated = this.props.auth.isAuthenticated;

    return (
      <header className="header-main">
        <Link to="/">
          <h2 className="main-main-title">SIFTZ</h2>
        </Link>
        <div className="nav-right">
          {isAuthenticated ? (
            <ul className="nav-items-right">
              <Link to="/my-siftz">
                <li>
                  <p>My Siftz</p>
                </li>
              </Link>
              <Link to="/search" onClick={this.props.onClick}>
                <li>
                  <p>How you feelin'?</p>
                </li>
              </Link>
              <Link to="/" onClick={this.onLogoutClick}>
                <li>
                  <p>Logout</p>
                </li>
              </Link>
            </ul>
          ) : (
            <ul className="nav-items-right">
              <Link to="/signup">
                <li>
                  <p>Signup</p>
                </li>
              </Link>
              <Link to="/login">
                <li>
                  <p>Login</p>
                </li>
              </Link>
            </ul>
          )}
        </div>
      </header>
    );
  }
}

HeaderHome.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(HeaderHome);
