const Validator = require('validator');
const isEmpty = require('./is-empty');
const validateUrl = require('youtube-url');

module.exports = function validateEgearsInput(data) {
  let errors = {};
  const reg = "(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])"

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
    if(!validateUrl.valid(data.url)){
      errors.url = `Veuillez saisir l'url d'une vidéo disponible sur YouTube`
    }
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
