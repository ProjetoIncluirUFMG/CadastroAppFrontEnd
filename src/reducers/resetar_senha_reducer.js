import {
  RESETAR_SENHA,
  ERRO_NO_RESET_DA_SENHA,
} from '../actions/autenticacao/tipos';

export default function(state = {}, action) {
  switch (action.type) {
    case RESETAR_SENHA:
      return {...state, erro: '', senhaResetada: true };
    case ERRO_NO_RESET_DA_SENHA:
      return {...state, erro: action.payload, senhaResetada: false };
  }
  return state;
}
