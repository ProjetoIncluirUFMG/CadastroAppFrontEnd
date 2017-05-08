import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import autenticacaoReducer from './autenticacao_reducer';
import cursosReducer from './cursos_reducer';

const rootReducer = combineReducers({
  form,
  autenticacao: autenticacaoReducer,
  cursos: cursosReducer
});

export default rootReducer;
