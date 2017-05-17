import React, { Component } from 'react';
const  { DOM: { input, select, textarea } } = React
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types'

import * as actions from '../../actions/autenticacao';
import * as validacoes from '../genericos/formulario/utils/validacoesDeFormulario';
import * as normalizacoes from '../genericos/formulario/utils/normalizacaoDeFormulario';

import Input from '../genericos/formulario/Input';
import DropDown from '../genericos/formulario/DropDown';
import RadioGroup from '../genericos/formulario/RadioGroup';

const selector = formValueSelector('cadastro');

const UFs = [
  "AC","AL","AM","AP","BA","CE","DF",
  "ES","GO","MA","MG","MS","MT","PA",
  "PB","PE","PI","PR","RJ","RN","RO",
  "RR","RS","SC","SE","SP","TO"
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
          <Field name="email" 
            validate={[
              validacoes.obrigatorio,
              validacoes.email
            ]} 
            type="text" 
            component={Input} 
            style={{width: "100%"}}
            label="Email"/>

          <Field name="senha" type="password" 
            validate={[
              validacoes.obrigatorio,
              validacoes.valorMinimoDeCaracteres(8),
              validacoes.valorMaximoDeCaracteres(12)
            ]}
            component={Input} 
            style={{width: "100%"}}
            label="Senha"/>

          <Field name="confirmarSenha" type="password"
            validate={[
              validacoes.obrigatorio,
              validacoes.confirmacaoDeSenha.bind(this)
            ]} 
            component={Input} 
            style={{width: "100%"}}
            label="Confirmar Senha"/>

          <hr className="linha" />

          <Field name="nome" 
            validate={[
              validacoes.obrigatorio,
              validacoes.valorMinimoDeCaracteres(4),
              validacoes.valorMaximoDeCaracteres(100)
              ]} 
            type="text" 
            component={Input} 
            style={{width: "100%"}}
            label="Nome"/>

          <Field name="uf_rg" 
            opcoes={UFs}
            validate={validacoes.obrigatorio} 
            component={DropDown} 
            style={{width: "30%", marginRight: "2%"}}
            label="UF"/>

          <Field name="numero_rg" 
            validate={validacoes.obrigatorio} 
            type="text" 
            component={Input} 
            style={{width: "68%"}}
            label="RG"/>

          <Field name="cpf" 
            validate={[
              validacoes.obrigatorio,
              validacoes.cpf
            ]} 
            type="text"
            component={Input} 
            style={{width: "100%"}}
            label="CPF"
            normalize={normalizacoes.cpf}
            parse={value => value.replace(/[^0-9]/g, '')}/>

          <Field 
            name="cpfDoResponsavel" 
            component={Input} 
            style={{width: "20%"}}
            type="checkbox"
            label="CPF do Responsável"
          />

          {this.props.cpfDoResponsavel ? 
          <Field 
            name="nomeDoResponsavel" 
            component={Input} 
            validate={[
              validacoes.obrigatorio,
              validacoes.valorMinimoDeCaracteres(4),
              validacoes.valorMaximoDeCaracteres(100)
              ]} 
            style={{width: "80%"}}
            type="text"
            label="Nome do Responsável"
          /> : <div className="clearfix breakline"/>}

          <Field name="telefoneFixo" 
            validate={[
              validacoes.obrigatorio,
              validacoes.telefoneFixo
            ]} 
            type="text" 
            component={Input} 
            style={{width: "49%", marginRight: "2%"}}
            label="Telefone Fixo"
            normalize={normalizacoes.telefoneFixo}
            parse={value => value.replace(/[^0-9]/g, '')} 
            /> 

          <Field name="telefoneCelular" 
            validate={[
              validacoes.obrigatorio,
              validacoes.telefoneCelular
            ]} 
            type="text" 
            component={Input} 
            style={{width: "49%"}}
            label="Telefone Celular"
            normalize={normalizacoes.telefoneCelular}
            parse={value => value.replace(/[^0-9]/g, '')} 
          />
          
          <Field name="sexo"
             component={RadioGroup} 
             label="Sexo"
             validate={[
              validacoes.obrigatorio
             ]} 
             required={true} 
             style={{width: "100%"}}
             options={[
               { title: 'Masculino', value: 'masculino' },
               { title: 'Feminino', value: 'feminino' }
             ]} 
          />

          {this.mostrarAlertas()}

          <div className="clearfix">
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

