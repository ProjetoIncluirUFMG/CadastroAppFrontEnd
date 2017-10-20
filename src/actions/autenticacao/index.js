import axios from 'axios';

import {
  AUTENTICAR_USUARIO,
  DESAUTENTICAR_USUARIO,
  ERRO_NA_AUTENTICACAO,

  VALIDAR_USUARIO_DEPENDENTE,
  ERRO_NA_VALIDACAO_DE_DEPENDENCIA,
  LIMPAR_USUARIO_DEPENDENTE,

  RECUPERAR_SENHA,
  ERRO_NA_RECUPERACAO_DE_SENHA,
  RESETAR_RECUPERACAO_DE_SENHA,

  RESETAR_SENHA,
  ERRO_NO_RESET_DE_SENHA,
  RESETAR_RESET_DE_SENHA,
} from './tipos';

import {
  API_URL
} from '../api';

export function logoutUsuario() {
  localStorage.removeItem('piToken');

  return {
    type: DESAUTENTICAR_USUARIO
  };
};

export function loginUsuario({senha, id_aluno}) {

  return function(dispatch) {

    axios.post(`${API_URL}/usuario/login`, { senha, id_aluno })
      .then(response => {

        dispatch({
          type: AUTENTICAR_USUARIO
        });

        localStorage.setItem('piToken', response.data.jwt);
      })
      .catch(response => {
        dispatch({
          type: ERRO_NA_AUTENTICACAO,
          payload: "Email ou senha inválido, tente novamente!"
        });
      });
  }
}

export function buscarDependentesUsuario(cpf) {

  return function(dispatch) {

    axios.get(`${API_URL}/usuario/temDependente`, { params: { cpf } })
      .then(response => {

        dispatch({
          type: VALIDAR_USUARIO_DEPENDENTE,
          payload: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: ERRO_NA_VALIDACAO_DE_DEPENDENCIA,
          payload: "Erro ao validar se usúario é dependente!"
        });
      });
  }
}

export function limparDependentes() {
  return function(dispatch) {
    dispatch({ type: LIMPAR_USUARIO_DEPENDENTE });
  }
}

export function recuperarSenha({ id_aluno }) {

  return function(dispatch) {

    axios.post(`${API_URL}/usuario/recuperarSenha`, { id_aluno })
      .then(response => {
        dispatch({
          type: RECUPERAR_SENHA
        });
      })
      .catch(response => {
        dispatch({
          type: ERRO_NA_RECUPERACAO_DE_SENHA,
          payload: response.response.data.erro
        });
      });
  }
}

export function resetarSenha({ token, senha, confirmarSenha }) {

  return function(dispatch) {

    axios.post(`${API_URL}/usuario/resetarSenha`, { token, senha, confirmarSenha })
      .then(response => {
        dispatch({
          type: RESETAR_SENHA
        });
      })
      .catch(response => {
        dispatch({
          type: ERRO_NO_RESET_DE_SENHA,
          payload: response.response.data.erro
        });
      });
  }
}

export function resetarEsqueciSenha() {
  return function(dispatch) {
    dispatch({
      type: RESETAR_RECUPERACAO_DE_SENHA
    });
  }
}

export function resetarResetSenha() {
  return function(dispatch) {
    dispatch({
      type: RESETAR_RESET_DE_SENHA
    });
  }
}
