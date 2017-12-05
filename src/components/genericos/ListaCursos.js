import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import * as acoesCurso from '../../actions/cursos';
import * as acoesPreMatricula from '../../actions/pre_matricula';

const STATUS = {
  FILA_DE_ESPERA: 'FilaDeEspera',
  FILA_DE_NIVELAMENTO: 'FilaDeNivelamento',
  VAGA_NO_CURSO: 'VagaNoCurso',
};

class ListaCursos extends Component {

	static propTypes = {
    history: PropTypes.object.isRequired,

    autenticado: PropTypes.bool.isRequired,
		listaCursos: PropTypes.array.isRequired,
		buscarCursos: PropTypes.func.isRequired,
    disciplinasDisponiveis: PropTypes.object.isRequired,
    buscarDisciplinasDisponiveis: PropTypes.func.isRequired,
	}

	componentWillMount() {
		this.props.buscarCursos();
    if (this.props.autenticado) {
      this.props.buscarDisciplinasDisponiveis();
    }
	}

  carregarTelaDePreMatricula(idDisciplina) {
    this.props.history.push(`/preMatricula/${idDisciplina}`);
  }

  renderizarBotaoPreMatricula(disciplina) {
    const disciplinasDisponiveis = this.props.disciplinasDisponiveis;
    const idDisciplina = disciplina.id_disciplina;

    if (disciplinasDisponiveis[idDisciplina]) {
      if (disciplinasDisponiveis[idDisciplina].status === STATUS.VAGA_NO_CURSO)
        return (<span><hr /><button type="button" className="btn btn-primary" onClick={() => this.carregarTelaDePreMatricula(idDisciplina)}>Realizar Pré matrícular no curso</button></span>);
      else if (disciplinasDisponiveis[idDisciplina].status === STATUS.FILA_DE_NIVELAMENTO)
        return (<span><hr /><button type="button" className="btn btn-primary" onClick={() => this.carregarTelaDePreMatricula(idDisciplina)}>Cadastrar para prova de nivelamento</button></span>);
      else if (disciplinasDisponiveis[idDisciplina].status === STATUS.FILA_DE_ESPERA)
        return (<span><hr /><button type="button" className="btn btn-primary" onClick={() => this.carregarTelaDePreMatricula(idDisciplina)}>Cadastrar para fila de espera</button></span>);
    }
    return <span/>;
  }

	renderizarListaDeCursos() {
		const cursos = this.props.listaCursos;

		const listaDeCursos = cursos.map((curso) => {
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
                    {this.renderizarBotaoPreMatricula(disciplina)}
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
    autenticado: state.autenticacao.autenticado,
    listaCursos: state.cursos.lista,
    disciplinasDisponiveis: state.pre_matricula.hashmap
  };
}

const actions = Object.assign({}, acoesCurso, acoesPreMatricula);

export default connect(mapStateToProps, actions)(ListaCursos);
