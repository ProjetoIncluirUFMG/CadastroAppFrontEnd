import axios from 'axios';

import {
  BUSCAR_CONFIGURACAO_APP,
  ERRO_NA_BUSCA_CONFIGURACAO_APP,
} from './tipos';

import {
  API_URL
} from '../api';


export function buscarConfiguracaoApp() {

  return function(dispatch) {

    axios.get(`${API_URL}/configuracao`)
      .then(response => {
        dispatch({
          type: BUSCAR_CONFIGURACAO_APP,
          payload: response.data
        });
      })
      .catch(response => {
        dispatch({
          type: ERRO_NA_BUSCA_CONFIGURACAO_APP,
          payload: "Não foi possivel carregar as configurações da aplicação!"
        });
      });
  }
}
