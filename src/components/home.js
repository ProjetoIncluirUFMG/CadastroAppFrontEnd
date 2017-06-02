import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import ListaCursos from './genericos/lista_cursos';

class Home extends Component {

	static propTypes = { }

	renderizarTextoIntrodutorio() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading"><b>Bem vindo ao Projeto Incluir</b></div>
				<div className="panel-body">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
			</div>
		);
	}

	renderizarListaDeCursos() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading"><b>Lista de cursos</b></div>
				<div className="panel-body">
					<ListaCursos />
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


export default Home;
