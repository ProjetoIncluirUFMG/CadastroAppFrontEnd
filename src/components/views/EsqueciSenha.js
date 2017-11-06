import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import Loading from 'react-loading-animation';

import './EsqueciSenha.css';

import * as actions from '../../actions/autenticacao';

import * as validacoes from '../genericos/formulario/utils/validacoesDeFormulario';
import * as normalizacoes from '../genericos/formulario/utils/normalizacaoDeFormulario';

import Input from '../genericos/formulario/Input';

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

const selector = formValueSelector('esqueci_senha');

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
      modalEnvioDeEmailEstaAberto: false,
      enviandoEmail: false,
      multiplosUsuarios: null,
      usuario: null,
      listaDeAlunos: [],
      modalDeDependentesEstaAberto: false,
      preCarregandoDependentes: false
		};

    this.abrirModalEnvioDeEmail = this.abrirModalEnvioDeEmail.bind(this);
    this.fecharModalEnvioDeEmail = this.fecharModalEnvioDeEmail.bind(this);
	}

  abrirModalEnvioDeEmail() {
    this.setState({ modalEnvioDeEmailEstaAberto: true });
  }

  componentWillReceiveProps(nextProps) {

    this.setState({ enviandoEmail: false });

    if (nextProps.emailEnviado === true) {
      this.props.resetarEsqueciSenha();
      this.abrirModalEnvioDeEmail();
    }

    if (this.props.temDependente !== nextProps.temDependente &&
        nextProps.temDependente !== null) {

      this.setState({ preCarregandoDependentes: false });

      if (nextProps.temDependente) {
        this.setState({
          multiplosUsuarios: true,
          modalDeDependentesEstaAberto: true,
          listaDeAlunos: nextProps.listaDeAlunos,
          usuario: null
        });
      } else if (!nextProps.temDependente){
        this.setState({
          multiplosUsuarios: false,
          modalDeDependentesEstaAberto: false,
          listaDeAlunos: null,
          usuario: nextProps.listaDeAlunos[0]
        });
      }

      this.props.limparDependentes();
    }

    // Validar se usuário tem dependentes
    if (nextProps.cpf &&
        this.props.cpf !== nextProps.cpf &&
        validacoes.cpf(nextProps.cpf) === undefined) {
      this.setState({ preCarregandoDependentes: true });
      this.props.buscarDependentesUsuario(nextProps.cpf);
    }
	}

  fecharModalEnvioDeEmail() {
    this.setState({ modalEnvioDeEmailEstaAberto: false });
    this.props.history.push('/');
  }

	submeterFormulario(formProps) {
    this.setState({ enviandoEmail: true });
    this.props.recuperarSenha(this.state.usuario);
  }

  selecionarAlunoDaLista(aluno) {
    this.setState({
      multiplosUsuarios: false,
      listaDeAlunos: null,
      modalDeDependentesEstaAberto: false,
      usuario: aluno
    });
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
            label="CPF"
            name="cpf"
            type="text"
            component={Input}
            autocomplete="off"
            validate={[
              validacoes.obrigatorio,
              validacoes.cpf
            ]}
            style={{width: "100%"}}
            normalize={normalizacoes.cpf}
          />

          {this.state.preCarregandoDependentes ?
          <div className="carregando">
            <Loading />
            <b>Carregando...</b>
          </div> : <span></span>}

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

        { this.state.modalDeDependentesEstaAberto ?
          <Modal
            isOpen={this.state.modalDeDependentesEstaAberto}
            style={estiloDoModal}
            contentLabel='Apresentar alunos dependentes'
          >
            <div className='login'>
              <h2>Selecione um aluno</h2>
              <br/>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>RG</th>
                    <th>Dependente</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.listaDeAlunos.map((aluno) => {
                    return (<tr>
                      <td>{aluno.nome_aluno}</td>
                      <td>{aluno.email}</td>
                      <td>{aluno.rg}</td>
                      <td>{aluno.is_cpf_responsavel ? "Sim" : "Não"}</td>
                      <th><button className="btn btn-primary" onClick={() => this.selecionarAlunoDaLista(aluno)}>Selecionar</button></th>
                    </tr>);
                  })}
                </tbody>
              </table>
            </div>
          </Modal>
          : <span></span> }

        { this.state.modalEnvioDeEmailEstaAberto ?
        <Modal
          isOpen={this.state.modalEnvioDeEmailEstaAberto}
          style={estiloDoModal}
          contentLabel='Email enviado com sucesso!'
        >
          <div className='cadastro'>
            <h2>Email enviado com sucesso!</h2>
            <h2>Abra seu email para continuar o processo de recuperação de senha.</h2>
            <br/>
            <div>
              <button className='btn btn-primary btn-lg botao' onClick={this.fecharModalEnvioDeEmail}>Fechar</button>
            </div>
          </div>
        </Modal> : <span></span> }
			</div>
    )
  }
}

const EsqueciSenhaForm = reduxForm({
  form: 'esqueci_senha'
})(EsqueciSenha)

function mapStateToProps(state) {
  return {
    cpf: selector(state, 'cpf'),
    mensagemDeErro: state.esqueci_senha.erro,
    emailEnviado: state.esqueci_senha.emailEnviado,
    temDependente: state.autenticacao.temDependente,
    listaDeAlunos: state.autenticacao.listaDeAlunos,
  };
}

export default connect(mapStateToProps, actions)(EsqueciSenhaForm);
