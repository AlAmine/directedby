import React from 'react'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPassword } from '../../action/authActions';

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
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
      email: this.state.email
    };
    this.props.getPassword(userData, this.props.history);
    console.log(userData);

  }

  render () {
    const { errors } = this.state;
    return (
      <div className="forgot_password">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Mot de passe oublié</h1>
            <p className="lead text-center">Merci d'indiquer votre email afin de récupérer le mot de passe lié à votre compte <i>DirectedBy</i></p>
              <form onSubmit={this.onSubmit}>

                <TextFieldGroup
                  placeholder="Votre email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
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

ForgotPassword.propTypes = {
  getPassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
  errors: state.errors
})

export default connect(mapStateToProps, { getPassword })(withRouter(ForgotPassword));
