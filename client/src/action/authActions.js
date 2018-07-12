import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from './types';

// Inscription
export const registerUser = (userData, history )=> dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
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
        payload: err.response.data
      }));
};
// *********************** //
  // Mot de passe oublié
  export const getPassword = (userData, history) => dispatch => {
    dispatch(clearErrors());
    axios
    .post('/api/users/forgot-password', userData)
    .then(res => history.push('/forgot-password/info'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
  }

// *********************** //

// Modification du mot de passe
export const changeUserPwd = (userData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/users/reset-password/:token', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};

  // fonction pour déterminer l'utilisateur courant
  export const setCurrentUser = (decoded) => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    }
  }

  // fonction pour se déconnecter
  export const logoutUser = () => dispatch => {
    // on efface le token du localStorage
    localStorage.removeItem('jwtToken');
    // on l'efface du header
    setAuthToken(false);
    // on redefinit les donneés du current user et on passe isAuthenticate => false
    dispatch(setCurrentUser({}))
  }

  // effacer les messages d'erreur
  export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    }
  }
