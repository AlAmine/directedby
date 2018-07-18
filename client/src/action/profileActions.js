import axios from 'axios';
// import types
import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';

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

// afficher le  profil via le pseudo
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}/`)
  .then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_PROFILE,
      payload: null
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
      })
    )
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
      })
    )
}
// delete VideoEditor
export const deleteEditor = (id) => dispatch => {
  if(window.confirm('Voulez-vous réellement supprimer cette vidéo ? Cette action est irreversible !')) {
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
}

// delete VideoCreator
export const deleteCreator = (id) => dispatch => {
  if(window.confirm('Voulez-vous réellement supprimer ce matériel ? Cette action est irreversible !')) {

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
}

// Afficher les membres
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
    axios
    .get(`/api/profile/all`)
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    )
  }

  // Follow un membre
  export const followMember = (friendsId) => dispatch => {
      if(window.confirm('Voulez-vous envoyer une demande de connexion à ce membre ?')) {
    axios
      .post(`/api/profile/follow`, friendsId)
      .then(res => dispatch (getProfileByHandle()))
      .catch(err =>
        dispatch ({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
    }
  }
  // Accepter la demande d'ami
  export const acceptMember = () => dispatch => {
    axios
      .post(`/api/profile/follow/:token`)
      .then(res => dispatch(getProfiles()))
      .catch(err =>
        dispatch ({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
  // unFollow un membre
  export const unFollowMember = id => dispatch => {
    axios
      .post(`/api/profile/unfollow/${id}`)
      .then(res => dispatch (getProfiles()))
      .catch(err =>
        dispatch ({
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
        }))
      .catch(err =>
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
