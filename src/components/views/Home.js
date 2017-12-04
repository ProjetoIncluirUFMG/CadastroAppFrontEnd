import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import './Home.css';

import ListaCursos from '../genericos/ListaCursos';

class Home extends Component {

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
    configuracao: PropTypes.object.isRequired,
	}

	renderizarTextoIntrodutorio() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading"><b>Bem vindo ao Projeto Incluir</b></div>
				<div className="panel-body">{this.props.configuracao.app.texto_inicial}</div>
			</div>
		);
	}

	renderizarListaDeCursos() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading"><b>Lista de cursos</b></div>
				<div className="panel-body">
					<ListaCursos history={this.props.history}/>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="home">
				{this.renderizarTextoIntrodutorio()}
				{this.renderizarListaDeCursos()}
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    configuracao: state.configuracao,
  };
}

export default connect(mapStateToProps, {})(Home);
