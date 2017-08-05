import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import autenticacaoReducer from './autenticacao_reducer';
import usuarioReducer from './usuario_reducer';
import cursosReducer from './cursos_reducer';
import esqueciSenhaReducer from './esqueci_senha_reducer';
import resetarSenhaReducer from './resetar_senha_reducer';

const rootReducer = combineReducers({
  form,
  autenticacao: autenticacaoReducer,
  usuario: usuarioReducer,
  cursos: cursosReducer,
  esqueci_senha: esqueciSenhaReducer,
  reset_senha: resetarSenhaReducer
});

export default rootReducer;
