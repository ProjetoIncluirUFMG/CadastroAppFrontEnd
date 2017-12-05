import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Loading from 'react-loading-animation';

import './CadastroPreMatricula.css';

import * as actions from '../../actions/pre_matricula';

const STATUS = {
  FILA_DE_ESPERA: 'FilaDeEspera',
  FILA_DE_NIVELAMENTO: 'FilaDeNivelamento',
  VAGA_NO_CURSO: 'VagaNoCurso',
};

const estiloDoModal = {
  content : {
    top         : '50%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    transform   : 'translate(-50%, -50%)',
    width       : '50%',
  }
};

class CadastroPreMatricula extends Component {

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
	}

  constructor(props) {
    super(props);
    this.state = {
      turmaSelecionada: '',
      modalInformativoEstaAberto: false
    };
  }

  componentWillMount() {
    this.props.buscarDisciplinaDisponivel(this.props.match.params.id_disciplina);
    // Redirecionar aluno caso id disciplina não esteja na URL
    if (!this.props.match.params.id_disciplina) {
      this.props.history.push('/');
    }
	}

  gerarTextoDeInstrucaoPagina(disciplinaDisponivel) {
    const textos = this.props.configuracao.app;

    if (disciplinaDisponivel.status === STATUS.FILA_DE_ESPERA) {
      return (<h2>{textos.texto_pagina_fila_espera}</h2>)
    } else if (disciplinaDisponivel.status === STATUS.FILA_DE_NIVELAMENTO) {
      return (<h2>{textos.texto_pagina_fila_nivelamento}</h2>)
    } else if (disciplinaDisponivel.status === STATUS.VAGA_NO_CURSO) {
      return (<h2>{textos.texto_pagina_vaga_disponivel}</h2>)
    }
    return (<h2>Carregando disciplina...</h2>)
  }

  gerarTextoDeInstrucaoPopup(preMatricula) {
    const textos = this.props.configuracao.app;

    if (preMatricula.fila_de_espera) {
      return (<span>
        <h2>{textos.texto_popup_fila_espera}</h2>
        <h2>Numero de matrícula: {preMatricula.numero_comprovante}</h2>
      </span>)
    } else if (preMatricula.fila_de_nivelamento) {
      return (<span>
        <h2>{textos.texto_popup_fila_nivelamento}</h2>
        <h2>Numero de matrícula: {preMatricula.numero_comprovante}</h2>
      </span>)
    } else if (preMatricula.vaga_garantida) {
      return (<span>
        <h2>{textos.texto_popup_vaga_disponivel}</h2>
        <h2>Numero de matrícula: {preMatricula.numero_comprovante}</h2>
      </span>)
    }
  }

  renderizarOpcoes = (opcao, index) => (
    <option key={`${opcao}-${index}`} value={opcao}>{opcao}</option>
  )

  enviarRequisicaoPreMatricula() {
    this.props.registrarPreMatricula(this.state.turmaSelecionada, this.props.disciplinaDisponivel.status, this.props.disciplinaDisponivel.id_disciplina);
  }

  mudarTurma(event) {
    this.setState({ turmaSelecionada: event.target.value });
  }

  componentWillReceiveProps(nextProps) {
    // Redirecionar aluno caso disciplina indisponivel
    if (!nextProps.disciplinaDisponivel) {
      nextProps.history.push('/');
    }

    if (nextProps.retornoPreMatricula || nextProps.erro) {
      this.setState({ modalInformativoEstaAberto: true })
    }

    // Selecionar turma inicial para o dropdown
    if (this.state.turmaSelecionada === '' && nextProps.disciplinaDisponivel && nextProps.disciplinaDisponivel.turmas && nextProps.disciplinaDisponivel.turmas.length > 0) {
      this.setState({ turmaSelecionada: nextProps.disciplinaDisponivel.turmas[0] });
    }
  }

  fecharModalInformativo() {
    this.props.limparPreMatricula();
    this.setState({ modalInformativoEstaAberto: false });
    this.props.history.push('/preMatriculas');
  }

	render() {
    const disciplinaDisponivel = this.props.disciplinaDisponivel;

    if (disciplinaDisponivel && disciplinaDisponivel.turmas && disciplinaDisponivel.turmas.length > 0) {
      return (
        <div className="cadastro_pre_matricula">
          {this.gerarTextoDeInstrucaoPagina(this.props.disciplinaDisponivel)}
          <br />
          <div>
            <div>
              <label>Turma <span style={{color: 'red'}}>*</span></label>
              <fieldset className="form-group">
                <select className="form-control"
                  value={this.state.turmaSelecionada}
                  onChange={this.mudarTurma.bind(this)} >
                  {disciplinaDisponivel.turmas.map(this.renderizarOpcoes)}
                </select>
              </fieldset>
            </div>
            <br />
            <div>
              <button className='btn btn-primary btn-lg' onClick={this.enviarRequisicaoPreMatricula.bind(this)}>Enviar</button>
            </div>
          </div>

          { this.state.modalInformativoEstaAberto ?
          <Modal
            isOpen={this.state.modalInformativoEstaAberto}
            style={estiloDoModal}
            contentLabel='Informações sobre pré-matricula!'
          >
            <div className='pre_matricula'>
              {this.props.retornoPreMatricula ?
                this.gerarTextoDeInstrucaoPopup(this.props.retornoPreMatricula)
              : <span/>}
              {this.props.erro ?
                <span>
                  <h2>Erro:</h2>
                  <h3>{this.props.erro}</h3>
                </span>
              : <span/>}
              <br/>
              <div>
                <button className='btn btn-primary btn-lg' onClick={this.fecharModalInformativo.bind(this)}>Fechar</button>
              </div>
            </div>
          </Modal> : <span/> }

        </div>
      );
    }
    return (
      <div className="cadastro_pre_matricula">
        <div className="carregando">
          <Loading />
          <b>Carregando...</b>
        </div>
      </div>
    );
	}
}

function mapStateToProps(state) {
  return {
    disciplinaDisponivel: state.pre_matricula.entrada,
    configuracao: state.configuracao,
    retornoPreMatricula: state.pre_matricula.retornoPreMatricula,
    erro: state.pre_matricula.erro,
  };
}

export default connect(mapStateToProps, actions)(CadastroPreMatricula);
