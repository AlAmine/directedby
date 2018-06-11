import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../action/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

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
  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
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
              <TextFieldGroup
                placeholder="Votre nom"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />

              <TextFieldGroup
                placeholder="Votre adresse mail liée à votre compte Gravatar"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
                type="email"
                info="Nous utilisons Gravatar donc pour bénéficier d'une image de profil cohérante à vos ambitions, merci d'utiliser une adresse mail liée à un compte Gravatar"
              />

              <TextFieldGroup
                placeholder="Votre mot de passe"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
                type="password"
              />

              <TextFieldGroup
                placeholder="Confirmez votre mot de passe"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
                type="password"
              />

              <input type="submit" className="btn btn-primary btn-block mt-4"/>
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
