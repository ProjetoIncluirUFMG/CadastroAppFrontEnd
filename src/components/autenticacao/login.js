import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import * as actions from '../../actions/autenticacao';
import * as validacoes from '../genericos/formulario/utils/validacoesDeFormulario';
import Input from '../genericos/formulario/Input';
import DropDown from '../genericos/formulario/DropDown';

class Login extends Component {

  submeterFormulario({email, password}) {
    this.props.signinUser({email, password, history});
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
      <form onSubmit={handleSubmit(this.submeterFormulario.bind(this))}>
        <Field 
          name="email" 
          type="text" 
          component={Input} 
          tamanho={"100%"}
          label="Email"
          validate={validacoes.email}
        />

        <Field name="senha" 
          type="password" 
          validate={[
            validacoes.obrigatorio,
            validacoes.valorMinimoDeCaracteres(8),
            validacoes.valorMaximoDeCaracteres(12)
          ]}
          component={Input} 
          tamanho={"100%"}
          label="Senha"
        />

        <br />

        {this.mostrarAlertas()}

        <div>
          <button type="submit" className={'btn btn-primary ' + (emProgresso ? 'disabled' : '')} disabled={emProgresso}>Login</button>
        </div>
      </form>
    )
  }
}

const LoginForm = reduxForm({
  form: 'login'
})(Login)

function mapStateToProps(state) {
  return { mensagemDeErro: state.autenticacao.erro };
}

export default connect(mapStateToProps, actions)(LoginForm);
