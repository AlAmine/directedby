const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEgearsInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.typeofgears = !isEmpty(data.typeofgears) ? data.typeofgears : '';

    if(Validator.isEmpty(data.title)) {
    errors.title = "Le titre est obligatoire";
  }

  if(Validator.isEmpty(data.typeofgears)) {
    errors.typeofgears = "Le genre est obligatoire";
  }

  if(!isEmpty(data.url)) {
    if(!Validator.isURL(data.url)) {
      errors.url = `Cette url n'est pas valide`;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
