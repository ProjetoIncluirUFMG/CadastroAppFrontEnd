import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import * as actions from '../../actions/cursos';

class ListaCursos extends Component {

	static propTypes = {
		listaCursos: PropTypes.array.isRequired,
		buscarCursos: PropTypes.func.isRequired
	}

	componentWillMount() {
		this.props.buscarCursos();
	}

	renderizarListaDeCursos() {
		const cursos = this.props.listaCursos;

		const listaDeCursos = cursos.map(function(curso) {
			return (
				<span key={curso.id_curso}>
					<a href={"#Menu" + curso.id_curso}
					   className="list-group-item list-group-item-warning"
					   data-toggle="collapse"
					   data-parent="#ListaDeCursos"
					>
						<b>{curso.nome_curso}</b>
						<span className="glyphicon glyphicon-chevron-down pull-right"></span>
					</a>
					<div className="collapse"
					 id={"Menu" + curso.id_curso}>
					{
						curso.disciplinas.map(disciplina => {
							return (
								<span key={disciplina.id_disciplina}>
									<a href={"#SubMenu" + disciplina.id_disciplina}
										className="list-group-item"
										data-toggle="collapse"
										data-parent={"#Menu" + disciplina.id_curso}>
										{disciplina.nome_disciplina} <i className="glyphicon glyphicon-chevron-down pull-right"></i>
									</a>
									<div className="collapse list-group-submenu" id={"SubMenu" + disciplina.id_disciplina}>
										<a className="list-group-item" data-parent={"#SubMenu" + disciplina.id_disciplina}>
										{disciplina.ementa_disciplina ? disciplina.ementa_disciplina : "Nenhuma ementa encontrada."}
										</a>
									</div>
								</span>
							);
						})
					}
					</div>
		   </span>
			);
		});

		return (
			<div className="list-group panel">
				{listaDeCursos}
			</div>
		);
	}

	render() {
		return (
			<div className="lista_cursos" id="ListaDeCursos">
				{this.renderizarListaDeCursos()}
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    listaCursos: state.cursos.lista
  };
}

export default connect(mapStateToProps, actions)(ListaCursos);
