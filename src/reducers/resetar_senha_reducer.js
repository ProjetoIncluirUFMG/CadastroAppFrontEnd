import {
  RESETAR_SENHA,
  ERRO_NO_RESET_DE_SENHA,
} from '../actions/autenticacao/tipos';

export default function(state = {}, action) {
  switch (action.type) {
    case RESETAR_SENHA:
      return {...state, erro: '', senhaResetada: true };
    case ERRO_NO_RESET_DE_SENHA:
      return {...state, erro: action.payload, senhaResetada: false };
    default:
      return state;
  }
}
