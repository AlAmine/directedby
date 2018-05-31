import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../action/authActions'

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name:"",
      email:"",
      password:"",
      password2:"",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
// Gestion des errors avec les props
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
        this.setState({errors: nextProps.errors})
    }
  }
    onChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
      e.preventDefault();

      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };

    this.props.registerUser(newUser, this.props.history); // this.props.history => permet d'effectuer le redirect à l'intérieur du componenent lors de l'action
    }
  render() {
    const { errors } = this.state;  // => const errors = this.state.errors;

    return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Inscription</h1>
          <p className="lead text-center">Créez votre compte <i>DirectedBy</i></p>
        <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames('form-control form-control-lg', { 'is-invalid' : errors.name })}
                  placeholder="Votre nom"
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
              { errors.name && (<div className="invalid-feedback">{ errors.name }</div>)}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames('form-control form-control-lg', { 'is-invalid' : errors.email })}
                  placeholder="Votre adresse mail liée à votre compte Gravatar"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              { errors.email && (<div className="invalid-feedback">{ errors.email }</div>)}
                <small className="form-text text-muted">Nous utilisons Gravatar donc pour bénéficier d'une image de profil cohérante à vos ambitions, merci d'utiliser une adresse mail Gravatar</small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames('form-control form-control-lg', { 'is-invalid' : errors.password })}
                  placeholder="Votre mot de passe"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                />
              { errors.password && (<div className="invalid-feedback">{ errors.password }</div>)}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames('form-control form-control-lg', { 'is-invalid' : errors.password2 })}
                  placeholder="Confirmez votre mot de passe"
                  name="password2"
                  onChange={this.onChange}
                  value={this.state.password2}
                />
              {errors.password2 && (<div className="invalid-feedback">{ errors.password2 }</div>)}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4"/>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, {registerUser})(withRouter(Register));
