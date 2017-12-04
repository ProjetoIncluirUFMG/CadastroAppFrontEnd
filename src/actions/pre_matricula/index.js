import axios from 'axios';

import {
  BUSCAR_LISTA_DE_DISCIPLINAS_DISPONIVEIS,
  ERRO_NAS_DISCIPLINAS_DISPONIVEIS
} from './tipos';

import {
  API_URL
} from '../api';

export function buscarDisciplinasDisponiveis(token) {

  var config = {
      headers: {'Authorization': "Bearer " + token}
   };

  return function(dispatch) {
    axios.get(`${API_URL}/usuario/disciplinasDisponiveis`, config)
      .then(response => {
        dispatch({
          type: BUSCAR_LISTA_DE_DISCIPLINAS_DISPONIVEIS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: ERRO_NAS_DISCIPLINAS_DISPONIVEIS,
          payload: 'Erro ao buscar lista de disciplinas disponiveis'
        });
      });
  }
}
