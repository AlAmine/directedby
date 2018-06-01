import axios from 'axios';

const setAuthToken = token => {
  if(token) {
    // On autorise et l'applique à toutes les requêtes
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // s'il existe deéjà on le supprime
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;
