import React from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeUserPwd } from '../../action/authActions';

class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      password2: "",
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentWillReceiveProps(nextProps){
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
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.changeUserPwd(userData, this.props.history);
    console.log(userData);

  }
  render () {
    const { errors } = this.state
    return (
      <div className="reset_password">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Changez votre mot de passe</h1>
            <p className="lead text-center">Merci d'indiquer un nouveau mot de passe et de le confirmer pour votre compte <i>DirectedBy</i></p>
              <form onSubmit={this.onSubmit}>

                <TextFieldGroup
                  placeholder="Votre nouveau mot de passe"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                  type="password"
                />

                <TextFieldGroup
                  placeholder="Confirmez votre nouveau mot de passe"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                  type="password"
                />
              <input type="submit" className="btn btn-primary btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )

  }
}
ResetPassword.propTypes = {
  changeUserPwd: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired

}

const mapStateProps = (state) => ({
  errors: state.errors
})

export default connect(mapStateProps, { changeUserPwd })(withRouter(ResetPassword));
