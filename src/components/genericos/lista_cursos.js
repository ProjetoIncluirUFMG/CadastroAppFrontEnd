import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import * as actions from '../../actions/cursos';

class ListaCursos extends Component {

	static propTypes = { }

	constructor() {
		super();
		this.state = {
			cursos: []
		};
	}

	componentWillMount() {
		this.props.buscarCursos();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			cursos: nextProps.listaCursos
		});
	}

	renderizarListaDeCursos() {
		const cursos = {};

		this.state.cursos.forEach((curso) => {
			if (!cursos[curso.id_curso]) {
				cursos[curso.id_curso] = {
					id: curso.id_curso,
					nome: curso.nome_curso,
					descricao: curso.descricao_curso,
					disciplinas: []
				};
			}

			cursos[curso.id_curso].disciplinas.push({
				id: curso.id_disciplina,
				nome: curso.nome_disciplina,
				ementa: curso.ementa_disciplina
			});
		});

		const listaDeCursos = Object.keys(cursos).map(function(key) {
			const curso = cursos[key];

			return (
				<span key={curso.id}>
					<a href={"#Menu" + curso.id}
					   className="list-group-item list-group-item-warning"
					   data-toggle="collapse"
					   data-parent="#ListaDeCursos"
					>
						<b>{curso.nome}</b>
						<span className="glyphicon glyphicon-chevron-down pull-right"></span>
					</a>
					<div className="collapse"
					 id={"Menu" + curso.id}>
					{
						curso.disciplinas.map(disciplina => {
							return (
								<span key={disciplina.id}>
									<a href={"#SubMenu" + disciplina.id}
										className="list-group-item"
										data-toggle="collapse"
										data-parent={"#Menu" + curso.id}>
										{disciplina.nome} <i className="glyphicon glyphicon-chevron-down pull-right"></i>
									</a>
									<div className="collapse list-group-submenu" id={"SubMenu" + disciplina.id}>
										<a href="#" className="list-group-item" data-parent={"#SubMenu" + disciplina.id}>
										{disciplina.ementa ? disciplina.ementa : "Nenhuma ementa encontrada."}
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
		<div className="lista_cursos" id="ListaDeCursos">
			<div className="list-group panel">
				{listaDeCursos}
			</div>
		</div>
		);
	}

	render() {
		return (
			<div>
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
