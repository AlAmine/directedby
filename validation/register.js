const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';


  if(!Validator.isLength(data.name, { min: 2 , max: 30})) {
    errors.name = "Votre nom doit contenir plus de 2 caractères"
  }

  if(Validator.isEmpty(data.name)) {
    errors.name = "Le nom est obligatoire"
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = "L'email est obligatoire"
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = "Le format de l'email est incorrect"
  }

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
