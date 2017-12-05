import axios from 'axios';

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
} from './tipos';

import {
  API_URL
} from '../api';

export function limparPreMatricula() {
  return function(dispatch) {
    dispatch({
      type: LIMPAR_PRE_MATRICULA
    });
  }
}

export function buscarPreMatriculas() {
  const token = localStorage.getItem('piToken');
  const config = {
    headers: {'Authorization': "Bearer " + token}
  };

  return function(dispatch) {
    axios.get(`${API_URL}/usuario/buscarPreMatriculas`, config)
      .then(response => {
        dispatch({
          type: BUSCAR_PRE_MATRICULAS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: ERRO_NA_BUSCA_DE_PRE_MATRICULAS,
          payload: 'Erro ao buscar pré-matrículas!'
        });
      });
  }
}

export function registrarPreMatricula(turma, status, idDisciplina) {
  const token = localStorage.getItem('piToken');
  const config = {
    headers: {'Authorization': "Bearer " + token}
  };

  return function(dispatch) {
    axios.post(`${API_URL}/usuario/registrarPreMatricula/${idDisciplina}`, {
      turma,
      status
    }, config)
      .then(response => {
        dispatch({
          type: REGISTRAR_PRE_MATRICULA,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: ERRO_NO_REGISTRO_DE_PRE_MATRICULA,
          payload: 'Erro ao registrar pré-matricula'
        });
      });
  }
}

export function buscarDisciplinaDisponivel(idDisciplina) {
  const token = localStorage.getItem('piToken');
  const config = {
    headers: {'Authorization': "Bearer " + token}
  };

  return function(dispatch) {
    axios.get(`${API_URL}/usuario/disciplinaDisponivel/${idDisciplina}`, config)
      .then(response => {
        dispatch({
          type: BUSCAR_DISCIPLINA_DISPONIVEL,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: ERRO_NA_BUSCA_DA_DISCIPLINA_DISPONIVEL,
          payload: 'Erro ao buscar disciplina disponivel!'
        });
      });
  }
}

export function buscarDisciplinasDisponiveis() {

  const token = localStorage.getItem('piToken');

  const config = {
    headers: {'Authorization': "Bearer " + token}
  };

  return function(dispatch) {
    axios.get(`${API_URL}/usuario/disciplinasDisponiveis`, config)
      .then(response => {
        dispatch({
          type: BUSCAR_LISTA_DE_DISCIPLINAS_DISPONIVEIS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: ERRO_NA_BUSCA_DAS_DISCIPLINAS_DISPONIVEIS,
          payload: 'Erro ao buscar lista de disciplinas disponiveis'
        });
      });
  }
}
