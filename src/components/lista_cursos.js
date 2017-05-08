import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/cursos';

class ListaCursos extends Component {

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
		const cursos = this.state.cursos.map((curso) => {
			return (<li key={curso.id_curso}>{curso.nome_curso}</li>);
		});

		return (<ul>{cursos}</ul>);
	}

	render() {
		return (<div>{this.renderizarListaDeCursos()}</div>);
	}
}

function mapStateToProps(state) {
  return {
    listaCursos: state.cursos.lista
  };
}

export default connect(mapStateToProps, actions)(ListaCursos);