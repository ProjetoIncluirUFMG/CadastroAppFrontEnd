import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER,  UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
};

export function signinUser({email, password, history}) {

  // redux thunk magic (return a function that allows us to call the dispatcher
  // whenever we resolve our promises)
  return function(dispatch) {

    dispatch({ type: AUTH_USER });
    history.push('/feature');

    /*

    // { email, password } = { email: email, password: password }
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'

        // browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad login info'));
      });*/

  }

}

export function signupUser({email, password}) {

  // redux thunk magic (return a function that allows us to call the dispatcher
  // whenever we resolve our promises)
  return function(dispatch) {
    // { email, password } = { email: email, password: password }
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'

        history.push('/feature');
      })
      .catch(response => {
        // If request is bad...
        // - Show an error to the user
        if (response && response.data && response.data.error) {
          dispatch(authError(response.data.error));
        } else {
          dispatch(authError('Bad signup info'));
        }
      });
  }

}

export function fetchMessage() {
  return function(dispatch) {
    /*axios.get(ROOT_URL + '/', {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {*/
        dispatch({
          type: FETCH_MESSAGE,
          payload: "Test message"
        })
    //});
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
