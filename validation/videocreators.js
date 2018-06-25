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
      errors.url = `Cette url n'est pas valide`;
    }
    if (!Validator.isURL(data.url, {protocols: ['http', 'https'], require_protocol: true})) {
      errors.url = `L'url doit commencer par 'http:' ou 'https:'`;
    }
  }

  if(!isEmpty(data.image)) {
    if(!Validator.isURL(data.image)) {
      errors.image = `Cette url web n'est pas valide`;
    }
    if (!Validator.isURL(data.image, {protocols: ['http', 'https'], require_protocol: true})) {
      errors.image = `L'url doit commencer par 'http:' ou 'https:'`;
    }
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
