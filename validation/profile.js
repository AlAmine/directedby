const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if(!Validator.isLength(data.handle, { min:2, max:40 })) {
    errors.handle = "Votre pseudo doit contenir plus de 2 caractères";
  }

  if(Validator.isEmpty(data.handle)) {
    errors.handle = "Votre pseudo est obligatoire";
  }

  if(Validator.isEmpty(data.status)) {
    errors.status = "Ce champs est obligatoire";
  }

  if(Validator.isEmpty(data.skills)) {
    errors.skills = "Ce champs est obligatoire";
  }
  if(!isEmpty(data.website)) {
    if(!Validator.isURL(data.website)) {
      errors.website = `Cette adresse web n'est pas valide`;
    }
  }
  if(!isEmpty(data.youtube)) {
    if(!Validator.isURL(data.youtube)) {
      errors.youtube = `Cette adresse web n'est pas valide`;
    }
  }
  if(!isEmpty(data.facebook)) {
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = `Cette adresse web n'est pas valide`;
    }
  }
  if(!isEmpty(data.twitter)) {
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = `Cette adresse web n'est pas valide`;
    }
  }
  if(!isEmpty(data.instagram)) {
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = `Cette adresse web n'est pas valide`;
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
