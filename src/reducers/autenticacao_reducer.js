import {
  AUTENTICAR_USUARIO,
  DESAUTENTICAR_USUARIO,
  ERRO_NA_AUTENTICACAO
} from '../actions/autenticacao/tipos';

import {
  CADASTRAR_USUARIO
} from '../actions/usuario/tipos';

export default function(state = {}, action) {
  switch (action.type) {
    case CADASTRAR_USUARIO:
    case AUTENTICAR_USUARIO:
      return {...state, erro: '', autenticado: true };
    case DESAUTENTICAR_USUARIO:
      return {...state, erro: '', autenticado: false };
    case ERRO_NA_AUTENTICACAO:
      return {...state, erro: action.payload, autenticado: false };
  }
  return state;
}
