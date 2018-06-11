import axios from 'axios';
// import types
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';

// current profil
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
  .then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_PROFILE,
      payload: {}
    })
  );
}
// Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data

      })
    )
}
// Ajout du matériel de captation
export const addVideoCreator = (videoCreatorData, history) => dispatch => {
  axios
    .post('/api/profile/creatorsgears', videoCreatorData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data

      }))
}
// Ajout du matériel d'édition
export const addVideoEditor = (videoEditorData, history) => dispatch => {
  axios
    .post('/api/profile/editinggears', videoEditorData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data

      }))
}
// delete VideoEditor
export const deleteEditor = (id) => dispatch => {
  axios
    .delete(`/api/profile/editinggears/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data

      })
    )
}

// delete VideoCreator
export const deleteCreator = (id) => dispatch => {
  axios
    .delete(`/api/profile/creatorsgears/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data

      })
    )
}

// Delete Account & Profile
export const deleteAccount = () => dispatch => {
  if(window.confirm('Voulez-vous réellement supprimer votre compte ? Cette action est irreversible !')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      ).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
};
// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// Clear Profile loading
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}