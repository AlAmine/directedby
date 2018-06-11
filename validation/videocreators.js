const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCgearsInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.typeofgears = !isEmpty(data.typeofgears) ? data.typeofgears : '';

    if(Validator.isEmpty(data.title)) {
    errors.title = "Le nom est obligatoire";
  }

  if(Validator.isEmpty(data.typeofgears)) {
    errors.typeofgears = "Le type est obligatoire";
  }

  if(!isEmpty(data.url)) {
    if(!Validator.isURL(data.url)) {
      errors.url = `Cette adresse web n'est pas valide`;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
