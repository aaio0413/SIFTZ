import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import HeaderLogin from "../Global/HeaderLogin";
import { connect } from "react-redux";
const FORM_SUBMIT =
  process.env.NODE_ENV === "production"
    ? "https://siftz.herokuapp.com/auth/login"
    : "http://localhost:3090/auth/login";
const GOOGLE_LOGIN =
  process.env.NODE_ENV === "production"
    ? "https://siftz.herokuapp.com/auth/google"
    : "http://localhost:3090/auth/google";
const FACEBOOK_LOGIN =
  process.env.NODE_ENV === "production"
    ? "https://siftz.herokuapp.com/auth/facebook"
    : "http://localhost:3090/auth/facebook";
const INSTA_LOGIN =
  process.env.NODE_ENV === "production"
    ? "https://siftz.herokuapp.com/auth/instagram"
    : "http://localhost:3090/auth/instagram";
class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    phone: "",
    login: false
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(this.state);
    this.setState({
      [name]: value
    });
  };
  handlesubmit = async event => {
    event.preventDefault();
    console.log(this.state);
    console.log(JSON.stringify(this.state));
    let res = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(this.state)
    });
    let data = await res.json();
    if (data.msg === "OK") {
      this.props.Login();
      this.setState({ login: true });
    }
  };
  handleRedirect = () => {
    if (this.state.login) return <Redirect to="/MySiftz" />;
  };
  render() {
    return (
      <Fragment>
        <HeaderLogin />
        <div className="login-form">
          <section className="signUp-with">
            <a className="facebook-button" href={FACEBOOK_LOGIN}>
              LOGIN WITH Facebook
            </a>
            <a className="instagram-button" href={INSTA_LOGIN}>
              LOGIN WITH Instagram
            </a>
            <a className="gmail-button" href={GOOGLE_LOGIN}>
              LOGIN WITH GMAIL
            </a>
          </section>
          <strong className="line-thru">or</strong>

          <form>
            <h2>
              <strong>Sign up with your email address</strong>
            </h2>

            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  className=" form-control"
                  title="email"
                  placeholder="Email"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  type="password"
                  className=" form-control"
                  title="username"
                  placeholder="Set a password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Password"
              />
            </div>
            <div className="form-row signUpButtonWrap">
              <div className="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
                  Remember me
                </label>
              </div>

              <button type="submit" className="btn btn-primary login-btn">
                SignUp
              </button>
            </div>
          </form>

          <h2 className="leadToSignUp">Already have an account?</h2>
          <Link to="/login">
            <button className="btn btn-primary signUp-btn">LOG IN</button>
          </Link>
        </div>
        {this.state.login ? this.handleRedirect() : null}
      </Fragment>
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
    },
    Logout: () => {
      dispatch({ type: "Logout" });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
