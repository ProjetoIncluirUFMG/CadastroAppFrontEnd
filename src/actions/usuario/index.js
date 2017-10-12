import axios from 'axios';

import {
  CADASTRAR_USUARIO,
  BUSCAR_USUARIOS,
  LIMPAR_LISTA_USUARIOS,
	ERRO_NA_BUSCA
} from './tipos';

import {
  API_URL
} from '../api';

export function buscarUsuarios(cpf) {
	return function(dispatch) {
		axios.get(`${API_URL}/usuario`, { params: { cpf } })
      .then(response => {

        if (response.data === '') {
          response.data = null;
        }

        dispatch({
          type: BUSCAR_USUARIOS,
					payload: response.data
        });

      })
      .catch(() => {
        dispatch({
          type: ERRO_NA_BUSCA,
          payload: 'Erro ao buscar usuário!'
        });
      });
	};
};

export function limparListaUsuariosPreCarregados() {
  return function(dispatch) {
    dispatch({ type: LIMPAR_LISTA_USUARIOS });
  };
};

export function cadastrarUsuario(usuario) {

	return function(dispatch) {
    axios.post(`${API_URL}/usuario/cadastrar`, usuario)
      .then(response => {
        dispatch({
          type: CADASTRAR_USUARIO,
          payload: response.data
        });

        localStorage.setItem('piToken', response.data.jwt);
      })
      .catch((response) => {
        dispatch({
          type: ERRO_NA_BUSCA,
          payload: response.response.data.erro
        });
      });
  }
};
