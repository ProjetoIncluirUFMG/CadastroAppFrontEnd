import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import * as actions from '../../actions/autenticacao';
import * as validacoes from '../genericos/formulario/utils/validacoesDeFormulario';
import Input from '../genericos/formulario/Input';
import DropDown from '../genericos/formulario/DropDown';

class Login extends Component {

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
			<div className="login">
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

	        <br />

	        {this.mostrarAlertas()}

					<div className="clearfix top_space">
            <button type="submit" className={'btn btn-space btn-primary ' + (emProgresso ? 'disabled' : '')} disabled={emProgresso}>Login</button>
						<button className="btn btn-default">Esqueci minha senha</button>
          </div>
	      </form>
			</div>
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
