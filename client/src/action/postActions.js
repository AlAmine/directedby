import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST } from './types';

// Ajout d'un post
export const addPost = postData => dispatch => {
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

// Afiicher les posts
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

// chargement des posts
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}
