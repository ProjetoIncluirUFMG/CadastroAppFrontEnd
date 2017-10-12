import React, { Component } from 'react';
import { Field, reduxForm , formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Loading from 'react-loading-animation';
import PropTypes from 'prop-types'
import Modal from 'react-modal';

import * as actions from '../../../actions/autenticacao';

import * as validacoes from '../../genericos/formulario/utils/validacoesDeFormulario';
import * as normalizacoes from '../../genericos/formulario/utils/normalizacaoDeFormulario';

import Input from '../../genericos/formulario/Input';
import DropDown from '../../genericos/formulario/DropDown';

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

const selector = formValueSelector('login');

class Login extends Component {

	static propTypes = {
		mensagemDeErro: PropTypes.string,
		loginUsuario: PropTypes.func.isRequired,
    usuarioAutenticado: PropTypes.bool,
    temDependente: PropTypes.bool,
    listaDeAlunos: PropTypes.array,

    buscarDependentesUsuario: PropTypes.func.isRequired,

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
      multiplosUsuarios: null,
      usuario: null,
      listaDeAlunos: [],
      modalEstaAberto: false,
      preCarregandoDependentes: false
		};

    this.abrirModal = this.abrirModal.bind(this);
    this.fecharModal = this.fecharModal.bind(this);
	}

  abrirModal() {
    this.setState({ modalEstaAberto: true });
  }

  fecharModal() {
    this.setState({ modalEstaAberto: false });
  }

	submeterFormulario(formProps) {
    formProps.id_aluno = this.state.usuario.id_aluno;
    this.props.loginUsuario(formProps);
  }

  selecionarAlunoDaLista(aluno) {
    this.setState({
      multiplosUsuarios: false,
      listaDeAlunos: null,
      modalEstaAberto: false,
      usuario: aluno
    });
  }

  componentWillReceiveProps(nextProps) {
    // Validar se usuário tem dependentes
    if (nextProps.cpf && 
        this.props.cpf !== nextProps.cpf &&
        validacoes.cpf(nextProps.cpf) === undefined) {
      this.setState({ preCarregandoDependentes: true });
      this.props.buscarDependentesUsuario(nextProps.cpf);
    }

    if (this.props.temDependente !== nextProps.temDependente) {

      this.setState({ preCarregandoDependentes: false });

      if (nextProps.temDependente) {
        this.setState({
          multiplosUsuarios: true,
          modalEstaAberto: true,
          listaDeAlunos: nextProps.listaDeAlunos,
        });
      } else if (!nextProps.temDependente){
        this.setState({
          multiplosUsuarios: false,
          modalEstaAberto: false,
          listaDeAlunos: null,
          aluno: nextProps.listaDeAlunos[0]
        });
      }
    }

    // Redirecionar usuario para pagina principal depois do login
    if (nextProps.usuarioAutenticado) this.props.history.push('/');

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
			<div className="login">
        <form onSubmit={handleSubmit(this.submeterFormulario.bind(this))}>

          {this.state.preCarregandoDependentes ?
          <div className="carregando">
            <Loading />
            <b>Carregando...</b>
          </div> : <span></span>}

          <Field
            label="CPF"
            name="cpf"
            type="text"
            component={Input}
            validate={[
              validacoes.obrigatorio,
              validacoes.cpf
            ]}
            style={{width: "100%"}}
            normalize={normalizacoes.cpf}
          />

          { this.state.multiplosUsuarios === false ?
					<Field
						label="Senha"
						name="senha"
						type="password"
						component={Input}
						validate={[
							validacoes.obrigatorio,
							validacoes.valorMinimoDeCaracteres(8),
							validacoes.valorMaximoDeCaracteres(12)
						]}
						style={{width: "100%"}}
					/> : <div className="clearfix breakline"/>}

	        {this.mostrarAlertas()}

					<div className="clearfix top_space">
            <button type="submit" className={'btn btn-space btn-primary ' + (emProgresso ? 'disabled' : '')} disabled={emProgresso || this.state.multiplosUsuarios}>Login</button>
						<button className="btn btn-default" onClick={() => this.props.history.push('/esqueciSenha')}>Esqueci minha senha</button>
          </div>

          {this.state.modalEstaAberto ?
          <Modal
            isOpen={this.state.modalEstaAberto}
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
	      </form>
			</div>
    )
  }
}

const LoginForm = reduxForm({
  form: 'login'
})(Login)

function mapStateToProps(state) {
  return {
    cpf: selector(state, 'cpf'),
    mensagemDeErro: state.autenticacao.erro,
    usuarioAutenticado: state.autenticacao.autenticado,
    temDependente: state.autenticacao.temDependente,
    listaDeAlunos: state.autenticacao.listaDeAlunos,
  };
}

export default connect(mapStateToProps, actions)(LoginForm);
