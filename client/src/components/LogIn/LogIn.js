import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import HeaderLogin from "../Global/HeaderLogin";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/my-siftz");
    }
    if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    console.log('user:', userData);

    this.props.loginUser(userData);
  }

  render() {

    const { errors } = this.state;

    return (
      <Fragment>
        <HeaderLogin />
        <div className="login-form">
          <section className="signUp-with">
            <a className="facebook-button" href="/api/auth/facebook">
              LOGIN WITH Facebook
            </a>
            <a className="instagram-button" href="/api/auth/instagram">
              LOGIN WITH Instagram
            </a>
            <a className="gmail-button" href="/api/auth/google">
              LOGIN WITH GMAIL
            </a>
          </section>
          <strong className="line-thru">or</strong>

          <form>
            <h2>
              <strong>Login with your email address</strong>
            </h2>

            <div className="form-row">
              <div className="form-group col-md-12">
                <input value={this.state.email}
                       onChange={this.onChange}
                       error={errors.email}
                       className={connect("form-control", { invalid: errors.email || errors.emailnotfound })}
                       placeholder="Email"
                       type="email"
                       id="email"
                       />
                 <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-12">
              <input value={this.state.password}
                     onChange={this.onChange}
                     error={errors.password}
                     className={classnames("form-control", { invalid: errors.password || errors.passwordincorrect })}
                     placeholder="Password"
                     type="password"
                     id="password"
                     />
                     <span className="red-text">
                      {errors.password}
                      {errors.passwordincorrect}
                     </span>
              </div>
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

              <button onClick={this.onSubmit}
                      type="submit"
                      className="btn btn-primary login-btn">
                Login
              </button>

            </div>
          </form>

          <h2 className="leadToSignUp">Don't have an account?</h2>
          <Link to="/signup">
            <button className="btn btn-primary signUp-btn">SIGN UP</button>
          </Link>
        </div>
      </Fragment>
    );
  }
}

LogIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LogIn);
