import {
  AUTENTICAR_USUARIO,
  DESAUTENTICAR_USUARIO,
  ERRO_NA_AUTENTICACAO
} from '../actions/autenticacao/tipos';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTENTICAR_USUARIO:
      return {...state, erro: '', autenticado: true };
    case DESAUTENTICAR_USUARIO:
      return {...state, erro: '', autenticado: false };
    case ERRO_NA_AUTENTICACAO:
      return {...state, erro: action.payload };
  }
  return state;
}
