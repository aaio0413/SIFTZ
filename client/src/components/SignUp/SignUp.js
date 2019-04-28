import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import HeaderLogin from "../Global/HeaderLogin";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
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

    if (this.state.password != this.state.password2) {
      alert('passwords do not match');
    } else {

      const newUser = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }
      this.props.registerUser(newUser, this.props.history);
      console.log('New User:', newUser);
    }
  };

  render() {

    const { errors } = this.state;

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
                <input value={this.state.email}
                       onChange={this.onChange}
                       error={errors.email}
                       className={classnames("form-control", { invalid: errors.email})}
                       placeholder="Email"
                       type="email"
                       id="email"
                       />
                       <span className="red-text">{errors.email}</span>
              </div>
              <div className="form-group col-md-6">
                <input value={this.state.username}
                       onChange={this.onChange}
                       error={errors.username}
                       className={classnames("form-control", { invalid: errors.username })}
                       placeholder="Username"
                       type="username"
                       id="username"
                       />
                       <span className="red-text">{errors.username}</span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <input value={this.state.password}
                       onChange={this.onChange}
                       error={errors.password}
                       className={classnames("form-control", { invalid: errors.password })}
                       placeholder="Password"
                       type="password"
                       id="password"
                       />
                       <span className="red-text">{errors.password}</span>
              </div>
              <div className="form-group col-md-6">
                <input value={this.state.password2}
                       onChange={this.onChange}
                       error={errors.password}
                       placeholder="Password"
                       className={classnames("form-control", { invalid: errors.password })}
                       type="password"
                       id="password2"
                       />
                       <span className="red-text">{errors.password2}</span>
              </div>
            </div>

            <div className="form-row signUpButtonWrap">

              <button onClick={this.onSubmit}
                      type="submit"
                      className="btn btn-primary login-btn"
                      >
                      SignUp
                      </button>
            </div>

            <h2 className="leadToSignUp">Already have an account?</h2>
            <Link to="/login">
              <button className="btn btn-primary signUp-btn">LOG IN</button>
            </Link>
          </form>
        </div>
      </Fragment>
    );
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));;
