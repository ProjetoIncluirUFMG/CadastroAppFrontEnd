import {
	BUSCAR_LISTA_DE_CURSOS,
	ERRO_NOS_CURSOS
} from '../actions/cursos/tipos';

const INITIAL_STATE = {
  lista: [],
  erro: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BUSCAR_LISTA_DE_CURSOS:
      return {...state, erro: null, lista: action.payload };
    case ERRO_NOS_CURSOS:
      return {...state, erro: action.payload, lista: [] };
  }
  return state;
}
