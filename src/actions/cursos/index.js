import axios from 'axios';

import {
  BUSCAR_LISTA_DE_CURSOS,
  ERRO_NOS_CURSOS
} from './tipos';

import {
  API_URL
} from '../api';

export function buscarCursos() {

  return function(dispatch) {
    axios.get(`${API_URL}/cursos`)
      .then(resposta => {

        dispatch({
          type: BUSCAR_LISTA_DE_CURSOS,
          payload: resposta.data
        });

      })
      .catch((err) => {
        dispatch({
          type: ERRO_NOS_CURSOS,
          payload: 'Erro ao buscar lista de cursos'
        });
      });
  }
}
