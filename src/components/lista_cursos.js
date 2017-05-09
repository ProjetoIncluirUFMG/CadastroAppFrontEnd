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
			return (
				<span>
					<a href={"#" + curso.id_curso} 
					   className="list-group-item list-group-item-warning" 
					   data-toggle="collapse" 
					   data-parent="#ListaDeCursos"
					   key={curso.id_curso}
					>
					<b>{curso.nome_curso}</b>
					</a>
					<div className="collapse" id={curso.id_curso}>
			        	<a href={"#SubMenu" + curso.id_curso} 
			        	   className="list-group-item" 
			        	   data-toggle="collapse" 
			        	   data-parent={"#SubMenu" + curso.id_curso}>
			        	   Subitem {curso.id_curso} <i className="fa fa-caret-down"></i>
			        	</a>
			        	<div className="collapse list-group-submenu" 
			        		 id={"SubMenu" + curso.id_curso}>
			            	<a href="#" className="list-group-item" data-parent={"#SubMenu" + curso.id_curso}>Descricao do curso</a>
			        	</div>
			        </div>
		        </span>
			);
		});

		return (
		<div id="ListaDeCursos">
			<div class="list-group panel">
				{cursos}
			</div>
		</div>
		);
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