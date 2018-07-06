const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResetInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  
  if(Validator.isEmpty(data.password)) {
    errors.password = "Le mot de passe est obligatoire"
  }

  if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Le mot de passe doit contenir plus de 6 caractères"
  }

  if(Validator.isEmpty(data.password2)) {
    errors.password2 = "La confirmation du mot de passe est obligatoire"
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Les mots de passe ne sont pas identiques"
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
