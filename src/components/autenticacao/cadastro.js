import React, { Component } from 'react';
const  { DOM: { input, select, textarea } } = React
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import moment from 'moment';

import * as actions from '../../actions/autenticacao';
import * as validacoes from '../genericos/formulario/utils/validacoesDeFormulario';
import * as normalizacoes from '../genericos/formulario/utils/normalizacaoDeFormulario';

import Input from '../genericos/formulario/Input';
import DropDown from '../genericos/formulario/DropDown';
import RadioGroup from '../genericos/formulario/RadioGroup';
import Checkbox from '../genericos/formulario/Checkbox';
import { default as DatePicker } from '../genericos/formulario/DatePicker';
import PlaceField from '../genericos/formulario/PlaceField';
import Captcha from '../genericos/formulario/Captcha';

const selector = formValueSelector('cadastro');

const UFs = [
  "AC","AL","AM","AP","BA","CE","DF",
  "ES","GO","MA","MG","MS","MT","PA",
  "PB","PE","PI","PR","RJ","RN","RO",
  "RR","RS","SC","SE","SP","TO"
];

const Escolaridades = [
  "Fundamental Completo",
	"Fundamental Incompleto",
	"Médio Completo",
	"Médio Incompleto",
	"Superior Completo",
	"Superior Incompleto"
];

class Cadastro extends Component {

  submeterFormulario(formProps) {
    this.props.signupUser(formProps);
  }

  mostrarAlertas() {
    if (this.props.mensagemDeErro) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.mensagemDeErro}
        </div>
      );
    }
  }

  render() {

    const { valid, handleSubmit, pristine, submitting } = this.props

    const emProgresso = !valid || pristine || submitting;

    return (
      <div className="cadastro">
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
						label="Nome"
						name="nome"
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
						label="UF"
						name="uf_rg"
						component={DropDown}
            opcoes={UFs}
            validate={validacoes.obrigatorio}
            style={{width: "30%", marginRight: "2%"}}
					/>

          <Field
						label="RG"
						name="numero_rg"
						type="text"
						component={Input}
            validate={validacoes.obrigatorio}
            style={{width: "68%"}}
          />

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
            name="cpfDoResponsavel"
            component={Checkbox}
            style={{width: "20%"}}
          />

          {this.props.cpfDoResponsavel ?
          <Field
						label="Nome do Responsável"
            name="nomeDoResponsavel"
						type="text"
            component={Input}
            validate={[
              validacoes.obrigatorio,
              validacoes.valorMinimoDeCaracteres(4),
              validacoes.valorMaximoDeCaracteres(100)
              ]}
            style={{width: "80%"}}
          	/> : <div className="clearfix breakline"/>}

          <Field
						label="Telefone Fixo"
						name="telefoneFixo"
						type="text"
						component={Input}
            validate={[
              validacoes.obrigatorio,
              validacoes.telefoneFixo
            ]}
            style={{width: "49%", marginRight: "2%"}}
            normalize={normalizacoes.telefoneFixo}
          />

          <Field
						label="Telefone Celular"
						name="telefoneCelular"
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
            validate={[
            	validacoes.obrigatorio
            ]}
						options={[
          		{ title: 'Masculino', value: 'masculino' },
              { title: 'Feminino', value: 'feminino' }
            ]}
            style={{width: "100%"}}
          />

					<Field
						label="Data de Nascimento"
						name="dataDeNascimento"
            component={DatePicker}
            validate={[
            	validacoes.obrigatorio
            ]}
						maxDate={moment()}
            style={{width: "100%"}}
          />

					<Field
						label="Endereço"
						name="endereco"
						placeholder="Entre seu endereço"
						component={PlaceField}
						validate={[
            	validacoes.obrigatorio
            ]}
						style={{width: "100%"}}
					/>

					<Field
						label="Escolaridade"
						name="escolaridade"
						component={DropDown}
            opcoes={Escolaridades}
            validate={validacoes.obrigatorio}
            style={{width: "30%"}}
					/>

					<Field
					 	name='captcharesponse'
						component={Captcha}
						validate={validacoes.obrigatorio}
						style={{width: "100%"}}
					/>

          {this.mostrarAlertas()}

          <div className="clearfix top_space">
            <button type="submit" className={'btn btn-primary ' + (emProgresso ? 'disabled' : '')} disabled={emProgresso}>Cadastrar</button>
          </div>
        </form>
      </div>
    );
  }
}

const CadastroForm = reduxForm({
  form: 'cadastro'  // identificador unico para esse formulario
})(Cadastro)

function mapStateToProps(state) {
  return {
    cpfDoResponsavel: selector(state, 'cpfDoResponsavel'),
    mensagemDeErro: state.autenticacao.erro
  };
}

export default connect(mapStateToProps, actions)(CadastroForm);
