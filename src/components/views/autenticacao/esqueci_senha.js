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

class EsqueciSenha extends Component {

	static propTypes = {
		mensagemDeErro: PropTypes.string,
		recuperarSenha: PropTypes.func.isRequired,
    emailEnviado: PropTypes.bool,

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
      enviandoEmail: false
		};

    this.abrirModal = this.abrirModal.bind(this);
    this.fecharModal = this.fecharModal.bind(this);
	}

  abrirModal() {
    this.setState({ modalEstaAberto: true });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ enviandoEmail: false });
    if (nextProps.emailEnviado === true) {
      this.props.resetarEsqueciSenha();
      this.abrirModal();
    }
	}

  fecharModal() {
    this.setState({ modalEstaAberto: false });
    this.props.history.push('/');
  }

	submeterFormulario(formProps) {
    this.setState({ enviandoEmail: true });
    this.props.recuperarSenha(formProps);
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
			<div className="esqueci_senha">
        <form onSubmit={handleSubmit(this.submeterFormulario.bind(this))}>
					<Field
						label="Email"
						name="email"
						type="text"
						component={Input}
						validate={[
							validacoes.obrigatorio,
							validacoes.email
						]}
						style={{width: "100%"}}
					/>

          {this.state.enviandoEmail ?
          <div className="carregando">
            <Loading />
            <b>Enviando email...</b>
          </div> : <span></span>}

	        {this.mostrarAlertas()}

					<div className="clearfix top_space">
            <button type="submit" className={'btn btn-space btn-primary ' + (emProgresso ? 'disabled' : '')} disabled={emProgresso}>Recuperar Senha</button>
          </div>
	      </form>

        <Modal
          isOpen={this.state.modalEstaAberto}
          onRequestClose={this.fecharModal}
          style={estiloDoModal}
          contentLabel='Email enviado com sucesso!'
        >
          <div className='cadastro'>
            <h2>Email enviado com sucesso!</h2>
            <h2>Abra seu email para continuar o processo de recuperação de senha.</h2>
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

const EsqueciSenhaForm = reduxForm({
  form: 'esqueci_senha'
})(EsqueciSenha)

function mapStateToProps(state) {
  return {
    mensagemDeErro: state.esqueci_senha.erro,
    emailEnviado: state.esqueci_senha.emailEnviado,
  };
}

export default connect(mapStateToProps, actions)(EsqueciSenhaForm);
