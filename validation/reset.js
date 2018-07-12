const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResetInput(data) {
  let errors = {};

  data.newpassword = !isEmpty(data.newpassword) ? data.newpassword : '';
  data.newpassword2 = !isEmpty(data.newpassword2) ? data.newpassword2 : '';


  if(Validator.isEmpty(data.newpassword)) {
    errors.newpassword = "Le mot de passe est obligatoire"
  }

  if(!Validator.isLength(data.newpassword, { min: 6, max: 30 })) {
    errors.newpassword = "Le mot de passe doit contenir plus de 6 caractères"
  }

  if(Validator.isEmpty(data.newpassword2)) {
    errors.newpassword2 = "La confirmation du mot de passe est obligatoire"
  }

  if(!Validator.equals(data.newpassword, data.newpassword2)) {
    errors.newpassword2 = "Les mots de passe ne sont pas identiques"
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
