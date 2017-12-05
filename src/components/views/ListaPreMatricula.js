import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Loading from 'react-loading-animation';

import './ListaPreMatricula.css';

import * as actions from '../../actions/pre_matricula';

class ListaPreMatricula extends Component {

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
	}

  componentWillMount() {
    this.props.buscarPreMatriculas();
  }

  pegarTipoDeCadastro(preMatricula) {
    if (preMatricula.vaga_garantida) {
      return "Pré matriculado"
    } else if (preMatricula.fila_de_nivelamento) {
      return "Fila de Nivelamento";
    } else if (preMatricula.fila_de_espera) {
      return "Fila de Espera";
    }
  }

  pegarNotasPreMatricula(preMatricula) {
    const textos = this.props.configuracao.app;

    if (preMatricula.fila_de_espera) {
      return textos.texto_pagina_fila_espera;
    } else if (preMatricula.fila_de_nivelamento) {
      return textos.texto_pagina_fila_nivelamento;
    } else if (preMatricula.vaga_garantida) {
      return textos.texto_pagina_vaga_disponivel;
    }
  }

	render() {
    const preMatriculas = this.props.preMatriculas;

    if (preMatriculas && preMatriculas.length > 0) {
  		return (
  			<div className="pre_matriculas">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Numero do Comprovante</th>
                <th>Disciplina</th>
                <th>Turma</th>
                <th>Tipo de Cadastro</th>
                <th>Notas</th>
              </tr>
            </thead>
            <tbody>
              {preMatriculas.map((preMatricula, index) => {
                return (<tr key={index}>
                  <td>{preMatricula.numero_comprovante}</td>
                  <td>{preMatricula.nome_disciplina}</td>
                  <td>{preMatricula.turma}</td>
                  <td>{this.pegarTipoDeCadastro(preMatricula)}</td>
                  <td>{this.pegarNotasPreMatricula(preMatricula)}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      );
    } else if (preMatriculas && preMatriculas.length === 0) {
      return (
        <div className="pre_matriculas">
            <h2>Nenhuma pré-matrícula encontrada</h2>
        </div>
      )
    } else {
      return (
        <div className="pre_matriculas">
          <div className="carregando">
            <Loading />
            <b>Carregando...</b>
          </div>
        </div>
      )
    }
	}
}

function mapStateToProps(state) {
  return {
    preMatriculas: state.pre_matricula.lista,
    configuracao: state.configuracao,
  };
}

export default connect(mapStateToProps, actions)(ListaPreMatricula);
