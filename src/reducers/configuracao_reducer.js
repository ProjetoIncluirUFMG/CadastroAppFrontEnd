import {
  BUSCAR_CONFIGURACAO_APP,
  ERRO_NA_BUSCA_CONFIGURACAO_APP
} from '../actions/configuracao/tipos';

const INITIAL_STATE = {
  app: {},
  erro: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BUSCAR_CONFIGURACAO_APP:
      return {...state, erro: null, app: action.payload };
    case ERRO_NA_BUSCA_CONFIGURACAO_APP:
      return {...state, erro: action.payload, app: {} };
    default:
      return state;
  }
}
