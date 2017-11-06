import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Loading from 'react-loading-animation';
import Modal from 'react-modal';
import _ from 'underscore';

import "./Cadastro.css";

import * as acoesAutenticacao from '../../actions/autenticacao';
import * as acoesUsuario from '../../actions/usuario';

import * as validacoes from '../genericos/formulario/utils/validacoesDeFormulario';
import * as normalizacoes from '../genericos/formulario/utils/normalizacaoDeFormulario';

import Input from '../genericos/formulario/Input';
import DropDown from '../genericos/formulario/DropDown';
import RadioGroup from '../genericos/formulario/RadioGroup';
import CheckBox from '../genericos/formulario/CheckBox';
import Captcha from '../genericos/formulario/Captcha/index';

import { UFs, Escolaridades } from '../../constants/cadastro';

const selector = formValueSelector('cadastro');

const estiloDoModal = {
  content : {
    top         : '50%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-20%',
    transform   : 'translate(-50%, -50%)',
    width       : '80%',
  }
};

class Cadastro extends Component {

	static propTypes = {
		mensagemDeErro: PropTypes.string,
		usuarios: PropTypes.array,

		is_cpf_responsavel: PropTypes.bool,
		email: PropTypes.string,
    usuarioAutenticado: PropTypes.bool,

		cadastrarUsuario: PropTypes.func.isRequired,
		buscarUsuarios: PropTypes.func.isRequired,

		valid: PropTypes.bool.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		pristine: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,
		change: PropTypes.func.isRequired,

		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor() {
		super();
		this.state = {
			mensagemDeErro: null,
      preCarregandoUsuario: false,
      modalCadastroConcluidoEstaAberto: false,
      modalPreCargaDeAlunosEstaAberto: false,
      cadastrandoUsuario: false
		};

    this.abrirModalCadastroConcluido = this.abrirModalCadastroConcluido.bind(this);
    this.fecharModalCadastroConcluido = this.fecharModalCadastroConcluido.bind(this);

    this.abrirModalPreCargaDeAlunos = this.abrirModalPreCargaDeAlunos.bind(this);
    this.fecharModalPreCargaDeAlunos = this.fecharModalPreCargaDeAlunos.bind(this);
	}

  abrirModalPreCargaDeAlunos() {
    this.setState({
      modalPreCargaDeAlunosEstaAberto: true,
      preCarregandoUsuario: false
    });
  }

  fecharModalPreCargaDeAlunos() {
    this.setState({ modalPreCargaDeAlunosEstaAberto: false });
  }

  abrirModalCadastroConcluido() {
    this.setState({
      modalCadastroConcluidoEstaAberto: true,
      cadastrandoUsuario: false
    });
  }

  fecharModalCadastroConcluido() {
    this.setState({ modalCadastroConcluidoEstaAberto: false });
    this.props.history.push('/');
  }

	prePreencherFormulario(usuario) {
    this.fecharModalPreCargaDeAlunos();

    if (usuario.id_aluno !== null) this.props.change('id_aluno', usuario.id_aluno);

		if (usuario.nome_aluno !== null) this.props.change('nome_aluno', usuario.nome_aluno);
    if (usuario.email !== null) this.props.change('email', usuario.email);

		if (usuario.is_cpf_responsavel) {
      this.props.change('is_cpf_responsavel', usuario.is_cpf_responsavel);
      this.props.change('nome_responsavel', usuario.nome_responsavel);
    }

		if (usuario.rg !== null) {
      // Remover caracteres do RG
      this.props.change('numero_rg', usuario.rg.replace(/\D/g,''));
      // Remover numeros do RG
      this.props.change('uf_rg', usuario.rg.replace(/[^a-zA-Z]+/,''));
    }

		if (usuario.telefone !== null) this.props.change('telefone', normalizacoes.telefoneFixo(usuario.telefone.substr(1)));
		if (usuario.celular !== null) this.props.change('celular', normalizacoes.telefoneCelular(usuario.celular.substr(1)));
		if (usuario.sexo !== null) this.props.change('sexo', String(usuario.sexo));
		if (usuario.data_nascimento !== null) this.props.change('data_nascimento', moment(usuario.data_nascimento).format('DD/MM/YYYY'));

    if (usuario.cep !== null) this.props.change('cep', normalizacoes.cep(usuario.cep));
    if (usuario.estado !== null) this.props.change('estado', usuario.estado);
    if (usuario.cidade !== null) this.props.change('cidade', usuario.cidade);
    if (usuario.endereco !== null) this.props.change('endereco', usuario.endereco);
    if (usuario.bairro !== null) this.props.change('bairro', usuario.bairro);
    if (usuario.numero !== null) this.props.change('numero', usuario.numero);
		if (usuario.complemento !== null) this.props.change('complemento', usuario.complemento);

		if (usuario.escolaridade !== null) this.props.change('escolaridade', usuario.escolaridade);
	}

	componentWillReceiveProps(nextProps) {
    this.setState({
      preCarregandoUsuario: false
    });

    // Redirecionar usuario para pagina principal depois do cadastro
    if (nextProps.usuarioAutenticado) {
      this.abrirModalCadastroConcluido();
    }

		if (this.props.mensagemDeErro !== nextProps.mensagemDeErro) {
			this.setState({
				mensagemDeErro: nextProps.mensagemDeErro
			});
		}

    // Carregar usuarios com determinado CPF
		if (this.props.cpf !== nextProps.cpf &&
			  validacoes.cpf(nextProps.cpf) === undefined) {
			this.buscarUsuarios(nextProps.cpf);
		}

    // Apresentar usuarios com determinado CPF
    if (nextProps.usuarios !== undefined &&
        nextProps.usuarios !== null &&
        nextProps.usuarios.length > 0 &&
        this.props.usuarios !== nextProps.usuarios) {
      this.abrirModalPreCargaDeAlunos();
    }
	}

  submeterFormulario(formProps) {
    this.setState({
      cadastrandoUsuario: true
    });

		let googleLocation = null;
    const enderecoCompleto = `${formProps.endereco}, ${formProps.numero} - ${formProps.bairro}, ${formProps.cidade} - ${formProps.estado}`;

		geocodeByAddress(enderecoCompleto)
      .then(results => {
				googleLocation = results[0];

				if (googleLocation) {
					return getLatLng(googleLocation);
				} else {
					throw new Error();
				}

			})
			.then(location => {
				googleLocation.lat = location.lat;
				googleLocation.lng = location.lng;
        formProps.google_places_json = JSON.stringify(googleLocation);
				this.props.cadastrarUsuario(formProps);

			}).catch(error => {
				this.setState({
					mensagemDeErro: 'Endereço inválido, limpe o campo e preencha novamente!'
				});
			});
  }

	buscarUsuarios =  _.debounce((cpf) => {
    this.setState({
      preCarregandoUsuario: true
    });
    this.props.limparListaUsuariosPreCarregados();
    this.props.buscarUsuarios(cpf);
	}, 300);

  mostrarAlertas() {
    if (this.state.mensagemDeErro) {
      if (this.state.cadastrandoUsuario) {
        this.setState({
          cadastrandoUsuario: false
        });
      }
      return (
				<div>
					<br />
	        <div className="erro pull-left alert alert-danger">
	          <strong>Oops!</strong> {this.state.mensagemDeErro}
	        </div>
				</div>
      );
    }
  }

  render() {

    const { valid, handleSubmit, pristine, submitting } = this.props

    const emProgresso = !valid || pristine || submitting;

    let cidades = [];
    if (this.props.estado) {
      cidades = UFs.filter((uf) => uf[this.props.estado] ? true : false )[0][this.props.estado];
    }

    return (
      <div className="cadastro">
        <form onSubmit={handleSubmit(this.submeterFormulario.bind(this))}>

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

          <Field
						label="CPF do Responsável"
            name="is_cpf_responsavel"
            component={CheckBox}
            style={{width: "20%"}}
          />

          {this.props.is_cpf_responsavel ?
          <Field
						label="Nome do Responsável"
            name="nome_responsavel"
						type="text"
            component={Input}
            validate={[
              validacoes.obrigatorio,
              validacoes.valorMinimoDeCaracteres(4),
              validacoes.valorMaximoDeCaracteres(100)
              ]}
            style={{width: "80%"}}
          /> : <div className="clearfix breakline"/>}

          {this.state.preCarregandoUsuario || this.state.cadastrandoUsuario ?
          <div className="carregando">
            <Loading />
            <b>Carregando...</b>
          </div> : <span></span>}

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

          <hr className="linha" />

          <Field
						label="Nome do Aluno"
						name="nome_aluno"
						type="text"
						component={Input}
            validate={[
              validacoes.obrigatorio,
              validacoes.valorMinimoDeCaracteres(4),
              validacoes.valorMaximoDeCaracteres(100)
            ]}
            style={{width: "100%"}}
          />

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

          <Field
						label="Telefone Fixo"
						name="telefone"
						type="text"
						component={Input}
            validate={[
              validacoes.telefoneFixo
            ]}
            style={{width: "49%", marginRight: "2%"}}
            normalize={normalizacoes.telefoneFixo}
          />

          <Field
						label="Telefone Celular"
						name="celular"
						type="text"
						component={Input}
            validate={[
              validacoes.obrigatorio,
              validacoes.telefoneCelular
            ]}
            style={{width: "49%"}}
            normalize={normalizacoes.telefoneCelular}
          />

          <Field
						label="Sexo"
						name="sexo"
            component={RadioGroup}
            validate={validacoes.obrigatorio}
						options={[
          		{ title: 'Masculino', value: '0' },
              { title: 'Feminino', value: '1' }
            ]}
            style={{width: "100%"}}
          />

          <Field
            label="Data de Nascimento"
            name="data_nascimento"
            placeholder="Data de Nascimento"
            type="text"
            component={Input}
            validate={[
              validacoes.obrigatorio,
              validacoes.dataDeNascimento
            ]}
            normalize={normalizacoes.dataDeNascimento}
            style={{width: "48%", marginRight: "2%"}}
          />

          <Field
						label="Escolaridade"
						name="escolaridade"
						component={DropDown}
            opcoes={Escolaridades}
            validate={validacoes.obrigatorio}
            style={{width: "50%"}}
					/>

          <Field
            label="CEP"
            name="cep"
            placeholder="CEP"
            type="text"
            component={Input}
            validate={[
              validacoes.obrigatorio,
              validacoes.cep
            ]}
            normalize={normalizacoes.cep}
            style={{width: "30%", marginRight: "2%"}}
          />

          <Field
            label="Estado"
            name="estado"
            component={DropDown}
            opcoes={UFs.map((uf) => Object.keys(uf))}
            validate={validacoes.obrigatorio}
            style={{width: "33%", marginRight: "2%"}}
          />

          <Field
            label="Cidade"
            name="cidade"
            component={DropDown}
            opcoes={cidades}
            validate={validacoes.obrigatorio}
            style={{width: "33%"}}
          />

          <Field
            label="Endereço"
            name="endereco"
            placeholder="Entre seu endereço"
            type="text"
            component={Input}
            validate={validacoes.obrigatorio}
            style={{width: "100%"}}
          />

          <Field
            label="Bairro"
            name="bairro"
            placeholder="Bairro"
            type="text"
            component={Input}
            validate={validacoes.obrigatorio}
            style={{width: "56%", marginRight: "2%"}}
          />

          <Field
            label="Número"
            name="numero"
            placeholder="Número"
            type="number"
            component={Input}
            validate={[
              validacoes.obrigatorio,
              validacoes.numero,
            ]}
            normalize={normalizacoes.numero}
            style={{width: "20%", marginRight: "2%"}}
          />

					<Field
						label="Complemento"
						name="complemento"
						type="text"
						placeholder="Complemento"
						component={Input}
						style={{width: "20%"}}
					/>

					<Field
					 	name='captcha'
						component={Captcha}
						apiKey={process.env.REACT_APP_GOOGLE_RECAPTCHA_V2_KEY}
						validate={validacoes.obrigatorio}
						style={{width: "100%"}}
					/>

          {this.mostrarAlertas()}

          <div className="clearfix top_space">
            <button type="submit" className={'btn btn-primary ' + (emProgresso ? 'disabled' : '')} disabled={emProgresso}>Cadastrar</button>
          </div>
        </form>

        { this.state.modalCadastroConcluidoEstaAberto ?
        <Modal
          isOpen={this.state.modalCadastroConcluidoEstaAberto}
          onRequestClose={this.fecharModalCadastroConcluido}
          style={estiloDoModal}
          contentLabel='Cadastro concluído'
        >
          <div className='cadastro'>
            <h2>Cadastro realizado com sucesso!</h2>
            <br/>
            <div>
              <button className='btn btn-primary btn-lg botao' onClick={this.fecharModalCadastroConcluido}>Buscar cursos</button>
            </div>
          </div>
        </Modal>
        : <span></span> }

        { this.state.modalPreCargaDeAlunosEstaAberto ?
        <Modal
          isOpen={this.state.modalPreCargaDeAlunosEstaAberto}
          onRequestClose={this.fecharModalPreCargaDeAlunos}
          style={estiloDoModal}
          contentLabel='Pre carga de alunos'
        >
          <div className='cadastro'>
            <h3>Selecione o aluno que gostaria de atualizar o cadastro</h3>
            <br />
            <div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nome</th>
                    <th>Dependente</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.usuarios.map((usuario, key) => {
                    return (<tr key={key}>
                              <td><button type="button" className="btn btn-primary"
                            onClick={() => { this.prePreencherFormulario(usuario) }}>Selecionar</button></td>
                              <td>{usuario.nome_aluno}</td>
                              <td>{usuario.is_cpf_responsavel ? "Sim" : "Não"}</td>
                            </tr>);
                  })}
                </tbody>
              </table>
              <button type="button" className="btn btn-primary"
                                    onClick={() => { this.fecharModalPreCargaDeAlunos() }}>Novo Aluno</button>
            </div>
          </div>
        </Modal>
        : <span></span> }
      </div>
    );
  }
}

const CadastroForm = reduxForm({
  form: 'cadastro'  // identificador unico para esse formulario
})(Cadastro)

function mapStateToProps(state) {
  return {
    is_cpf_responsavel: selector(state, 'is_cpf_responsavel'),
		cpf: selector(state, 'cpf'),
    estado: selector(state, 'estado'),
    mensagemDeErro: state.usuario.erro,
		usuarios: state.usuario.encontrados,
    usuarioAutenticado: state.autenticacao.autenticado,
  };
}

const actions = Object.assign({}, acoesUsuario, acoesAutenticacao);

export default connect(mapStateToProps, actions)(CadastroForm);