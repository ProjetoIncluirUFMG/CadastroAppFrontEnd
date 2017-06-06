import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import autenticacaoReducer from './autenticacao_reducer';
import usuarioReducer from './usuario_reducer';
import cursosReducer from './cursos_reducer';

const rootReducer = combineReducers({
  form,
  autenticacao: autenticacaoReducer,
	usuario: usuarioReducer,
  cursos: cursosReducer
});

export default rootReducer;
