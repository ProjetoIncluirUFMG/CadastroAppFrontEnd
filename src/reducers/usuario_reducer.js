import {
  BUSCAR_USUARIOS,
  CADASTRAR_USUARIO,
	ERRO_NA_BUSCA,
  LIMPAR_LISTA_USUARIOS
} from '../actions/usuario/tipos';

export default function(state = {}, action) {
  switch (action.type) {
    case CADASTRAR_USUARIO:
      return {...state, erro: '', encontrados: null };
    case BUSCAR_USUARIOS:
      return {...state, erro: '', encontrados: action.payload };
    case ERRO_NA_BUSCA:
      return {...state, erro: action.payload, encontrados: null };
    case LIMPAR_LISTA_USUARIOS:
      return {...state, encontrados: null };
    default:
      return state;
  }
}
