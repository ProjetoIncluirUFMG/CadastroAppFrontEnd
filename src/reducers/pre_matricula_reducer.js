import {
  BUSCAR_LISTA_DE_DISCIPLINAS_DISPONIVEIS,
  ERRO_NAS_DISCIPLINAS_DISPONIVEIS
} from '../actions/pre_matricula/tipos';

const INITIAL_STATE = {
  hashmap: {},
  error: null,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BUSCAR_LISTA_DE_DISCIPLINAS_DISPONIVEIS:
      return {...state, erro: null, hashmap: action.payload };
    case ERRO_NAS_DISCIPLINAS_DISPONIVEIS:
      return {...state, erro: action.payload, hashmap: {} };
    default:
      return state;
  }
}
