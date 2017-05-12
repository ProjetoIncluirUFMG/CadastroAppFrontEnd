import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import * as actions from '../../actions/autenticacao';
import * as validacoes from '../../utils/validacoesDeFormulario';
import Input from '../genericos/formulario/Input';
import DropDown from '../genericos/formulario/DropDown';

const UFs = [
  "AC","AL","AM","AP","BA","CE","DF",
  "ES","GO","MA","MG","MS","MT","PA",
  "PB","PE","PI","PR","RJ","RN","RO",
  "RR","RS","SC","SE","SP","TO"
];

class Cadastro extends Component {

  submitForm(formProps) {
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
      <div>
        <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
          <Field name="email" 
            validate={validacoes.email} 
            type="text" 
            component={Input} 
            tamanho={"100%"}
            label="Email"/>

          <Field name="senha" type="password" 
            validate={[
              validacoes.valorMinimoDeCaracteres(8),
              validacoes.valorMaximoDeCaracteres(12)
              ]}
            component={Input} 
            tamanho={"100%"}
            label="Senha"/>

          <Field name="confirmarSenha" type="password"
            validate={[validacoes.confirmacaoDeSenha.bind(this)]} 
            component={Input} 
            tamanho={"100%"}
            label="Confirmar Senha"/>

          <hr />

          <Field name="nome" 
            validate={[
              validacoes.valorMinimoDeCaracteres(4),
              validacoes.valorMaximoDeCaracteres(100)
              ]} 
            type="text" 
            component={Input} 
            tamanho={"100%"}
            label="Nome"/>

          <Field name="uf_rg" 
            opcoes={UFs}
            validate={validacoes.obrigatorio} 
            component={DropDown} 
            tamanho={"40%"}
            label="UF"/>

          <Field name="numero_rg" 
            validate={validacoes.obrigatorio} 
            type="text" 
            component={Input} 
            tamanho={"60%"}
            label="RG"/>

          {this.mostrarAlertas()}

          <div className="clearfix">
            <button type="submit" className={'btn btn-primary ' + (emProgresso ? 'disabled' : '')} disabled={emProgresso}>Cadastrar</button>
          </div>
        </form>
      </div>
    );
  }
}

const CadastroRedux = reduxForm({
  form: 'cadastro'  // identificador unico para esse formulario
})(Cadastro)

function mapStateToProps(state) {
  return { error: state.autenticacao.erro };
}

export default connect(mapStateToProps, actions)(CadastroRedux);

