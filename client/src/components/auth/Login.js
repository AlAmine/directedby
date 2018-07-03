import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../action/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password:"",
      email:"",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }
  render() {
    const { errors } = this.state;

    return (
  <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Connexion</h1>
        <p className="lead text-center">Connectez-vous à votre compte <i>DirectedBy</i></p>
          <form onSubmit={this.onSubmit}>

            <TextFieldGroup
              placeholder="Votre email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />

            <TextFieldGroup
              placeholder="Votre mot de passe"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />

            <input type="submit" className="btn btn-primary btn-block mt-4" />
          </form>

          <div className="text-muted mt-3 float-right"><Link to="/forgot-password">Mot de passe oublié ?</Link></div>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateProps, { loginUser })(Login);
