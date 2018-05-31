const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if(!Validator.isLength(data.text, { min:10, max: 300 })){
    errors.text = "Votre post doit contenir au minimum 10 caractères";
  }

  if(Validator.isEmpty(data.text)) {
    errors.text = "Votre post doit contenir du texte";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
