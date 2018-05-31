const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(!Validator.isEmail(data.email)) {
    errors.email = "Le format de l'email est incorrect"
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = "L'email est obligatoire"
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "Le mot de passe est obligatoire"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
