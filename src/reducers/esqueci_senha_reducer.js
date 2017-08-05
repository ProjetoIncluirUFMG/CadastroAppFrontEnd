import {
  RECUPERAR_SENHA,
  ERRO_NA_RECUPERACAO_DE_SENHA,
  RESETAR_RECUPERACAO_DE_SENHA,
} from '../actions/autenticacao/tipos';

export default function(state = {}, action) {
  switch (action.type) {
    case RECUPERAR_SENHA:
      return {...state, erro: '', emailEnviado: true };
    case ERRO_NA_RECUPERACAO_DE_SENHA:
      return {...state, erro: action.payload, emailEnviado: false };
    case RESETAR_RECUPERACAO_DE_SENHA:
      return {...state, erro: '', emailEnviado: false };
  }
  return state;
}
