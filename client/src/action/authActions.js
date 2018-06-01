import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Inscription
export const registerUser = (userData, history )=> dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data}));
};

// Connexion => obtenir le Token d' l'user
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Enregistrement du Token dans le LocalStorage
      const { token } = res.data;
      // Paramétrer le token dans le LocalStorage
      localStorage.setItem('jwtToken', token);
      // Paramétrer dans le Header
      setAuthToken(token);
      // Décrypte afin d'obtenir les infos de l'user
      const decoded = jwt_decode(token);
      // Parametrer le user en cours
      dispatch(setCurrentUser(decoded));
  })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data}));
};
  // fonction pour déterminer l'utilisateur courant
  export const setCurrentUser = (decoded) => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    }
  }
