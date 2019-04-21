import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import HeaderLogin from "../Global/HeaderLogin";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <Fragment>
        <HeaderLogin />
        <div className="login-form">
          <section className="signUp-with">
            <a className="facebook-button" href="/api/auth/facebook">
              SIGN UP WITH Facebook
            </a>
            <a className="instagram-button" href="/api/auth/instagram">
              SIGN UP WITH Instagram
            </a>
            <a className="gmail-button" href="/api/auth/google">
              SIGN UP WITH GMAIL
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
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword4"
                  placeholder="Confirm Email"
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
      </Fragment>
    );
  }
}

export default Signup;
