import {
  BUSCAR_USUARIO,
	ERRO_NA_BUSCA
} from '../actions/usuario/tipos';

export default function(state = {}, action) {
  switch (action.type) {
    case BUSCAR_USUARIO:
      return {...state, erro: '', encontrado: action.payload };
    case ERRO_NA_BUSCA:
      return {...state, erro: action.payload, encontrado: null };
  }
  return state;
}
