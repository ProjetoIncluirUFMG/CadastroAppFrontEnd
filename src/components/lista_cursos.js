import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/cursos';

class ListaCursos extends Component {

	componentWillMount() {
		this.props.buscarCursos();
	}

	render() {
		return (<div>Test</div>);
	}
}

function mapStateToProps(state) {
  return {
    listaCursos: state.cursos.lista
  };
}

export default connect(mapStateToProps, actions)(ListaCursos);