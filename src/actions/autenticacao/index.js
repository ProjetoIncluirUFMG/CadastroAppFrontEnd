import axios from 'axios';

import {
  AUTENTICAR_USUARIO,
  DESAUTENTICAR_USUARIO,
  ERRO_NA_AUTENTICACAO
} from './tipos';

import {
  API_URL
} from '../api';

export function signoutUser() {
  localStorage.removeItem('token');

  return { tipo: DESAUTENTICAR_USUARIO };
};

export function cadastrarUsuario(usuario) {

	return function(dispatch) {

    console.log(`${API_URL}/usuario/cadastrar`);

    axios.post(`${API_URL}/usuario/cadastrar`, usuario)
      .then(response => {

        console.log("response.data: ", response.data);

        dispatch({
          type: AUTENTICAR_USUARIO
        });

        localStorage.setItem('token', response.data.token);

      })
      .catch(() => {
        dispatch(erro('Falha duarante o cadastro!'));
      });

  }

}

export function loginUsuario({email, password}) {

  return function(dispatch) {

    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {

        dispatch({
          type: AUTENTICAR_USUARIO
        });

        localStorage.setItem('token', response.data.token);
      })
      .catch(response => {
        // If request is bad...
        // - Show an error to the user
        if (response && response.data && response.data.error) {
          dispatch(authError(response.data.error));
        } else {
          dispatch(erro('Bad signup info'));
        }
      });
  }
}

export function erro(error) {
  return {
    type: ERRO_NA_AUTENTICACAO,
    payload: error
  };
}
