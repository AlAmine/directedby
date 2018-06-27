const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if(!Validator.isLength(data.text, { min:2, max: 300 })){
    errors.text = "Votre publication doit contenir au minimum 2 caractères";
  }

  if(Validator.isEmpty(data.text)) {
    errors.text = "Votre publication doit contenir du texte";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
