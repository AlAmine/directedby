import React from 'react';
import axios from 'axios';
import classnames from 'classnames';

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

      axios.post('/api/users/register', newUser).then(res => console.log(res.data)).catch(err => this.setState({errors: err.response.data}));
    }
  render() {
    const {errors} = this.state;  // => const errors = this.state.errors;


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
    </div>)
  }
}
export default Register;
