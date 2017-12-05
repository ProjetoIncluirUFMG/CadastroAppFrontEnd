import {
  BUSCAR_LISTA_DE_DISCIPLINAS_DISPONIVEIS,
  ERRO_NA_BUSCA_DAS_DISCIPLINAS_DISPONIVEIS,

  BUSCAR_DISCIPLINA_DISPONIVEL,
  ERRO_NA_BUSCA_DA_DISCIPLINA_DISPONIVEL,

  REGISTRAR_PRE_MATRICULA,
  ERRO_NO_REGISTRO_DE_PRE_MATRICULA,
  LIMPAR_PRE_MATRICULA,

  BUSCAR_PRE_MATRICULAS,
  ERRO_NA_BUSCA_DE_PRE_MATRICULAS
} from '../actions/pre_matricula/tipos';

const INITIAL_STATE = {
  hashmap: {},
  entrada: {},
  erro: null,
  lista: null,

  retornoPreMatricula: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BUSCAR_PRE_MATRICULAS:
      return {...state, erro: null, lista: action.payload };
    case ERRO_NA_BUSCA_DE_PRE_MATRICULAS:
      return {...state, erro: action.payload, lista: null };

    case REGISTRAR_PRE_MATRICULA:
      return {...state, erro: null, retornoPreMatricula: action.payload };
    case ERRO_NO_REGISTRO_DE_PRE_MATRICULA:
      return {...state, erro: action.payload, retornoPreMatricula: null };
    case LIMPAR_PRE_MATRICULA:
      return {...state, erro: null, retornoPreMatricula: null };

    case BUSCAR_LISTA_DE_DISCIPLINAS_DISPONIVEIS:
      return {...state, erro: null, hashmap: action.payload };
    case ERRO_NA_BUSCA_DAS_DISCIPLINAS_DISPONIVEIS:
      return {...state, erro: action.payload, hashmap: {} };

    case BUSCAR_DISCIPLINA_DISPONIVEL:
      let entrada = null;
      Object.keys(action.payload).forEach((key) => {
        entrada = action.payload[key];
        entrada.id_disciplina = key;
      });
      return {...state, erro: null, entrada: entrada };
    case ERRO_NA_BUSCA_DA_DISCIPLINA_DISPONIVEL:
      return {...state, erro: action.payload, entrada: {} };
    default:
      return state;
  }
}
