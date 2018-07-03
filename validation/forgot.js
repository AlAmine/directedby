const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateForgotInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';

  if(!Validator.isEmail(data.email)) {
    errors.email = "Le format de l'email est incorrect"
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = "L'email est obligatoire"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
