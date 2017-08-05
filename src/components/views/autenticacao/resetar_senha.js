import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import Loading from 'react-loading-animation';

import * as actions from '../../../actions/autenticacao';

import * as validacoes from '../../genericos/formulario/utils/validacoesDeFormulario';
import Input from '../../genericos/formulario/Input';

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

class ResetarSenha extends Component {

	static propTypes = {
		mensagemDeErro: PropTypes.string,
    senhaResetada: PropTypes.bool,

		valid: PropTypes.bool.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		pristine: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,

		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

  constructor() {
		super();
		this.state = {
      modalEstaAberto: false,
      resetandoSenha: false
		};

    this.abrirModal = this.abrirModal.bind(this);
    this.fecharModal = this.fecharModal.bind(this);
	}

  abrirModal() {
    this.setState({ modalEstaAberto: true });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ resetandoSenha: false });
    if (nextProps.senhaResetada === true) {
      this.props.resetarResetSenha();
      this.abrirModal();
    }
	}

  fecharModal() {
    this.setState({ modalEstaAberto: false });
    this.props.history.push('/');
  }

	submeterFormulario(formProps) {
    this.setState({ resetandoSenha: true });
    formProps.token = this.props.match.params.token;
    this.props.resetarSenha(formProps);
  }

	mostrarAlertas() {
    if (this.props.mensagemDeErro) {
      return (
        <div>
					<br />
	        <div className="erro pull-left alert alert-danger">
	          <strong>Oops!</strong> {this.props.mensagemDeErro}
	        </div>
				</div>
      );
    }
  }

  render() {
    const { valid, handleSubmit, pristine, submitting } = this.props

    const emProgresso = !valid || pristine || submitting;

    return (
			<div className="reset_senha">
        <form onSubmit={handleSubmit(this.submeterFormulario.bind(this))}>
          <Field
            label="Nova Senha"
            name="senha"
            type="password"
            component={Input}
            validate={[
              validacoes.obrigatorio,
              validacoes.valorMinimoDeCaracteres(8),
              validacoes.valorMaximoDeCaracteres(12)
            ]}
            style={{width: "100%"}}
          />

          <Field
            label="Confirmar Senha"
            name="confirmarSenha"
            type="password"
            component={Input}
            validate={[
              validacoes.obrigatorio,
              validacoes.confirmacaoDeSenha.bind(this)
            ]}
            style={{width: "100%"}}
          />

          {this.state.resetandoSenha ?
          <div className="carregando">
            <Loading />
            <b>Resetando senha...</b>
          </div> : <span></span>}

	        {this.mostrarAlertas()}

					<div className="clearfix top_space">
            <button type="submit" className={'btn btn-space btn-primary ' + (emProgresso ? 'disabled' : '')} disabled={emProgresso}>Resetar Senha</button>
          </div>
	      </form>

        <Modal
          isOpen={this.state.modalEstaAberto}
          onRequestClose={this.fecharModal}
          style={estiloDoModal}
          contentLabel='Senha resetada com sucesso!'
        >
          <div className='cadastro'>
            <h2>Senha resetada com sucesso!</h2>
            <br/>
            <div>
              <button className='btn btn-primary btn-lg botao' onClick={this.fecharModal}>Fechar</button>
            </div>
          </div>
        </Modal>
			</div>
    )
  }
}

const ResetarSenhaForm = reduxForm({
  form: 'resetar_senha'
})(ResetarSenha)

function mapStateToProps(state) {
  return {
    mensagemDeErro: state.reset_senha.erro,
    senhaResetada: state.reset_senha.senhaResetada,
  };
}

export default connect(mapStateToProps, actions)(ResetarSenhaForm);
