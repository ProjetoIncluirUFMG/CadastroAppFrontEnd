import axios from 'axios';

import {
  BUSCAR_USUARIO,
	ERRO_NA_BUSCA
} from './tipos';

import {
  API_URL
} from '../api';

export function buscarUsuario(email) {
	return function(dispatch) {
		axios.get(`${API_URL}/usuario`, { params: { email } })
      .then(response => {

        dispatch({
          type: BUSCAR_USUARIO,
					payload: response.data
        });

      })
      .catch(() => {
        dispatch(erro('Erro ao buscar usuário!'));
      });
	};
};

export function erro(error) {
  return {
    type: ERRO_NA_BUSCA,
    payload: error
  };
}
