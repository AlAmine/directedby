import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, GET_POST, DELETE_POST, CLEAR_ERRORS } from './types';

// Ajout d'un post
export const addPost = postData => dispatch => {
  dispatch(clearErrors())
  axios
    .post('/api/post', postData)
    .then(res =>
      dispatch ({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
      })
  )
}

// Ajout d'un commentaire
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors())
  axios
    .post(`/api/post/comment/${postId}`, commentData)
    .then(res =>
      dispatch ({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
      })
  )
}

// Supprimer d'un commentaire
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/post/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch ({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
      })
  )
}

// Afficher les posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/post')
    .then(res =>
      dispatch ({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch ({
        type: GET_POSTS,
        payload: null
      })
  )
}

// Effacer les posts
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/post/${id}`)
    .then(res =>
      dispatch ({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
      })
  )
}

// Ajouter un like
export const addLike = id => dispatch => {
  axios
    .post(`/api/post/like/${id}`)
    .then(res => dispatch (getPosts()))
    .catch(err =>
      dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
      })
  )
}

// Supprimer un like
export const unLike = id => dispatch => {
  axios
    .post(`/api/post/unlike/${id}`)
    .then(res => dispatch (getPosts()))
    .catch(err =>
      dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
      })
  )
}
// Afficher un post par id
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/post/${id}`)
    .then(res =>
      dispatch ({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch ({
        type: GET_POST,
        payload: null
      })
  )
}

// chargement des posts
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}

// chargement des posts
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
