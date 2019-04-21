import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HeaderLogin from "../Global/HeaderLogin";

const FORM_SUBMIT =
  process.env.NODE_ENV === "production"
    ? "https://shiftz-jp.herokuapp.com/auth/login"
    : "http://localhost:3090/auth/login";
const GOOGLE_LOGIN =
  process.env.NODE_ENV === "production"
    ? "https://shiftz-jp.herokuapp.com/auth/google"
    : "http://localhost:3090/auth/google";
const FACEBOOK_LOGIN =
  process.env.NODE_ENV === "production"
    ? "https://shiftz-jp.herokuapp.com/auth/facebook"
    : "http://localhost:3090/auth/facebook";
const INSTA_LOGIN =
  process.env.NODE_ENV === "production"
    ? "https://shiftz-jp.herokuapp.com/auth/instagram"
    : "http://localhost:3090/auth/instagram";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      login: false
    };
  }
  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };
  handleClick = async event => {
    event.preventDefault();
    console.log(" I am clicked");
    let res = await fetch(FORM_SUBMIT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    });
    let data = await res.json();
    console.log(data);
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
              <strong>Login with your email address</strong>
            </h2>

            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Confirm Email"
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="form-control"
                id="inputAddress"
                placeholder="Password"
              />
            </div>
            <div className="form-row signUpButtonWrap">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary login-btn"
                onClick={this.handleClick}
              >
                Login
              </button>
            </div>
          </form>

          <h2 className="leadToSignUp">Don't have an account?</h2>
          <Link to="/signUp">
            <button className="btn btn-primary signUp-btn">SIGN UP</button>
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
)(LogIn);
